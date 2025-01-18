const getPageNumbers = (pageNumber, totalPages) => {
    const pageNumbers = [];
    const pageLimit = 3;
    let startPage = Math.max(1, pageNumber - Math.floor(pageLimit / 2));
    const endPage = Math.min(totalPages, startPage + pageLimit - 1);
    if (endPage - startPage + 1 < pageLimit) {
      startPage = Math.max(1, endPage - pageLimit + 1);
    }
    for (let i = startPage; i <= endPage; i+=1) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  export default getPageNumbers;