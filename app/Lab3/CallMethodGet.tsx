'use client';
import { use, useEffect, useState } from 'react';

interface Store { name: string; address: string };

export default function CallMethodGet() {
  const [stores, setStores] = useState<Store[]>([]);

useEffect(() => {
  const fetchStores = async () => {
    const res = await fetch('/api/lab3/getStores')
    const data = await res.json();
    setStores(data);
  }
fetchStores();
}, []);

  return (
    <div>
      <ul>
        {stores.map((store, index) => (
          <div key={index}>
            {store.name} - {store.address}
          </div>
        ))}
      </ul>
    </div>
  );
}