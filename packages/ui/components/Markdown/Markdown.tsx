import ReactMarkdown from 'react-markdown';

import styles from './styles.module.css';

interface MarkdownProps {
  text: string
}

export const Markdown: React.FC<MarkdownProps> = ({text}) => {
  return (
    <ReactMarkdown className={styles.description}>
      {text}
    </ReactMarkdown>
  )
}