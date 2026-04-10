'use client';
import React, { useState } from 'react';
import Dialog from '../layout/Dialog';
import AddBookForm from './AddBookForm';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function LibraryPageHead({ className, children }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleAddBookSubmit(data: { title: string; author: string }) {
    setIsDialogOpen(false);
  }

  return (
    <div className={`flex justify-between items-center mb-8 pb-8 ${className ?? ''}`}>
      <div>
        <h1 className="text-3xl font-bold">Reading Dashboard</h1>
        <p className="mt-1 text-light-text2 text-xs">Monitor your reading habits and progress</p>
      </div>

      {/* Add Book Button and Dialog */}
      <>
        <button
          type="button"
          aria-label="Add Book"
          className="bg-light-text0 hover:bg-light-accentBorder hover:text-light-purple text-light-bg1 font-bold px-4 rounded h-8 text-sm"
          onClick={() => setIsDialogOpen(true)}
        >
          + Add Book
        </button>
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <h2 className="text-xl font-bold mb-4">Add a new book</h2>
          <AddBookForm onSubmit={handleAddBookSubmit} onCancel={() => setIsDialogOpen(false)} />
        </Dialog>
      </>

      {children}
    </div>
  );
}
