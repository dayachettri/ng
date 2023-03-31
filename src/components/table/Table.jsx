import { useState } from 'react';
import { HiChevronUpDown } from 'react-icons/hi2';
import { HiChevronUp } from 'react-icons/hi2';
import { HiChevronDown } from 'react-icons/hi2';
import './Table.css';

function Table({ data, columns, onAdd }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  //Add a row

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const toggleSortOrder = column => {
    if (column !== sortColumn) {
      setSortColumn(column);
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder(null);
      setSortColumn(null);
    }
  };

  const renderedHeaders = columns.map(column => {
    let arrow = <HiChevronUpDown />;
    if (sortColumn === column.selector) {
      arrow = sortOrder === 'asc' ? <HiChevronUp /> : <HiChevronDown />;
    }
    return (
      <th
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
        }}
        key={column.label}
        onClick={() => toggleSortOrder(column.selector)}
      >
        {column.label} {arrow}
      </th>
    );
  });

  let renderedUsers = [...data];
  if (sortColumn !== null) {
    renderedUsers.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (typeof aValue === 'string') {
        return aValue.localeCompare(bValue) * (sortOrder === 'asc' ? 1 : -1);
      } else {
        return (aValue - bValue) * (sortOrder === 'asc' ? 1 : -1);
      }
    });
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = renderedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(renderedUsers.length / usersPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = e => {
    setCurrentPage(Number(e.target.id));
  };

  // creating pageNumbers
  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        key={number}
        id={number}
        onClick={handlePageClick}
        className={currentPage === number ? 'currentPage' : ''}
      >
        {number}
      </li>
    );
  });

  //setting renderedUsers array to current 10 users which is the limit per page and mapping them
  renderedUsers = currentUsers
    .filter(
      user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.age.toString().includes(searchTerm)
    )
    .map(user => (
      <tr key={user.id}>
        <td>{user.firstName}</td>
        <td>{user.gender}</td>
        <td>{user.age}</td>
        <td>{user.university}</td>
      </tr>
    ));

  return (
    <>
      <ul className="pages">{renderPageNumbers}</ul>
      <h4 className="searchHeader">Search Users</h4>
      <input
        onChange={handleChange}
        value={searchTerm}
        type="text"
        className="searchInput"
      />
      <table>
        <thead>
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedUsers}</tbody>
      </table>
    </>
  );
}

export default Table;
