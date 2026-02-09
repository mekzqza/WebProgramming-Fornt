import { NextResponse } from "next/server";

let stores = [
  { name: "7-Eleven", address: "Bangkok" },
  { name: "Family Mart", address: "Chiang Mai" },
];

// GET method - เมื่อมีคนเรียก /api/store
export async function GET() {
  // ส่งข้อมูลกลับไปในรูปแบบ JSON
  return NextResponse.json(stores);
}

// POST method - เมื่อมีการส่งข้อมูลร้านค้าใหม่มา
export async function POST(req: Request) {
  const { name, address } = await req.json();
  const newStore = { name, address };
  stores.push(newStore); // เพิ่มร้านค้าใหม่ในรายการ
  return NextResponse.json(newStore, { status: 201 });
}
