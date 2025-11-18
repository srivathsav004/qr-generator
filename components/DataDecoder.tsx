'use client';

import { useState } from 'react';
import { ProductData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Package2, Calendar, MapPin, Truck, Warehouse, Store, Shield } from 'lucide-react';
import { format } from 'date-fns';

export function DataDecoder() {
  const [input, setInput] = useState('');
  const [decodedData, setDecodedData] = useState<ProductData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = () => {
    setError(null);
    setDecodedData(null);

    try {
      const parsed = JSON.parse(input.trim());
      setDecodedData(parsed);
    } catch (err) {
      setError('Invalid JSON data. Please paste valid QR code data.');
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      return format(new Date(dateString), 'PPP');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Decode QR Code Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Paste QR code data here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[120px] font-mono text-sm"
          />
          <Button
            onClick={handleDecode}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            disabled={!input.trim()}
          >
            Decode Data
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {decodedData && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="bg-slate-50">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{decodedData.productName}</CardTitle>
                  <p className="mt-1 text-sm text-slate-600">SKU: {decodedData.sku}</p>
                </div>
                <Badge className="bg-emerald-600">{decodedData.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Package2 className="mt-1 h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Brand</p>
                    <p className="text-slate-600">{decodedData.brand}</p>
                  </div>
                </div>

                {decodedData.manufacturingDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="mt-1 h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Manufacturing Date</p>
                      <p className="text-slate-600">{formatDate(decodedData.manufacturingDate)}</p>
                    </div>
                  </div>
                )}

                {decodedData.warrantyMonths && (
                  <div className="flex items-start gap-3">
                    <Shield className="mt-1 h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Warranty</p>
                      <p className="text-slate-600">{decodedData.warrantyMonths} months</p>
                    </div>
                  </div>
                )}

                {decodedData.certificateNumber && (
                  <div className="flex items-start gap-3">
                    <Shield className="mt-1 h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">Certificate Number</p>
                      <p className="text-slate-600">{decodedData.certificateNumber}</p>
                    </div>
                  </div>
                )}
              </div>

              {decodedData.description && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h3 className="mb-2 font-semibold text-slate-900">Description</h3>
                    <p className="text-slate-600">{decodedData.description}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {(decodedData.manufacturingBatch ||
            decodedData.rawMaterialSource ||
            decodedData.qualityCheckStatus ||
            decodedData.qualityInspector ||
            decodedData.packagingDate ||
            decodedData.packagingLocation ||
            decodedData.serializationNumber ||
            decodedData.transportFrom ||
            decodedData.transportTo ||
            decodedData.transportCarrier ||
            decodedData.warehouseLocation ||
            decodedData.warehouseAction ||
            decodedData.retailerName ||
            decodedData.retailerLocation ||
            decodedData.customerSaleDate ||
            decodedData.salePrice) && (
            <Card>
              <CardHeader>
                <CardTitle>Supply Chain Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {(decodedData.manufacturingBatch ||
                    decodedData.rawMaterialSource ||
                    decodedData.qualityCheckStatus ||
                    decodedData.qualityInspector) && (
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <div className="h-3 w-3 rounded-full bg-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Manufacturing & Quality</h4>
                        <div className="mt-2 space-y-1 text-sm">
                          {decodedData.manufacturingBatch && (
                            <p className="text-slate-600">Batch: {decodedData.manufacturingBatch}</p>
                          )}
                          {decodedData.rawMaterialSource && (
                            <p className="text-slate-600">Material Source: {decodedData.rawMaterialSource}</p>
                          )}
                          {decodedData.qualityCheckStatus && (
                            <div className="flex items-center gap-2">
                              <span className="text-slate-600">Quality Check:</span>
                              <Badge
                                variant={
                                  decodedData.qualityCheckStatus === 'Pass'
                                    ? 'default'
                                    : decodedData.qualityCheckStatus === 'Fail'
                                    ? 'destructive'
                                    : 'secondary'
                                }
                              >
                                {decodedData.qualityCheckStatus}
                              </Badge>
                            </div>
                          )}
                          {decodedData.qualityInspector && (
                            <p className="text-slate-600">Inspector: {decodedData.qualityInspector}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {(decodedData.packagingDate || decodedData.packagingLocation || decodedData.serializationNumber) && (
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Package2 className="h-3 w-3 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Packaging</h4>
                        <div className="mt-2 space-y-1 text-sm">
                          {decodedData.packagingDate && (
                            <p className="text-slate-600">Date: {formatDate(decodedData.packagingDate)}</p>
                          )}
                          {decodedData.packagingLocation && (
                            <p className="text-slate-600">Location: {decodedData.packagingLocation}</p>
                          )}
                          {decodedData.serializationNumber && (
                            <p className="text-slate-600">Serial: {decodedData.serializationNumber}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {(decodedData.transportFrom || decodedData.transportTo || decodedData.transportCarrier) && (
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Truck className="h-3 w-3 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Transportation</h4>
                        <div className="mt-2 space-y-1 text-sm">
                          {decodedData.transportFrom && (
                            <p className="text-slate-600">From: {decodedData.transportFrom}</p>
                          )}
                          {decodedData.transportTo && (
                            <p className="text-slate-600">To: {decodedData.transportTo}</p>
                          )}
                          {decodedData.transportCarrier && (
                            <p className="text-slate-600">Carrier: {decodedData.transportCarrier}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {(decodedData.warehouseLocation || decodedData.warehouseAction) && (
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Warehouse className="h-3 w-3 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Warehouse</h4>
                        <div className="mt-2 space-y-1 text-sm">
                          {decodedData.warehouseLocation && (
                            <p className="text-slate-600">Location: {decodedData.warehouseLocation}</p>
                          )}
                          {decodedData.warehouseAction && (
                            <div className="flex items-center gap-2">
                              <span className="text-slate-600">Action:</span>
                              <Badge variant="outline">{decodedData.warehouseAction}</Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {(decodedData.retailerName || decodedData.retailerLocation || decodedData.customerSaleDate || decodedData.salePrice) && (
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Store className="h-3 w-3 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Retail</h4>
                        <div className="mt-2 space-y-1 text-sm">
                          {decodedData.retailerName && (
                            <p className="text-slate-600">Retailer: {decodedData.retailerName}</p>
                          )}
                          {decodedData.retailerLocation && (
                            <p className="text-slate-600">Location: {decodedData.retailerLocation}</p>
                          )}
                          {decodedData.customerSaleDate && (
                            <p className="text-slate-600">Sale Date: {formatDate(decodedData.customerSaleDate)}</p>
                          )}
                          {decodedData.salePrice && (
                            <p className="text-slate-600">Price: {decodedData.salePrice}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {decodedData.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{decodedData.notes}</p>
              </CardContent>
            </Card>
          )}

          {decodedData.generatedAt && (
            <p className="text-center text-sm text-slate-500">
              QR Code generated on {new Date(decodedData.generatedAt).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
