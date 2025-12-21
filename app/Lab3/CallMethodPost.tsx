'use client';
import { useState } from 'react';

export default function CallMethodPost() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const submit = async () => {
    try {
      const res = await fetch('https://weblab.localapp.cc/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, address }),
      });
        if (!res.ok) throw new Error(String(res.status));
      setName('');
      setAddress('');
    } catch (err) {
        console.error('Failed to submit store:', err);
    }
     
  };

  return (
    <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

      <button onClick={submit} >ส่งข้อมูล</button>

    </div>
  );
}