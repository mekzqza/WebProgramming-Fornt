# โครงสร้างโปรเจค - AI Chat Application

## 📁 โครงสร้างไฟล์ที่สร้างขึ้น

```
app/
├── ai-chat/                           # Feature module หลักสำหรับ Chat
│   ├── components/                    # ส่วนประกอบ UI ที่แยกเป็นไฟล์
│   │   ├── ChatHeader.tsx            # ส่วนหัวของ Chat (ชื่อ + ปุ่ม Clear)
│   │   ├── ChatMessage.tsx           # ข้อความแต่ละข้อความ (User & AI)
│   │   ├── ChatInput.tsx             # Input box และปุ่ม Send
│   │   ├── EmptyState.tsx            # หน้าจอตอนยังไม่มีข้อความ
│   │   ├── LoadingIndicator.tsx      # แสดงตอน AI กำลังตอบ
│   │   └── ChatStyles.tsx            # CSS Animations และ Global Styles
│   │
│   ├── hooks/                         # Custom React Hooks
│   │   └── useChatHistory.ts         # จัดการ Chat History และ API calls
│   │
│   ├── styles/                        # Styles แยกไฟล์
│   │   └── chat.styles.ts            # ทั้งหมด inline styles
│   │
│   ├── types/                         # TypeScript Type Definitions
│   │   └── chat.types.ts             # Interface สำหรับ Message, Config
│   │
│   ├── config/                        # Configuration Files
│   │   └── chat.config.ts            # ค่าคงที่, UI Text, Chat Config
│   │
│   └── page.tsx                       # หน้าหลัก (Clean & Simple)
│
├── api/
│   └── chat/
│       ├── route.ts                   # API Endpoint (POST /api/chat)
│       └── config.ts                  # API Configuration
│
lib/                                   # Shared Utilities
├── api/
│   └── chatApi.ts                    # API Client (สำหรับอนาคต)
└── utils/
    └── logger.ts                      # Logging System

.env.example                           # ตัวอย่าง Environment Variables
README.md                              # คู่มือการใช้งาน
```

## ✨ คุณสมบัติของโครงสร้างใหม่

### 1. **Separation of Concerns**
- แยก UI Components, Business Logic, Styles, และ Types ออกจากกัน
- แต่ละส่วนทำหน้าที่เฉพาะของมัน
- ง่ายต่อการหา bug และแก้ไข

### 2. **Reusability**
- Components ทั้งหมดสามารถนำไปใช้ซ้ำได้
- Hooks แยกออกมาใช้ได้หลายที่
- Styles กำหนดเป็น object แยกไฟล์

### 3. **Scalability**
- เพิ่ม Components ใหม่ได้ง่าย
- เพิ่ม Hooks ได้เรื่อยๆ
- Configuration แยกไฟล์ ปรับแต่งง่าย

### 4. **Type Safety**
- TypeScript ทั้งหมด
- Interface ชัดเจน
- IDE Autocomplete ทำงานได้ดี

### 5. **Production Ready**
- Error Handling ครบถ้วน
- Logging System
- Environment Variables
- Validation ทั้ง Frontend และ Backend

## 🚀 วิธีการใช้งาน

### 1. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local`:

```bash
AGENT_SHORT_ID=your_actual_agent_id
ACCESS_TOKEN=your_actual_token
NODE_ENV=development
```

### 2. รันโปรเจค

```bash
npm run dev
```

เปิด: http://localhost:3000/ai-chat

### 3. Build สำหรับ Production

```bash
npm run build
npm start
```

## 📝 วิธีแก้ไข/ขยาย

### เปลี่ยนสี UI
แก้ไฟล์: `app/ai-chat/styles/chat.styles.ts`

### เปลี่ยนข้อความ
แก้ไฟล์: `app/ai-chat/config/chat.config.ts`

### เพิ่ม Component ใหม่
1. สร้างไฟล์ใน `app/ai-chat/components/`
2. Import ใน `page.tsx`

### เปลี่ยน Sliding Window Size
แก้ไฟล์: `app/ai-chat/config/chat.config.ts`
```typescript
slidingWindowSize: 10  // เปลี่ยนจาก 6 เป็น 10
```

### เพิ่ม Feature ใหม่
1. สร้าง Hook ใน `hooks/`
2. สร้าง Type ใน `types/`
3. สร้าง Component ใน `components/`
4. เชื่อมใน `page.tsx`

## 🔧 Troubleshooting

### TypeScript Error: Cannot find module
- รัน: `npm run dev` (Next.js จะ rebuild types)
- หรือ restart VS Code
- ตรวจสอบว่าไฟล์ถูกสร้างครบ

### API Error 400/500
- ตรวจสอบ `.env.local` มี AGENT_SHORT_ID และ ACCESS_TOKEN หรือยัง
- ดู console logs ใน terminal
- เช็ค Network tab ใน DevTools

### UI ไม่สวย/ขาว
- Hard refresh: Ctrl+Shift+R
- Clear cache
- ตรวจสอบว่า styles ถูก import

## 💡 Best Practices

1. **อย่าแก้ไข `page.tsx` ให้ซับซ้อน** - ให้แยกไปเป็น Component
2. **ใช้ Config แทน Hardcode** - เก็บค่าคงที่ใน config file
3. **Type ทุกอย่าง** - อย่าใช้ `any`
4. **Log ทุก Error** - ใช้ logger แทน console.log
5. **Test ใน Dev ก่อน** - แล้วค่อย build production

## 📚 เอกสารเพิ่มเติม

- [README.md](README.md) - คู่มือหลัก
- [.env.example](.env.example) - ตัวอย่าง environment variables

## 🎯 Next Steps

1. ✅ ตั้งค่า environment variables
2. ✅ Test การทำงานของ Chat
3. ⬜ ปรับแต่ง UI ตามต้องการ
4. ⬜ เพิ่ม features เพิ่มเติม (เช่น save history, export chat)
5. ⬜ Deploy to production
