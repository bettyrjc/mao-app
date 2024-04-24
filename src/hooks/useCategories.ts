import { useMutation, useQuery, useQueryClient } from 'react-query';
import financeApi from '../api/financeApi';

export function useCreateCategories() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, ...data }: any) => {
      return financeApi.post(`/api/v1/categories/${id}`, {
        ...data.params,
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries('categories');
      },
    }
  );
}
export const useCategories = () => {
  return useQuery('categories', async () => {
    try {
      const res = await financeApi.get('/api/v1/categories');
      return res;
    } catch (error) {
      console.error('error in account', error);
      throw error; // Lanza el error para que React Query lo maneje
    }
  });
};
