'use client';

import { useMemo, useState } from 'react';

type Props = {
    text?: string | null;
    maxChars?: number;
};

function truncateAtWord(input: string, limit: number): string {
    if (input.length <= limit) return input;
    const sliced = input.slice(0, limit);
    const lastSpace = sliced.lastIndexOf(' ');
    return (lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced).trimEnd() + '...';
}

export default function DescriptionPreview({ text = '', maxChars = 400 }: Props) {
    const [expanded, setExpanded] = useState(false);

    const { isLong, shortText } = useMemo(() => {
        const trimmed = text?.trim() ?? '';
        return {
            isLong: trimmed.length > maxChars,
            shortText: truncateAtWord(trimmed, maxChars),
        };
    }, [text, maxChars]);

    if (!text?.trim()) {
        return <p className="mb-4 leading-relaxed text-left text-light-text2">No description available.</p>;
    }

    return (
        <div>
            <p className="mb-2 leading-relaxed text-left">
                {expanded || !isLong ? text : shortText}
            </p>

            {isLong ? (
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => setExpanded((v) => !v)}
                        className="text-sm font-medium text-light-text2 underline underline-offset-2 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        aria-expanded={expanded}
                    >
                        {expanded ? 'View less' : 'View more'}
                    </button>
                </div>
            ) : null}
        </div>
    );
}