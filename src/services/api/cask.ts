import axiosInstance from '@/services/axiosInstance';
import { Cask, CaskSearchDto, Pageable, PaginatedResponse } from '@/types/cask';

interface GetCaskListParams {
  pageable: Pageable;
  searchDto: CaskSearchDto;
}

export async function getCaskList({
  pageable,
  searchDto,
}: GetCaskListParams): Promise<PaginatedResponse<Cask>> {
  const res = await axiosInstance.get<PaginatedResponse<Cask>>('/cask', {
    params: {
      ...pageable,
      ...searchDto,
    },
    paramsSerializer: (params) => {
      const qs = new URLSearchParams();
      for (const key in params) {
        const value = params[key];
        if (Array.isArray(value)) {
          value.forEach((v) => qs.append(key, v));
        } else if (value !== undefined && value !== null) {
          qs.append(key, String(value));
        }
      }
      return qs.toString();
    },
  });
  return res.data;
}
