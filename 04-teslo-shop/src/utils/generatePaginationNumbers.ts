export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
) => {
  //Si el numero de paginas es menor a 7 o menos
  //vamos a mostrar todas las paginas sin puntos de suspencion

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  //Si la pagina actual esta entre las primeras 3 paginas
  // mostrar las primeras 3, puntos suspensivos y las ultimas 2

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  //Si la pagina actual esta entre las ultimas 3 paginas
  // mostrar las primeras 2, puntos suspensivos y las ultimas 3

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  //Si la pagina actual esta otro lugar medio
  //mostrar la primera pagina, puntos suspensivos, la pagina actual y vecinos

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
