'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Item {
  _id: string;
  name: string;
  description: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const loadItems = async () => {
      const { data } = await api.get('/items');
      setItems(data);
    };

    void loadItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/items', { name, description });
    setName('');
    setDescription('');
    const { data } = await api.get('/items');
    setItems(data);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>MongoDB</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginLeft: '0.5rem' }}
        />
        <button type="submit" style={{ marginLeft: '0.5rem' }}>
          Agregar
        </button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong> — {item.description}
          </li>
        ))}
      </ul>
    </main>
  );
}