'use client';
import { useState } from 'react';

type Props = {
  onSubmit: (data: { title: string; author: string }) => void;
  onCancel: () => void;
};

export default function AddBookForm({ onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // TODO: Verification to this deprecation warning FormEvent in React 18 with React Compiler in Next.js 14
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ title, author });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-light-text2 text-xs mb-1 font-semibold">Title</label>
        <input
          className="w-full px-3 py-2 border border-light-accentBorder rounded bg-light-bg1 text-light-text0 focus:outline-none focus:ring-2 focus:ring-light-accentBorder"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-light-text2 text-xs mb-1 font-semibold">Author</label>
        <input
          className="w-full px-3 py-2 border border-light-accentBorder rounded bg-light-bg1 text-light-text0 focus:outline-none focus:ring-2 focus:ring-light-accentBorder"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end gap-2 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 h-8 rounded bg-light-bg1 border border-light-border text-light-text2 hover:bg-light-bg3 hover:text-light-tag1t text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 h-8 rounded bg-light-bgActive text-light-bg1 font-bold text-sm hover:bg-light-accentBorder hover:text-light-purple"
        >
          Add
        </button>
      </div>
    </form>
  );
}
