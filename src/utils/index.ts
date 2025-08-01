export function handleLoadMore(
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
): void {
  return setPageNumber((prev) => prev + 1);
}
