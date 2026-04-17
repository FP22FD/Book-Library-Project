'use client';

import { useMemo, useState } from 'react';

type BookCoverPlaceholderProps = {
    src?: string | null;
    alt: string;
    className?: string;
};

export default function BookCoverPlaceholder({
    src,
    alt,
    className = '',
}: BookCoverPlaceholderProps) {
    const normalizedSrc = useMemo(() => {
        const value = src?.trim();
        return value ? value : null;
    }, [src]);

    const [hasError, setHasError] = useState(false);
    const showFallback = !normalizedSrc || hasError;

    if (showFallback) {
        return (
            <div
                role="img"
                aria-label={alt}
                className={[
                    'flex h-full w-full items-center justify-center rounded-md',
                    'bg-light-bg2 text-light-text2 border border-light-border',
                    className,
                ].join(' ')}
            >
                <span className="text-xs font-medium tracking-wide uppercase">No book Cover</span>
            </div>
        );
    }

    return (
        <img
            src={normalizedSrc}
            alt={alt}
            className={className}
            onError={() => setHasError(true)}
            loading="lazy"
        />
    );
}