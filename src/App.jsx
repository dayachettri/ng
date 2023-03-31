import { useEffect, useState } from 'react';
import Table from './components/table/Table';

function App() {
  const [users, setUsers] = useState([]);

  // fetching and pulling out required data
  useEffect(() => {
    fetch('https://dummyjson.com/users')
      .then(res => res.json())
      .then(data => {
        const filtered = data.users.map(user => {
          return {
            firstName: user.firstName,
            id: user.id,
            gender: user.gender,
            age: user.age,
            university: user.university,
          };
        });
        setUsers(filtered);
      });
  }, []);

  const handleAddRow = obj => {
    setUsers([...users, obj]);
  };

  const columns = [
    { label: 'Name', selector: 'firstName' },
    { label: 'Gender', selector: 'gender' },
    { label: 'Age', selector: 'age' },
    { label: 'University', selector: 'university' },
  ];

  return (
    <main>
      <h1>Reactable</h1>
      <Table data={users} columns={columns} onAdd={handleAddRow} />
    </main>
  );
}

export default App;
