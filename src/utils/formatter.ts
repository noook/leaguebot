export function formatLongNumber(amount: number): string {
  const stringAmount = amount.toString();
  let result: string = '';

  [...stringAmount].reverse().forEach((letter, index) => {
    if (index !== 0 && index % 3 === 0) {
      result += ' ';
    }
    result += letter;
  });

  return [...result].reverse().join('');
}