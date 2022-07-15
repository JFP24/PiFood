import React from "react";
import styles from "./Pagination.module.css";

export const Pagination = ({
  foodPerPage,
  allRecipes,
  paginado,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / foodPerPage); i++) {
    pageNumbers.push(i);
  }
  //  console.log(pageNumbers.length, "this is page number");
  // console.log(currentPage, "this is curretpage");
  return (
    <div className={styles.container}>
      <nav>
        <ul>
          <button
            disabled={currentPage > 1 ? false : true}
            onClick={() => paginado(currentPage - 1)}
          >
            Prev
          </button>
          {/* {pageNumbers?.map((number) => (
            <button onClick={() => paginado(number)}>{number}</button>
          ))} */}
          {currentPage} de {pageNumbers.length}
          <button
            disabled={currentPage < pageNumbers.length ? false : true}
            onClick={() => paginado(currentPage + 1)}
          >
            Next
          </button>
          <div></div>
        </ul>
      </nav>
    </div>
  );
};
