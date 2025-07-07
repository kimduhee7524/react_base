import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import {
  getCaskDetail,
  patchCaskDetail,
  deleteCask,
  getCaskList,
  createCask,
} from '@/services/api/cask';
import { caskKeys } from '@/queryKeys/caskKeys';
import { CaskFormValues } from '@/schemas/caskSchema';
import { toast } from 'sonner';
import { GetCaskListParams } from '@/types/cask';

export const useCaskListQuery = (params: GetCaskListParams) =>
  useSuspenseQuery({
    queryKey: caskKeys.list(params.searchDto),
    queryFn: () => getCaskList(params),
  });

export const useCreateCaskMutation = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CaskFormValues) => createCask(data),
    onSuccess: () => {
      toast.success('캐스크 등록 완료');
      queryClient.invalidateQueries({ queryKey: caskKeys.lists() });
      onSuccess?.();
    },
    onError: () => {
      toast.error('등록 실패');
    },
  });
};

export const useCaskDetailQuery = (id: number) =>
  useSuspenseQuery({
    queryKey: caskKeys.detail(id),
    queryFn: () => getCaskDetail(id),
  });

export const usePatchCaskMutation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: CaskFormValues) => patchCaskDetail(id, values),
    onSuccess: () => {
      toast.success('저장되었습니다.');
      queryClient.invalidateQueries({ queryKey: caskKeys.detail(id) });
    },
    onError: () => toast.error('저장에 실패했습니다.'),
  });
};

export const useDeleteCaskMutation = (id: number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteCask(id),
    onSuccess: () => {
      toast.success('삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: caskKeys.lists() });
      onSuccess?.();
    },
    onError: () => toast.error('삭제에 실패했습니다.'),
  });
};
