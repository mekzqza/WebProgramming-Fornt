import { NextResponse } from 'next/server';

const mockStores = [
  { id: 1, name: '7-Eleven สาขาลาดพร้าว', address: '123 ถนนลาดพร้าว กรุงเทพฯ 10230' },
  { id: 2, name: 'Family Mart สาขาสยาม', address: '456 ถนนพระราม 1 กรุงเทพฯ 10330' },
  { id: 3, name: 'Lotus สาขารามคำแหง', address: '789 ถนนรามคำแหง กรุงเทพฯ 10240' },
  { id: 4, name: 'Big C สาขาบางนา', address: '321 ถนนบางนา กรุงเทพฯ 10260' },
  { id: 5, name: 'CJ Express สาขาสุขุมวิท', address: '654 ถนนสุขุมวิท กรุงเทพฯ 10110' }
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const store = mockStores.find(s => s.id === id);
  
  if (!store) {
    return NextResponse.json({ error: 'Store not found' }, { status: 404 });
  }
  
  return NextResponse.json(store);
}
