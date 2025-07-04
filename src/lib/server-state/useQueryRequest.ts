import { useState, useEffect, useCallback, useMemo } from 'react';

export interface QueryResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * GET 요청을 위한 훅
 * @param apiFn API 요청 함수 (비동기 함수)
 * @param params API 함수에 넘길 파라미터 배열
 * @returns { data, loading, error, refetch }
 */
export function useQueryRequest<TParams extends unknown[], TResult>(
  queryFn: (...args: TParams) => Promise<TResult>,
  params: [...TParams]
): QueryResult<TResult> {
  const [data, setData] = useState<TResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // params 비교를 위한 문자열 키
  const paramKey = useMemo(() => JSON.stringify(params), [params]);

  // params가 바뀔 때만 새로 정의
  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    queryFn(...params)
      .then((res) => setData(res))
      .catch((err: unknown) =>
        setError(err instanceof Error ? err : new Error('Unknown error'))
      )
      .finally(() => setLoading(false));
  }, [paramKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
