# Luxury QR Code Generator

A clean, minimal web application for generating QR codes with embedded product data for luxury goods tracking and authentication.

## Features

- **QR Code Generation**: Generate QR codes with all product data embedded directly
- **Supply Chain Tracking**: Track products through manufacturing, packaging, transport, warehouse, and retail
- **Data Decoder**: Beautiful display of product information from QR codes
- **No Backend Required**: All data is encoded in the QR code itself
- **Client-Side Only**: No data storage, complete privacy
- **Responsive Design**: Works seamlessly on mobile and desktop

## Technology Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- qrcode.react for QR generation
- react-hook-form + Zod for form validation
- html-to-image for QR download

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## How It Works

### QR Code Generation
1. Fill in product information in the form
2. Click "Generate QR Code"
3. All form data is encoded as JSON directly into the QR code
4. Download the QR code as PNG or copy the data

### QR Code Decoding
1. Navigate to the Decode page
2. Paste the QR code data (JSON)
3. View formatted product information with supply chain timeline

### Data Format
All data is stored as JSON in the QR code:
```json
{
  "productName": "...",
  "sku": "...",
  "brand": "...",
  "category": "...",
  "generatedAt": "2025-01-18T..."
}
```

## Privacy & Security

- No backend or database
- No data is stored anywhere
- All processing happens client-side
- QR codes contain only the data you provide

## Build

```bash
npm run build
```

The app is configured for static export and can be deployed to any static hosting service.
