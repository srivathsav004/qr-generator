'use client';

import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';
import { Download, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductData } from '@/lib/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

interface QRDisplayProps {
  data: ProductData;
}

export function QRDisplay({ data }: QRDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(data);
  const dataSize = new Blob([jsonString]).size;

  const downloadQR = async () => {
    if (qrRef.current === null) return;

    try {
      const dataUrl = await toPng(qrRef.current, {
        cacheBust: true,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `${data.productName.replace(/\s+/g, '-')}-qr.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating QR code image:', err);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Generated QR Code</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div
            ref={qrRef}
            className="rounded-lg border-4 border-border bg-card p-4"
          >
            <QRCodeSVG value={jsonString} size={400} level="M" />
          </div>

          <div className="flex w-full gap-3">
            <Button
              onClick={downloadQR}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              <Download className="mr-2 h-4 w-4" />
              Download QR
            </Button>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="flex-1"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Data
                </>
              )}
            </Button>
          </div>

          <div className="w-full text-center text-sm text-muted-foreground">
            <p>Data size: {dataSize} bytes</p>
            {dataSize > 2000 && (
              <Alert className="mt-2">
                <AlertDescription>
                  Warning: QR code contains a large amount of data. Some scanners
                  may have difficulty reading it.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Encoded Data Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h3 className="mb-2 font-semibold text-foreground">Product Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product Name:</span>
                  <span className="font-medium">{data.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKU:</span>
                  <span className="font-medium">{data.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Brand:</span>
                  <span className="font-medium">{data.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <Badge variant="secondary">{data.category}</Badge>
                </div>
                {data.description && (
                  <div>
                    <span className="text-muted-foreground">Description:</span>
                    <p className="mt-1 text-foreground">{data.description}</p>
                  </div>
                )}
              </div>
            </div>

            {(data.qualityCheckStatus || data.warehouseAction || data.retailerName) && (
              <>
                <Separator />
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Supply Chain</h3>
                  <div className="space-y-2 text-sm">
                    {data.qualityCheckStatus && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quality Status:</span>
                        <Badge
                          variant={
                            data.qualityCheckStatus === 'Pass'
                              ? 'default'
                              : data.qualityCheckStatus === 'Fail'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {data.qualityCheckStatus}
                        </Badge>
                      </div>
                    )}
                    {data.warehouseAction && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Warehouse Action:</span>
                        <Badge variant="outline">{data.warehouseAction}</Badge>
                      </div>
                    )}
                    {data.retailerName && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Retailer:</span>
                        <span className="font-medium">{data.retailerName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {(data.warrantyMonths || data.certificateNumber) && (
              <>
                <Separator />
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">Additional Details</h3>
                  <div className="space-y-2 text-sm">
                    {data.warrantyMonths && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Warranty:</span>
                        <span className="font-medium">{data.warrantyMonths} months</span>
                      </div>
                    )}
                    {data.certificateNumber && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Certificate:</span>
                        <span className="font-medium">{data.certificateNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {data.generatedAt && (
              <>
                <Separator />
                <div className="text-center text-xs text-muted-foreground">
                  Generated on {new Date(data.generatedAt).toLocaleString()}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
