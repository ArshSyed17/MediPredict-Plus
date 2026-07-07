import { useState, useMemo } from 'react';

export const usePagination = ({ totalItems, initialPage = 1, initialPageSize = 10 }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.ceil(totalItems / pageSize);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  return useMemo(
    () => ({
      currentPage,
      pageSize,
      totalPages,
      nextPage,
      prevPage,
      goToPage,
      setPageSize,
    }),
    [currentPage, pageSize, totalPages]
  );
};