import type { CaskSearchFormValues,CaskFormValues } from '@/schemas/caskSchema';


export function getCaskSearchDefaultValues(searchParams: URLSearchParams): Partial<CaskSearchFormValues> {
  return {
    is_active: searchParams.get('is_active') !== 'false',
    sort: searchParams.get('sort') || '',
    cask_name: searchParams.get('cask_name') || '',
    cask_number: searchParams.get('cask_number') || '',
    cask_size: searchParams.get('cask_size') || '',
    distillery_display_name: searchParams.get('distillery_display_name') || '',
    distillery_true_name: searchParams.get('distillery_true_name') || '',
    fill_type: searchParams.get('fill_type') || '',
    malt_type: searchParams.get('malt_type') || '',
    seasoning: searchParams.get('seasoning') || '',
    warehouse: searchParams.get('warehouse') || '',
    wood_type: searchParams.get('wood_type') || '',
  };
}

export const caskFormDefaultValues: CaskFormValues = {
  cask_name: '',
  cask_number: '',
  abv: 0,
  malt_type: '',
  distillery_true_name: '',
  distillery_true_name_id: 0,
  distillery_display_name: '',
  distillery_display_name_id: 0,
  cask_size: '',
  fill_type: '',
  seasoning: '',
  warehouse_id: 0,
  wood_type: '',
  lpa: 0,
  price_per_bottle: 0,
  price_per_lpa: 0,
  purchase_price: 0,
  expected_arrival_price: 0,
  bulk_liter: 0,
  capacity_liters: 0,
  cask_currency: 'KRW',
  olarla: 'OLA',
  comment: '',
};