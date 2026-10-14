export function Balloon({ color, size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size * 1.7}
      viewBox="0 0 40 68"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ filter: 'drop-shadow(0 8px 14px rgba(34,26,46,0.22))' }}
    >
      <ellipse cx="20" cy="19" rx="17" ry="19" fill={color} stroke="#ffffff" strokeWidth="2.5" />
      <path d="M14.5 36.5 20 42l5.5-5.5z" fill={color} stroke="#ffffff" strokeWidth="1.5" />
      <path
        d="M20 42c0 5-4 6-4 11s3 7 3 12"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
