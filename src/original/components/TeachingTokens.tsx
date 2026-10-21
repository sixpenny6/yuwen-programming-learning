import React from 'react';
import { teachingCodeSeparators } from '../../teaching-code-spacing';

/** Shared by every token-based lesson and quiz, including the plain-code steps. */
export function TeachingTokens<T extends { text: string }>({ tokens, children }: {
  tokens: readonly T[];
  children: (token: T, index: number) => React.ReactNode;
}) {
  const separators = teachingCodeSeparators(tokens);
  return (
    <span data-teaching-code-line="" style={{ display: 'contents' }}>
      {tokens.map((token, index) => (
        <React.Fragment key={index}>
          {separators[index] && <span className="course-code-space">{separators[index]}</span>}
          {children(token, index)}
        </React.Fragment>
      ))}
    </span>
  );
}
