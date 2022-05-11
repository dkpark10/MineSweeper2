describe("페이지네이션 테스트", () => {

  const calculPage = ({
    totalItemCount,
    itemCountperPage,
    pageRangeDisplayed,
    currentPage
  }) => {

    const half = Math.floor(pageRangeDisplayed / 2);

    if (currentPage - half <= 1) {
      return 1;
    }

    let lastPage = Math.floor(totalItemCount / itemCountperPage);
    if (totalItemCount % itemCountperPage !== 0) {
      lastPage++;
    }

    if (currentPage >= lastPage - half) {
      return lastPage - half;
    }

    return currentPage - half;
  }

  const totalItemCount = 678;
  const itemCountperPage = 20;
  const pageRangeDisplayed = 9;

  const pageInfo = {
    totalItemCount,
    itemCountperPage,
    pageRangeDisplayed,
    currentPage: 1
  };

  let lastPage = Math.floor(totalItemCount / itemCountperPage);
  const half = Math.floor(pageRangeDisplayed / 2);
  if (totalItemCount % itemCountperPage !== 0) {
    lastPage++;
  }

  test("페이지 범위 앞", async () => {

    for (let currentPage = 1; currentPage <= 1 + half; currentPage++) {
      pageInfo.currentPage = currentPage;
      const beginPage = calculPage(pageInfo);
      expect(beginPage).toBe(1);
    }
  })

  test("페이지 범위 중간", async () => {

    for (let currentPage = 2 + half; currentPage < lastPage - half; currentPage++) {
      pageInfo.currentPage = currentPage;
      const beginPage = calculPage(pageInfo);
      expect(beginPage).toBe(currentPage - half);
    }
  })

  test("페이지 범위 마지막", async () => {

    for (let currentPage = lastPage; currentPage >= lastPage - half; currentPage--) {
      pageInfo.currentPage = currentPage;
      const beginPage = calculPage(pageInfo);
      expect(beginPage).toBe(lastPage - half);
    }
  })
})