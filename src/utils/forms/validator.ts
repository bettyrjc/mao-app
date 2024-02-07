export const validator = async (data: any, schema: any) => {
  try {
    const values = await schema.validate(data, {abortEarly: false});
    return {
      values,
      errors: {},
    };
  } catch (validationErrors: any) {
    const errors = validationErrors.inner.reduce(
      (allErrors: any, currentError: {path: any; message: any; type: any}) => ({
        ...allErrors,
        [currentError.path]: {
          message: currentError.message,
          type: currentError.type,
        },
      }),
      {},
    );

    return {
      values: {},
      errors,
    };
  }
};
