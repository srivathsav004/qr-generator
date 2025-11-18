import { z } from 'zod';

export const productDataSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  sku: z.string().min(1, 'SKU/Serial number is required'),
  brand: z.string().min(1, 'Brand name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  manufacturingDate: z.string().optional(),
  manufacturingBatch: z.string().optional(),
  rawMaterialSource: z.string().optional(),
  qualityCheckStatus: z.string().optional(),
  qualityInspector: z.string().optional(),
  packagingDate: z.string().optional(),
  packagingLocation: z.string().optional(),
  serializationNumber: z.string().optional(),
  transportFrom: z.string().optional(),
  transportTo: z.string().optional(),
  transportCarrier: z.string().optional(),
  warehouseLocation: z.string().optional(),
  warehouseAction: z.string().optional(),
  retailerName: z.string().optional(),
  retailerLocation: z.string().optional(),
  customerSaleDate: z.string().optional(),
  salePrice: z.string().optional(),
  customerEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  warrantyMonths: z.number().optional(),
  certificateNumber: z.string().optional(),
  notes: z.string().optional(),
});

export type ProductData = z.infer<typeof productDataSchema> & {
  generatedAt?: string;
};

export const CATEGORIES = [
  'Watches',
  'Handbags',
  'Jewelry',
  'Apparel',
  'Accessories',
  'Other',
] as const;

export const QUALITY_CHECK_STATUSES = ['Pass', 'Fail', 'Pending'] as const;

export const WAREHOUSE_ACTIONS = ['Received', 'Dispatched', 'Stored'] as const;
