import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import './ResultsTable.css'; // Import custom CSS for additional styling

const ResultsTable = ({ results }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowClick = (index) => {
    const isSelected = selectedRows.includes(index);
    const newSelection = isSelected
      ? selectedRows.filter(rowIndex => rowIndex !== index)
      : [...selectedRows, index];

    setSelectedRows(newSelection);
  };

  const handleCommanderClick = () => {
    alert(`Lignes sélectionnées : ${selectedRows.join(', ')}`);
  };

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Élément 1</th>
            <th>Élément 2</th>
            <th>Élément 3</th>
            <th>Élément 4</th>
            <th>Élément 5</th>
            <th>Élément 6</th>
            <th>Élément 7</th>
            <th>Élément 8</th>
            <th>Élément 9</th>
            <th>Élément 10</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row, index) => (
            <tr 
              key={index} 
              onClick={() => handleRowClick(index)}
              className={selectedRows.includes(index) ? 'selected-row' : ''}
            >
              <td>{row.element1}</td>
              <td>{row.element2}</td>
              <td>{row.element3}</td>
              <td>{row.element4}</td>
              <td>{row.element5}</td>
              <td>{row.element6}</td>
              <td>{row.element7}</td>
              <td>{row.element8}</td>
              <td>{row.element9}</td>
              <td>{row.element10}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button 
        variant="primary" 
        onClick={handleCommanderClick}
        disabled={selectedRows.length === 0}
        className="mt-3"
      >
        Commander
      </Button>
      {selectedRows.length > 0 && (
        <div className="mt-3">
          <h5>Détails des lignes sélectionnées :</h5>
          {selectedRows.map(rowIndex => (
            <div key={rowIndex} className="mb-2">
              <strong>Ligne {rowIndex + 1} :</strong> {Object.values(results[rowIndex]).join(', ')}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
