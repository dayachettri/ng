import Table from './components/Table';

function App() {
  const data = [
    { name: 'Daya', city: 'Manali', age: 21, id: 1 },
    { name: 'Ashu', city: 'Lucknow', age: 25, id: 2 },
    { name: 'Ravi', city: 'Delhi', age: 28, id: 3 },
    { name: 'Abhilash', city: 'Patna', age: 25, id: 4 },
  ];

  const config = [{ label: 'Name' }, { label: 'City' }, { label: 'Age' }];

  return (
    <main>
      <Table data={data} config={config} />
    </main>
  );
}

export default App;
