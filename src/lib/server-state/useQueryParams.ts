import { useQueryRequest } from './useQueryRequest';
import type { QueryResult } from './useQueryRequest';

/**
 * useQueryRequest의 간단 호출 래퍼.
 * ex) useApiParams(getCaskDetail, id)
 */
export function useQueryParams<TParams extends unknown[], TResult>(
  queryFn: (...args: TParams) => Promise<TResult>,
  ...params: TParams
): QueryResult<TResult> {
  return useQueryRequest<TParams, TResult>(queryFn, params);
}
