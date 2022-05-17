export const isMobile = (): boolean => {
  return /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
}

export const calculBeginPage = ({
  totalItemCount,
  itemCountperPage,
  pageRangeDisplayed,
  currentPage
}): [number, number] => {

  const half = Math.floor(pageRangeDisplayed / 2);

  let lastPage = Math.floor(totalItemCount / itemCountperPage);
  if (totalItemCount % itemCountperPage !== 0) {
    lastPage++;
  }

  if (currentPage - half <= 1) {
    return [1, lastPage];
  }

  if (currentPage > lastPage - half) {
    return [lastPage - pageRangeDisplayed + 1, lastPage];
  }

  return [currentPage - half, lastPage];
}

export const calculPrevButtonBeginPage = ({
  pageRangeDisplayed,
  currentPage
}): number => {
  return currentPage - pageRangeDisplayed <= 0 ? 1 : currentPage - pageRangeDisplayed;
}

export const calculNextButtonBeginPage = ({
  pageRangeDisplayed,
  currentPage,
  lastPage
}): number => {
  return currentPage + pageRangeDisplayed > lastPage ? lastPage : currentPage + pageRangeDisplayed;
}