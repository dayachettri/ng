import { useState } from 'react';
import { HiChevronUpDown } from 'react-icons/hi2';
import { HiChevronUp } from 'react-icons/hi2';
import { HiChevronDown } from 'react-icons/hi2';
import { MdDeleteForever } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import './Table.css';

function Table({ data, columns, onAdd, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [showAddRowForm, setShowAddRowForm] = useState(false);
  const [newRowData, setNewRowData] = useState({});

  //EVENT HANDLERS
  const toggleEditRowForm = id => {
    setShowAddRowForm(!showAddRowForm);
    const editableRow = data.find(user => user.id === id);
    setNewRowData(editableRow);
  };

  const deleteRow = id => {
    onDelete(id);
  };

  const toggleAddRowForm = () => {
    setShowAddRowForm(!showAddRowForm);
  };

  const handleNewRowChange = e => {
    setNewRowData({
      ...newRowData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewRowSubmit = e => {
    e.preventDefault();

    if (newRowData.id) {
      onEdit(newRowData.id, newRowData);
      setShowAddRowForm(false);
      setNewRowData({});
    } else {
      onAdd(newRowData);
      setShowAddRowForm(false);
      setNewRowData({});
    }
  };

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const handlePageClick = e => {
    setCurrentPage(Number(e.target.id));
  };

  // SORT LOGIC
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

  //Pagination Calculation
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = renderedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(renderedUsers.length / usersPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // RENDERED ELEMENTS
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
        <tr
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <FaUserEdit
            onClick={() => toggleEditRowForm(user.id)}
            style={{ cursor: 'pointer', fontSize: '20px' }}
          />
          <MdDeleteForever
            onClick={() => deleteRow(user.id)}
            style={{ cursor: 'pointer', fontSize: '20px' }}
          />
          <td>{user.firstName}</td>
        </tr>
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
      <div className="addRow">
        <button onClick={toggleAddRowForm}>Add Row</button>
        {showAddRowForm && (
          <form onSubmit={handleNewRowSubmit}>
            {columns.map(column => (
              <input
                key={column.selector}
                type="text"
                name={column.selector}
                value={newRowData[column.selector] || ''}
                onChange={handleNewRowChange}
                placeholder={`Enter ${column.label}`}
              />
            ))}
            <button>Submit</button>
          </form>
        )}
      </div>
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
