export function formToQueryParams(values: Record<string, any>): Record<string, string> {
    const newParams: Record<string, string> = {};
    Object.entries(values).forEach(([key, val]) => {
      if (typeof val === 'boolean') {
        newParams[key] = String(val);
      } else if (val) {
        newParams[key] = val;
      }
    });
    return newParams;
  }