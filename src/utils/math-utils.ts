export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomUniqueNumbersList = (
  min: number,
  max: number,
  count: number = 4,
): number[] => {
  const uniqueNumbers = new Set<number>();
  while (uniqueNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    uniqueNumbers.add(randomNumber);
  }
  return Array.from(uniqueNumbers);
};
