export default function defaultBookSpine({
  accentColor = '#c49a2a',
  title = 'Book Title',
  author = '',
  width = 22,
  height = 130,
  bg = '#f5f1e8',
}) {
  const ruleInset = Math.max(2, Math.round(width * 0.14));
  const ruleY1 = 13;
  const ruleY2 = height - 13;
  const cx = width / 2 + 4;
  const midY = (ruleY1 + ruleY2) / 2;
  const titleFontSize = Math.max(7.5, Math.min(10.5, width * 0.42));
  const authorFontSize = Math.max(6.5, Math.min(8.5, width * 0.34));
  const titleMaxChars = Math.max(10, Math.round(height / 8));
  const titleText = title.length > titleMaxChars ? `${title.slice(0, titleMaxChars - 1)}…` : title;
  const authorLastName = author ? author.split(' ').slice(-1)[0] : '';
  const authorMaxChars = Math.max(8, Math.round(height / 11));
  const authorText =
    authorLastName.length > authorMaxChars
      ? `${authorLastName.slice(0, authorMaxChars - 1)}…`
      : authorLastName;
  const edgeLine = 'rgba(0,0,0,0.08)';
  const hingeShade = 'rgba(0,0,0,0.06)';
  const ruleLine = 'rgba(0,0,0,0.06)';

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ flexShrink: 0, display: 'block' }}
    >
      <rect x="0" y="0" width={width} height={height} rx="1" fill={bg} />
      <rect x="0" y="0" width={width} height="1" fill={edgeLine} />
      <rect x="0" y={height - 1} width={width} height="1" fill={edgeLine} />
      <rect x="0" y="0" width="2" height={height} fill={hingeShade} />
      <rect x="0" y="0" width={width} height="4" rx="1" fill={accentColor} />
      <line
        x1={ruleInset}
        y1={ruleY1}
        x2={width - ruleInset}
        y2={ruleY1}
        stroke={ruleLine}
        strokeWidth="0.5"
      />
      <line
        x1={ruleInset}
        y1={ruleY2}
        x2={width - ruleInset}
        y2={ruleY2}
        stroke={ruleLine}
        strokeWidth="0.5"
      />
      <text
        transform={`rotate(-90) translate(-${midY}, ${cx})`}
        textAnchor="middle"
        fill="#444444"
        fontSize={titleFontSize}
        fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontStyle="normal"
        fontWeight="500"
        letterSpacing="0"
      >
        {titleText}
      </text>
      {authorText && width >= 20 && (
        <text
          transform={`rotate(-90) translate(-${ruleY2 - 10}, ${cx})`}
          textAnchor="middle"
          fill="#666666"
          fontSize={authorFontSize}
          fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          fontStyle="normal"
          letterSpacing="0.15"
        >
          {authorText}
        </text>
      )}
    </svg>
  );
}
