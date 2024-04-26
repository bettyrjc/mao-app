import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deserializer } from '../utils/deserializer';
import financeApi from '../api/financeApi';

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ account_id, ...data }: any) => {
      return financeApi.post(`/api/v1/accounts/${account_id}`, {
        ...data.params,
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries('accounts');
      },
    }
  );
}
export const useAccounts = () => {
  return useQuery('accounts', async () => {
    try {
      const res = await financeApi.get('/api/v1/accounts');
      return res;
    } catch (error) {
      console.error('error in account', error?.response?.data?.detail);
      throw error; // Lanza el error para que React Query lo maneje
    }
  });
};
export const useAccount = (accountId: string) => {
  return useQuery('accounts', async () => {
    return financeApi
      .get(`/api/v1/accounts/${accountId}`)
      .then((res) => {
        return deserializer(res);
      })
      .catch((err) => {
        console.error('err', err);
      });
  });
};
