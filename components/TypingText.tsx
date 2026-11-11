import { useEffect, useState } from 'react';

interface TypingTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
}

/** Types out each word, pauses, deletes it, then moves to the next one. */
function TypingText({
  words,
  typingSpeed = 70,
  deletingSpeed = 35,
  pause = 1500,
  className = '',
}: TypingTextProps) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      timer = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? deletingSpeed : typingSpeed
      );
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse ml-0.5">|</span>
    </span>
  );
}

export default TypingText;
