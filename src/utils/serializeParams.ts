type QueryValue = string | number | boolean;
type QueryParams = Record<string, QueryValue | QueryValue[]>;

export function serializeParams<T extends QueryParams>(params: T): string {
  const qs = new URLSearchParams();

  for (const key in params) {
    const value = params[key];

    if (Array.isArray(value)) {
      value.forEach((v) => {
        qs.append(key, String(v));
      });
    } else {
      qs.append(key, String(value));
    }
  }

  return qs.toString();
}
