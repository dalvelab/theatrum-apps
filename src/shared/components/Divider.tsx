interface DividerProps {
  type?: 'line' | 'dot';
  color?: string;
}

export const Divider: React.FC<DividerProps> = ({color = '#E9D5CD', type = 'line'}) => {
  if (type === 'dot') {
    return (
      <svg width="4" height="5" viewBox="0 0 4 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2.58621C4 3.72887 3.10457 4.65517 2 4.65517C0.89543 4.65517 0 3.72887 0 2.58621C0 1.44355 0.89543 0.517242 2 0.517242C3.10457 0.517242 4 1.44355 4 2.58621Z" fill={color}/>
      </svg>

    )
  }

  return (
    <svg width="40" height="1" viewBox="0 0 40 1" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line y1="0.5" x2="40" y2="0.5" stroke={color} />
    </svg>
  )
}