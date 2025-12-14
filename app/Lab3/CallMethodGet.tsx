'use client';
import { useEffect, useState } from 'react';

type Store = { id: number; name: string; address: string };

export default function CallMethodGet() {
  const [stores, setStores] = useState<Store[]>([]);

  async function fetchStores() {
    try {
      const res = await fetch('https://weblab.localapp.cc/store');
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setStores(data);
    } catch (err) {
      console.error('Failed to fetch stores:', err);
      setStores([]);
    }
  }

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <div>
      <h2>Stores</h2>
      <button onClick={fetchStores}>Refresh</button>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            {store.name} - {store.address}
          </li>
        ))}
      </ul>
    </div>
  );
}