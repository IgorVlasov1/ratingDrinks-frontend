import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../reducers/appReducer";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import styles from "./pagination.module.css";

const Pagination = () => {
  const dispatch = useDispatch();
  const totalCount = useSelector((state) => state.app.totalCount);
  const limit = useSelector((state) => state.app.limit);
  const page = useSelector((state) => state.app.page);
  const pageNumbers = [];
  const pageCount = Math.ceil(totalCount / limit);
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  let startPage = Math.max(page - 3, 1);
  let endPage = Math.min(page + 3, pageCount);

  if (startPage <= 3) {
    startPage = 1;
    endPage = Math.min(pageCount, 7);
  }

  if (endPage >= pageCount - 2) {
    endPage = pageCount;
    startPage = Math.max(1, pageCount - 6);
  }

  function paginationLeftHandler() {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  }

  function paginationRightHandler() {
    if (page < pageCount) {
      dispatch(setPage(page + 1));
    }
  }

  // Максимальное количество страниц для отображения
  const maxPagesToShow = 7;

  return (
    <div className={styles.paginationContainer}>
      {page !== 1 && (
        <div
          className={styles.paginationNavigateLeft}
          onClick={() => paginationLeftHandler()}
        >
          <AiOutlineArrowLeft />
          <a className={styles.textArrowLeft}>Предыдущая страница</a>
        </div>
      )}
      <div className={styles.paginationItemsContainer}>
        {pageNumbers.map((number, index) => {
          if (
            number === 1 ||
            number === pageCount ||
            (number >= startPage && number <= endPage)
          ) {
            return (
              <div key={number}>
                <a
                  className={
                    page === number
                      ? styles.paginationItemActive
                      : styles.paginationItem
                  }
                  href="#"
                  onClick={() => dispatch(setPage(number))}
                >
                  {number}
                </a>
              </div>
            );
          } else if (
            (number === startPage - 1 && startPage > maxPagesToShow / 2 + 1) ||
            (number === endPage + 1 && endPage < pageCount - maxPagesToShow / 2)
          ) {
            return (
              <div key={index}>
                <span className={styles.paginationItem}>...</span>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      {page !== pageCount && (
        <div
          className={styles.paginationNavigateRight}
          onClick={() => paginationRightHandler()}
        >
          <a className={styles.textArrowRight}>Следующая страница</a>
          <AiOutlineArrowRight />
        </div>
      )}
    </div>
  );
};

export default Pagination;
