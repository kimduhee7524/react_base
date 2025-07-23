import { CaskFormValues } from '@/schemas/caskSchema';
import axiosInstance from '@/services/axiosInstance';
import { Cask, PaginatedResponse, GetCaskListParams } from '@/types/cask';
import { serializeParams } from '@/utils/serializeParams';

export async function getCaskList({
  pageable,
  searchDto,
}: GetCaskListParams): Promise<PaginatedResponse<Cask>> {
  const res = await axiosInstance.get<PaginatedResponse<Cask>>('/cask', {
    params: {
      ...pageable,
      ...searchDto,
    },
    paramsSerializer: serializeParams,
  });

  return res.data;
}

export async function getCaskDetail(caskId: number): Promise<Cask> {
  const res = await axiosInstance.get<{ code: number; data: Cask }>(
    `/cask/${caskId}`
  );
  return res.data.data;
}

export async function patchCaskDetail(
  caskId: number,
  payload: Partial<Cask>
): Promise<string> {
  const res = await axiosInstance.patch<{ code: number; data: string }>(
    `/cask/${caskId}`,
    payload
  );
  return res.data.data;
}

export async function createCask(payload: CaskFormValues): Promise<string> {
  const res = await axiosInstance.post<{ code: number; data: string }>(
    '/cask',
    payload
  );
  return res.data.data;
}

export async function deleteCask(caskId: number): Promise<string> {
  const res = await axiosInstance.delete<{ code: number; data: string }>(
    `/cask/${caskId}`
  );
  return res.data.data;
}
