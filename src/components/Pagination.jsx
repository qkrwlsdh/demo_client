import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
      <div className="mt-5 flex justify-center">
        {pageNumbers.map((number) => (
          <div key={number} onClick={() => onPageChange(number)}>
            <div
              className={`mx-2 px-3 py-1 border border-gray-400 rounded cursor-pointer ${
                currentPage === number ? 'bg-blue-900 text-white' : 'bg-white text-blue-900'
              }`}>
              {number}
            </div>
          </div>
        ))}
      </div>
    );
  };
  export default Pagination;