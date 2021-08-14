import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

interface IProps {
  total: number;
  callback: (number: number) => void;
}

const Pagination = ({ total, callback }: IProps): JSX.Element => {
  const [page, setPage] = useState(1);
  const newArr = [...Array(total)].map((_, i) => i + 1);
  const history = useHistory();

  const isActive = (index: number) => {
    if (index === page) return 'active';
    return '';
  };

  const handlePagination = (num: number) => {
    history.push(`?page=${num}`);
    setPage(num);
    callback(num);
  };

  useEffect(() => {
    const num = history.location.search.slice(6) || 1;
    setPage(Number(num));
  }, [history.location.search]);

  return (
    <nav aria-label="Page navigation example" style={{ cursor: 'pointer', width: 'fit-content' }}>
      <ul className="pagination">
        {page > 1 && (
          <li className="page-item" onClick={() => handlePagination(page - 1)}>
            <span className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
        )}

        {newArr.map((num) => (
          <li
            className={`page-item ${isActive(num)}`}
            key={num}
            onClick={() => handlePagination(num)}
          >
            <span className="page-link">{num}</span>
          </li>
        ))}

        {page < total && (
          <li className="page-item" onClick={() => handlePagination(page + 1)}>
            <span className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Pagination;
