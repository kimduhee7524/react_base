import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

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
  queryFn: (...args: [...TParams, AbortSignal?]) => Promise<TResult>,
  params: [...TParams]
): QueryResult<TResult> {
  const [data, setData] = useState<TResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  // params 비교를 위한 문자열 키
  const paramKey = useMemo(() => JSON.stringify(params), [params]);

  // params가 바뀔 때만 새로 정의
  const fetchData = useCallback(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    const signal = controller.signal;

    queryFn(...params, signal)
      .then((res: TResult) => {
        if (!signal.aborted) {
          setData(res);
        }
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err : new Error('Unknown error'));
      })
      .finally(() => {
        if (!signal.aborted) {
          setLoading(false);
        }
      });
  }, [paramKey]);

  useEffect(() => {
    fetchData();
    return () => abortRef.current?.abort();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
