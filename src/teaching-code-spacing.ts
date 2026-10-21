/** Display separators for teaching tokens whose source omits whitespace.
 * Keep token text intact: it is also the key for the recorded pronunciation.
 * Punctuation and text inside strings are never rewritten.
 */
export function teachingCodeSeparators(tokens: readonly { text: string }[]): string[] {
  return tokens.map((token, index) => {
    const left = tokens[index - 1]?.text ?? '';
    const right = token.text;
    if (!left || !right || /\s$/u.test(left) || /^\s/u.test(right)) return '';
    // int age, const char, else if, and other separately taught words.
    if (/[\p{L}\p{N}_]$/u.test(left) && /^[\p{L}\p{N}_]/u.test(right)) return ' ';
    // std::vector<int> scores: retain a clear boundary after a template type.
    if (/>$/u.test(left) && /^[\p{L}_]/u.test(right)) return ' ';
    return '';
  });
}

export function joinTeachingCode(tokens: readonly { text: string }[]): string {
  const separators = teachingCodeSeparators(tokens);
  return tokens.map((token, index) => separators[index] + token.text).join('');
}
