import React from "react";
import _ from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "./pagination.css";

const Pagination = ({ images, ppp, onPageChange, curPage, setCurPage }) => {
  const pagesSize = Math.ceil(images.length / ppp);
  if (pagesSize === 1) return null;
  const pages = _.range(1, pagesSize + 1);
  return (
    <div className="pagination-container">
      <div className="pagination">
        <FontAwesomeIcon onClick={() => setCurPage(curPage - 1)} icon={faChevronLeft} className={curPage === 1 ? "pagination-icon-disabled" : "pagination-icon"} />
        <ul className="pagination-list">
          {pages.map(page => (
            <li key={page} className="page-li">
              <button
                onClick={() => { onPageChange(page); window.scrollTo(0, 0) }}
                className={page === curPage ? "page-a-active" : "page-a"}>
                {page}
              </button>
            </li>
          ))}
        </ul>
        <FontAwesomeIcon onClick={() => setCurPage(curPage + 1)} icon={faChevronRight} className={curPage === pages.length ? "pagination-icon-disabled" : "pagination-icon"} />
      </div>
    </div>
  );
};

export default Pagination;
