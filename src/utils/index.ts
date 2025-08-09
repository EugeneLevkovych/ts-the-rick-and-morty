import type { Dispatch, SetStateAction } from "react";

export function handleLoadMore(
  setPageNumber: Dispatch<SetStateAction<number>>
): void {
  return setPageNumber((prev) => prev + 1);
}
