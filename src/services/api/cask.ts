import axiosInstance from '@/services/axiosInstance';
import { Cask, CaskSearchDto, PaginatedResponse } from '@/types/cask';

export async function getCaskList(params: CaskSearchDto): Promise<Cask[]> {
  const res = await axiosInstance.get<PaginatedResponse<Cask>>('/cask', {
    params,
  });
  return res.data.data.content;
}
