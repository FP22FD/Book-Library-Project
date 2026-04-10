import React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Dialog({ open, onClose, children }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className="bg-light-bg1 rounded-lg shadow-lg p-8 min-w-[320px] w-[50vw] max-w-2xl relative flex flex-col"
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-light-text2 hover:text-light-purple text-lg font-semibold px-4"
          aria-label="Close dialog"
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
}
