function parseItem(item: any, includedMap: any) {
  if (!item) {
    return null;
  }

  const {id, type, attributes, relationships} = item;

  // se asignan los datos principales
  const parsedItem = {id, type, ...attributes};
  // se iteran las relaciones para buscar datos incrustados
  if (relationships) {
    Object.keys(relationships as Record<string, any>).forEach(r => {
      // se crea la propiedad r que seria del tipo relacionado, por defecto es un array vacio
      parsedItem[r] = [];
      // se valida si tiene elementos relacionados y se iteran para buscarlos en el mapa de elementos incrustados
      if (
        relationships[r] &&
        relationships[r].data &&
        relationships[r].data !== null
      ) {
        if (Array.isArray(relationships[r].data)) {
          parsedItem[r] = relationships[r].data.map((ir: any) => {
            return parseItem(includedMap[`${ir.id}|${ir.type}`], includedMap);
          });
        } else {
          const ir = relationships[r].data;
          parsedItem[r] = parseItem(
            includedMap[`${ir.id}|${ir.type}`],
            includedMap,
          );
        }
      }
    });
  }
  return parsedItem;
}

export function deserializer(json: any) {
  const {data, included = [], ...rest} = json;
  // se asignan los datos iniciales
  const result = {
    data: {},
    ...rest,
  };

  // se crea un mapa de los included para evitar iterar el array al momento de asociarlos al dato principal
  // pasando de O(n) a O(1)
  // se usa una clave compuesta por si el id se repitiera en distintos elementos asociados
  // Key = ${id}|{$type} Ej: 12345678|subcategory
  // const included = 'included' in rest ? rest.included : [];

  const includedMap = included.reduce((prev: any, curr: any) => {
    const {id, type, attributes, relationships} = curr;
    return {
      ...prev,
      [`${id}|${type}`]: {id, attributes, relationships, type},
    };
  }, {});

  if (Array.isArray(data)) {
    result.data = data.map(i => parseItem(i, includedMap));
  } else {
    result.data = parseItem(data, includedMap);
  }

  return result;
}

// type Item = {
//   id: string;
//   type: string;
//   attributes: any;
//   relationships: any;
// };

// type RelationshipData = {
//   id: string;
//   type: string;
// };

// type IncludedMap = {
//   [key: string]: Item;
// };

// type ParsedItem = {
//   id: string;
//   type: string;
//   [key: string]: any;
// };

// function parseItem(
//   item: Item | null,
//   includedMap: IncludedMap,
// ): ParsedItem | null {
//   if (!item) {
//     return null;
//   }

//   const {id, type, attributes, relationships} = item;

//   // se asignan los datos principales
//   const parsedItem: ParsedItem = {id, type, ...attributes};
//   // se iteran las relaciones para buscar datos incrustados
//   if (relationships) {
//     Object.keys(relationships).forEach(r => {
//       // se crea la propiedad r que seria del tipo relacionado, por defecto es un array vacio
//       parsedItem[r] = [];
//       // se valida si tiene elementos relacionados y se iteran para buscarlos en el mapa de elementos incrustados
//       if (
//         relationships[r] &&
//         relationships[r].data &&
//         relationships[r].data !== null
//       ) {
//         if (Array.isArray(relationships[r].data)) {
//           parsedItem[r] = relationships[r].data.map((ir: RelationshipData) => {
//             return parseItem(includedMap[`${ir.id}|${ir.type}`], includedMap)!;
//           });
//         } else {
//           const ir = relationships[r].data as RelationshipData;
//           parsedItem[r] = parseItem(
//             includedMap[`${ir.id}|${ir.type}`],
//             includedMap,
//           )!;
//         }
//       }
//     });
//   }
//   return parsedItem;
// }

// export function deserializer(json: any) {
//   const {data, included = [], ...rest} = json;

//   // se asignan los datos iniciales
//   const result = {
//     data: {},
//     ...rest,
//   };

//   // se crea un mapa de los included para evitar iterar el array al momento de asociarlos al dato principal
//   // pasando de O(n) a O(1)
//   // se usa una clave compuesta por si el id se repitiera en distintos elementos asociados
//   // Key = ${id}|{$type} Ej: 12345678|subcategory
//   // const included = 'included' in rest ? rest.included : [];

//   const includedMap: IncludedMap = included.reduce(
//     (prev: IncludedMap, curr: Item) => {
//       const {id, type, attributes, relationships} = curr;
//       return {
//         ...prev,
//         [`${id}|${type}`]: {id, attributes, relationships, type},
//       };
//     },
//     {},
//   );

//   if (Array.isArray(data)) {
//     result.data = data.map((i: Item) => parseItem(i, includedMap)!);
//   } else {
//     result.data = parseItem(data, includedMap)!;
//   }

//   return result;
// }
