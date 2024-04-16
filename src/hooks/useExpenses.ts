import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import financeApi from '../api/financeApi';
import { deserializer } from '../utils/deserializer';

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ expenses_id, ...data }: any) => {
      return financeApi.post(`/api/v1/movements/expenses/${expenses_id}`, {
        ...data.params,
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries('expenses');
      },
    }
  );
}

export const useAccounts = (expensesId?: string, term?: string) => {
  const fetchServices = async (pageParam: number) => {
    return financeApi
      .get(
        `/api/v1/expenses/&page[number]=${pageParam}&page[size]=15
        ${term ? `&filter[term]=${term}` : ''}`
      )
      .then((res) => deserializer(res))
      .catch((err) => console.log(err));
  };

  const query = useInfiniteQuery(
    ['expenses', expensesId, term],
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
