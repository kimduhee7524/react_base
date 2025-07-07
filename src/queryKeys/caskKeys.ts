export const caskKeys = {
  all: ['casks'] as const,
  lists: () => [...caskKeys.all, 'list'] as const,
  list: (filters: unknown) => [...caskKeys.lists(), { filters }] as const,
  detail: (id: number) => [...caskKeys.all, 'detail', id] as const,
};
