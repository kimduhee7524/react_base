import { z } from 'zod';

export const caskSearchSchema = z.object({
  cask_name: z.string().optional(),
  cask_number: z.string().optional(),
  cask_size: z.string().optional(),
  distillery_display_name: z.string().optional(),
  distillery_true_name: z.string().optional(),
  fill_type: z.string().optional(),
  malt_type: z.string().optional(),
  seasoning: z.string().optional(),
  warehouse: z.string().optional(),
  wood_type: z.string().optional(),
  is_active: z.boolean().optional(),
  sort: z.string(),
});

export type CaskSearchFormValues = z.infer<typeof caskSearchSchema>;

export const caskFormSchema = z.object({
  cask_name: z.string().min(1),
  cask_number: z.string().min(1),
  abv: z.coerce.number().nonnegative().min(1),
  bulk_liter: z.coerce.number().min(1),
  capacity_liters: z.coerce.number().min(1),
  malt_type: z.string().min(1),
  distillery_true_name: z.string().min(1),
  distillery_true_name_id: z.coerce.number().min(1),
  distillery_display_name_id: z.coerce.number().min(1),
  distillery_display_name: z.string().min(1),
  cask_size: z.string().optional(),
  fill_type: z.string().optional(),
  seasoning: z.string().optional(),
  warehouse_id: z.coerce.number().min(1),
  wood_type: z.string().optional(),
  lpa: z.coerce.number().optional(),
  price_per_bottle: z.coerce.number().optional(),
  price_per_lpa: z.coerce.number().optional(),
  purchase_price: z.coerce.number().optional(),
  expected_arrival_price: z.coerce.number().optional(),
  cask_currency: z.enum(['GBP', 'USD', 'KRW', 'JPY']),
  comment: z.string().optional(),
  olarla: z.enum(['OLA', 'RLA']).optional(),
});

export type CaskFormValues = z.infer<typeof caskFormSchema>;
