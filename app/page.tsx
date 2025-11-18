'use client';

import { useState } from 'react';
import { ProductData } from '@/lib/types';
import { ProductForm } from '@/components/ProductForm';
import { QRDisplay } from '@/components/QRDisplay';
import { QrCode, Package } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [productData, setProductData] = useState<ProductData | null>(null);

  const handleSubmit = (data: ProductData) => {
    setProductData(data);
  };

  const handleReset = () => {
    setProductData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Luxury QR Generator</h1>
                <p className="text-sm text-muted-foreground">Track and authenticate luxury goods</p>
              </div>
            </div>
            <Link href="/decode">
              <Button variant="outline" className="gap-2">
                <Package className="h-4 w-4" />
                Decode QR
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Product Information</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in the details below to generate a QR code with embedded product data.
              </p>
            </div>
            <ProductForm
              onSubmit={handleSubmit}
              onReset={handleReset}
              hasGeneratedQR={!!productData}
            />
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            {productData ? (
              <QRDisplay data={productData} />
            ) : (
              <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted">
                <div className="text-center">
                  <QrCode className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium text-foreground">No QR Code Yet</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fill in the form and click Generate QR Code to create your product QR code.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-16 border-t border-border bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            All data is encoded directly in the QR code. No data is stored on any server.
          </p>
        </div>
      </footer>
    </div>
  );
}

