import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import SelectedResultsTable from './SelectedResultsTable'; // Import the new component

const ResultsTable = ({ results }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [showSelected, setShowSelected] = useState(false);

  const handleRowClick = (result) => {
    const isSelected = selectedRows.includes(result);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((row) => row !== result)); // Deselect row
    } else {
      setSelectedRows([...selectedRows, result]); // Add to selected rows
    }
  };

  const handleShowSelectedRows = () => {
    setShowSelected(true);
  };

  if (!Array.isArray(results)) {
    return <div>Les données sont indisponibles ou mal formatées.</div>;
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Couleur</th>
            <th>Type</th>
            <th>Grosseur</th>
            <th>Prix Unitaire</th>
            <th>Quantité</th>
            <th>Date Dernière Utilisation</th>
            <th>Emplacement</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(result)}
              style={{
                backgroundColor: selectedRows.includes(result) ? '#f0f0f0' : 'white', // Highlight selected rows
              }}
            >
              <td>{result.couleur}</td>
              <td>{result.type}</td>
              <td>{result.grosseur}</td>
              <td>{result.prixUnitaire}</td>
              <td>{result.quantite}</td>
              <td>{result.dateDerniereUtilisation ? new Date(result.dateDerniereUtilisation).toLocaleDateString() : 'N/A'}</td>
              <td>{result.emplacement}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* Button to show selected rows */}
      <Button onClick={handleShowSelectedRows} disabled={selectedRows.length === 0}>
        Show Selected Rows
      </Button>

      {/* Conditionally render the selected rows table */}
      {showSelected && <SelectedResultsTable selectedRows={selectedRows} />}
    </div>
  );
};

export default ResultsTable;
