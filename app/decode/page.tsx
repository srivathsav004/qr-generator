'use client';

import Link from 'next/link';
import { DataDecoder } from '@/components/DataDecoder';
import { QrCode, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DecodePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">QR Code Decoder</h1>
                <p className="text-sm text-slate-600">View product information from QR codes</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Generator
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900">Decode Product Data</h2>
          <p className="mt-1 text-sm text-slate-600">
            Paste the QR code data below to view the product information in a beautiful format.
          </p>
        </div>

        <DataDecoder />
      </main>

      <footer className="mt-16 border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-600">
            All data is decoded client-side. No data is sent to any server.
          </p>
        </div>
      </footer>
    </div>
  );
}
