import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from 'react-query';
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
        queryClient.invalidateQueries('account');
      },
    }
  );
}

export const useAccounts = (accountId?: string, term?: string) => {
  const fetchServices = async (pageParam: number) => {
    return financeApi
      .get(
        `/api/v1/accounts/&page[number]=${pageParam}&page[size]=15
        ${term ? `&filter[term]=${term}` : ''}`
      )
      .then((res) => deserializer(res))
      .catch((err) => console.log(err));
  };

  const query = useInfiniteQuery(
    ['accounts', accountId, term],
    ({ pageParam = 1 }) => {
      return fetchServices(pageParam);
    },
    {
      getNextPageParam: (lastPage: any, allPages: any) => {
        const maxPages = lastPage?.meta?.page?.total;
        const nextPage = allPages?.length + 1;

        return nextPage <= maxPages ? nextPage : undefined;
      },
    }
  );

  return query;
};
export const useAccount = (accountId: string) => {
  return useQuery('accounts', async () => {
    return financeApi
      .get(`api/v1/accounts/${accountId}`)
      .then((res) => {
        return deserializer(res);
      })
      .catch((err) => {
        console.error('err', err);
      });
  });
};
