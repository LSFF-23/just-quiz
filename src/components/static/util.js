export function shuffle (array) {
  const aCopy = [...array];
  for (let i = aCopy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [aCopy[i], aCopy[j]] = [aCopy[j], aCopy[i]];
  }
  return aCopy;
}