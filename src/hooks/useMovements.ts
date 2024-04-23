import { useMutation, useQuery, useQueryClient } from 'react-query';
import financeApi from '../api/financeApi';

export function useCreateMovements() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ expenses_id, movement, ...data }: any) => {
      return financeApi.post(`/api/v1/movements/${movement}/${expenses_id}`, {
        ...data.params,
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries('movements');
      },
    }
  );
}

// export const useMovements = (term?: string) => {
//   const fetchServices = async (pageParam: number) => {
//     return financeApi
//       .get(
//         `/api/v1/movements/&page[number]=${pageParam}&page[size]=15
//         ${term ? `&filter[term]=${term}` : ''}`
//       )
//       .then((res) => deserializer(res))
//       .catch((err) => console.log(err));
//   };

//   const query = useInfiniteQuery(
//     ['movements', term],
//     ({ pageParam = 1 }) => {
//       return fetchServices(pageParam);
//     },
//     {
//       getNextPageParam: (lastPage: any, allPages: any) => {
//         const maxPages = lastPage?.meta?.page?.total;
//         const nextPage = allPages?.length + 1;

//         return nextPage <= maxPages ? nextPage : undefined;
//       },
//     }
//   );

//   return query;
// };

export const useMovements = () => {
  return useQuery('movements', async () => {
    try {
      const res = await financeApi.get('/api/v1/movements');
      return res;
    } catch (error) {
      console.error('error in account', error);
      throw error; // Lanza el error para que React Query lo maneje
    }
  });
};
