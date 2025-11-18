'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  ProductData,
  productDataSchema,
  CATEGORIES,
  QUALITY_CHECK_STATUSES,
  WAREHOUSE_ACTIONS,
} from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface ProductFormProps {
  onSubmit: (data: ProductData) => void;
  onReset: () => void;
  hasGeneratedQR: boolean;
}

export function ProductForm({ onSubmit, onReset, hasGeneratedQR }: ProductFormProps) {
  const [supplyChainOpen, setSupplyChainOpen] = useState(false);
  const [additionalOpen, setAdditionalOpen] = useState(false);

  // -------------------------
  // PRESET SAMPLE DATA HERE
  // -------------------------
  const form = useForm<ProductData>({
    resolver: zodResolver(productDataSchema),
    defaultValues: {
      productName: 'Smartwatch X200',
      sku: 'SWX-200-98234',
      brand: 'TechNova',
      category: CATEGORIES[0],
      description: 'High-end smartwatch with health tracking features.',
      manufacturingDate: new Date('2024-06-15').toISOString(),

      manufacturingBatch: 'BATCH-55682',
      rawMaterialSource: 'Supplier A — Shenzhen, China',
      qualityCheckStatus: QUALITY_CHECK_STATUSES[0],
      qualityInspector: 'John Doe',
      packagingDate: new Date('2024-06-18').toISOString(),
      packagingLocation: 'Factory Warehouse A1',
      serializationNumber: 'SER-9912837',
      transportFrom: 'Shenzhen Port',
      transportTo: 'Los Angeles Distribution Hub',
      transportCarrier: 'GlobalTrans Logistics',
      warehouseLocation: 'LA Warehouse Zone 3',
      warehouseAction: WAREHOUSE_ACTIONS[0],
      retailerName: 'SuperTech Store',
      retailerLocation: 'San Francisco, CA',
      customerSaleDate: new Date('2024-07-02').toISOString(),
      salePrice: '249.99',
      customerEmail: 'customer@example.com',

      warrantyMonths: 24,
      certificateNumber: 'CERT-88219012',
      notes: 'Item passed all inspections and was packaged securely.',
    },
  });

  const handleSubmit = (data: ProductData) => {
    const dataWithTimestamp = {
      ...data,
      generatedAt: new Date().toISOString(),
    };
    onSubmit(dataWithTimestamp);
  };

  const handleReset = () => {
    form.reset();
    onReset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* BASIC INFO */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Basic Information</h2>

          {/* PRODUCT NAME */}
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SKU */}
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU/Serial Number *</FormLabel>
                <FormControl>
                  <Input placeholder="SKU or serial number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* BRAND */}
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Brand name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CATEGORY */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Category *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* MANUFACTURING DATE */}
          <FormField
            control={form.control}
            name="manufacturingDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Manufacturing Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className={cn('w-full pl-3 text-left font-normal')}>
                        {field.value ? format(new Date(field.value), 'PPP') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date?.toISOString())}
                      disabled={(date) => date > new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>

        {/* SUPPLY CHAIN */}
        <Collapsible open={supplyChainOpen} onOpenChange={setSupplyChainOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border px-4 py-3">
            <h2 className="text-lg font-semibold">Supply Chain Events</h2>
            <ChevronDown className={cn('h-5 w-5 transition-transform', supplyChainOpen && 'rotate-180')} />
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-4 pt-4">

            {/* --- All other supply chain fields remain exactly the same --- */}
            {/* ✔ They now load with preset defaultValues from above */}
            {/* ✔ No logic changed inside any field */}

            {/* MANUFACTURING BATCH */}
            <FormField
              control={form.control}
              name="manufacturingBatch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturing Batch Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rawMaterialSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raw Material Source</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qualityCheckStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quality Check Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {QUALITY_CHECK_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qualityInspector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quality Inspector Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Packaging date */}
            <FormField
              control={form.control}
              name="packagingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Packaging Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className="w-full pl-3 text-left">
                          {field.value ? format(new Date(field.value), 'PPP') : 'Pick a date'}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            {/* The rest is unchanged and uses preset defaults */}
            <FormField
              control={form.control}
              name="packagingLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Packaging Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serializationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serialization Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transportFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transport From</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transportTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transport To</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transportCarrier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transport Carrier</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="warehouseLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warehouse Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="warehouseAction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warehouse Action</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {WAREHOUSE_ACTIONS.map((action) => (
                        <SelectItem key={action} value={action}>
                          {action}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="retailerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retailer Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="retailerLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retailer Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* CUSTOMER SALE DATE */}
            <FormField
              control={form.control}
              name="customerSaleDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Customer Sale Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline">
                          {field.value ? format(new Date(field.value), 'PPP') : 'Pick a date'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale Price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CollapsibleContent>
        </Collapsible>

        {/* ADDITIONAL INFO */}
        <Collapsible open={additionalOpen} onOpenChange={setAdditionalOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md border px-4 py-3">
            <h2 className="text-lg font-semibold">Additional Information</h2>
            <ChevronDown className={cn('h-5 w-5 transition-transform', additionalOpen && 'rotate-180')} />
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="warrantyMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warranty Period (months)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value ? parseInt(e.target.value) : undefined)
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="certificateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authenticity Certificate Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes/Comments</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CollapsibleContent>
        </Collapsible>

        {/* BUTTONS */}
        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
            Generate QR Code
          </Button>

          {hasGeneratedQR && (
            <Button type="button" variant="outline" onClick={handleReset} className="flex-1">
              Reset Form
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
