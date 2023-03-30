import { useState } from 'react';

function Table({ data, config }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortedData, setSortedData] = useState([data]);

  const handleSortColumn = ({ label, sort, i, sortedData }) => {
    label = label.toLowerCase();
    if (sortColumn === null) {
      setSortColumn(label);
      setSortBy('asc');
    } else if (sortBy === 'asc') {
      setSortBy('desc');
    } else if (sortBy === 'desc') {
      setSortBy(null);
    }

    const order = sortBy === 'asc' ? 1 : -1;
    data = data.sort((a, b) => a[label] - b[label]) * order;

    console.log(data);
  };

  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

  const renderedHeaders = config.map((config, i) => (
    <td
      style={{ color: config.label === sortColumn ? 'green' : 'black' }}
      onClick={() => handleSortColumn(config, sortedData[i])}
      key={config.label}
    >
      {config.label}
    </td>
  ));

  const renderedData = data
    .filter(
      item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.age.toString().includes(searchTerm)
    )
    .map(item => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.city}</td>
        <td>{item.age}</td>
      </tr>
    ));

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search"
      />
      <table>
        <thead>
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedData}</tbody>
      </table>
    </>
  );
}

export default Table;
