export interface CaskSearchDto {
  cask_name?: string;
  cask_number?: string;
  cask_size?: string;
  distillery_display_name?: string;
  distillery_true_name?: string;
  fill_type?: string;
  is_active?: boolean;
  malt_type?: string;
  order_by?: number;
  seasoning?: string;
  warehouse?: string;
  wood_type?: string;
}

export interface Cask {
  cask_id: number;
  cask_name: string;
  cask_number: string;
  malt_type: string;
  abv: number;
}

export interface PaginatedResponse<T> {
  code: number;
  data: {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  };
  messages: string;
}
