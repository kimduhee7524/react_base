export interface Cask {
  cask_id: number;
  cask_name: string;
  cask_number: string;
  distillery_display_name: string;
  distillery_true_name: string;
  malt_type: string;
  cask_size: string;
  capacity_liters: number;
  wood_type: string;
  fill_type: string;
  seasoning: string;
  abv: number;
  ola_rla: 'OLA' | 'RLA' | null;
  bulk_liter: number;
  lpa: number;
  purchase_price: number;
  cask_currency: 'GBP' | 'USD' | 'KRW' | 'JPY' | null;
  price_per_lpa: number;
  price_per_bottle: number;
  expected_arrival_price: number;
  warehouse: string;
  events: CaskEvent[];
  comment: string;
}

export interface CaskEvent {
  event_id: number;
  event_type: string;
  event_at: string;
  event_comment: string;
  event_price: number;
  event_currency: string;
}

export interface CaskSearchDto {
  cask_name?: string;
  cask_number?: string;
  cask_size?: string;
  distillery_display_name?: string;
  distillery_true_name?: string;
  fill_type?: string;
  malt_type?: string;
  seasoning?: string;
  warehouse?: string;
  wood_type?: string;
  is_active?: boolean;
}

export interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

export interface PaginatedResponse<T> {
  code: number;
  data: {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
  };
  messages?: string[];
}

export interface GetCaskListParams {
  pageable: Pageable;
  searchDto: CaskSearchDto;
}
