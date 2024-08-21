import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dropdowns.css'; // Import custom CSS for additional styling
import ResultsTable from './ResultsTable'; // Import the new ResultsTable component

const Dropdowns = () => {
  const [fourniture, setFourniture] = useState('');
  const [selectedFil, setSelectedFil] = useState('');
  const [subFil, setSubFil] = useState('');
  const [filRef, setFilRef] = useState('');
  const [selectedPiece, setSelectedPiece] = useState('');
  const [results, setResults] = useState([]);

  const handleFournitureChange = (e) => {
    setFourniture(e.target.value);
    // Clear other fields when Fourniture changes
    setSelectedFil('');
    setSubFil('');
    setFilRef('');
    setSelectedPiece('');
    setResults([]);
  };

  const handleFilChange = (e) => {
    setSelectedFil(e.target.value);
    setSubFil('');
    setFilRef('');
  };

  const handleSubFilChange = (e) => {
    setSubFil(e.target.value);
  };

  const handleFilRefChange = (e) => {
    setFilRef(e.target.value);
  };

  const handlePieceChange = (e) => {
    setSelectedPiece(e.target.value);
  };

  const handleSearch = () => {
    // Mock results with more columns for demonstration
    const mockResults = [
      { element1: 'Data 1', element2: 'Data 2', element3: 'Data 3', element4: 'Data 4', element5: 'Data 5', element6: 'Data 6', element7: 'Data 7', element8: 'Data 8', element9: 'Data 9', element10: 'Data 10' },
      { element1: 'Data 11', element2: 'Data 12', element3: 'Data 13', element4: 'Data 14', element5: 'Data 15', element6: 'Data 16', element7: 'Data 17', element8: 'Data 18', element9: 'Data 19', element10: 'Data 20' },
      { element1: 'Data 21', element2: 'Data 22', element3: 'Data 23', element4: 'Data 24', element5: 'Data 25', element6: 'Data 26', element7: 'Data 27', element8: 'Data 28', element9: 'Data 29', element10: 'Data 30' },
    ];

    setResults(mockResults);
  };

  const isSearchDisabled = !(fourniture === 'fil' && filRef) && 
                           !(fourniture === 'fil' && selectedFil && subFil) && 
                           !(fourniture === 'piece' && selectedPiece) && 
                           !filRef;

  return (
    <div className="container mt-5">
      <Card className="shadow-lg border-0 rounded-lg overflow-hidden bg-primary text-light">
        <Card.Body className="p-4">
          <h4 className="text-center mb-4 font-weight-bold">Critères de recherche</h4>
          <Row className="align-items-end justify-content-center">
            <Col lg={3} md={4} sm={12} className="mb-3">
              <Form.Group controlId="fournitureDropdown">
                <Form.Label className="font-weight-bold text-light">Fourniture</Form.Label>
                <Form.Select value={fourniture} onChange={handleFournitureChange} className="form-control-lg rounded-pill bg-light text-dark border-light">
                  <option value="">Sélectionner Fourniture</option>
                  <option value="fil">Fil à coudre</option>
                  <option value="piece">Pièces mécaniques</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {fourniture === 'fil' && (
              <>
                <Col lg={3} md={4} sm={12} className="mb-3">
                  <Form.Group controlId="filRefInput">
                    <Form.Label className="font-weight-bold text-light">Référence du fil</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Entrer la référence du fil" 
                      value={filRef} 
                      onChange={handleFilRefChange} 
                      className="form-control-lg rounded-pill bg-light text-dark border-light" 
                    />
                  </Form.Group>
                </Col>

                <Col lg={3} md={4} sm={12} className="mb-3">
                  <Form.Group controlId="filDropdown">
                    <Form.Label className="font-weight-bold text-light">Fil à coudre</Form.Label>
                    <Form.Select value={selectedFil} onChange={handleFilChange} className="form-control-lg rounded-pill bg-light text-dark border-light">
                      <option value="">Choisir le Fil</option>
                      <option value="fil1">Fil à mousse</option>
                      <option value="fil2">Fil polyester</option>
                      <option value="fil3">Fil Coton</option>
                      <option value="fil4">Fil Scala</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                {selectedFil && (
                  <Col lg={3} md={4} sm={12} className="mb-3">
                    <Form.Group controlId="subFilDropdown">
                      <Form.Label className="font-weight-bold text-light">Sous-catégorie</Form.Label>
                      <Form.Select value={subFil} onChange={handleSubFilChange} className="form-control-lg rounded-pill bg-light text-dark border-light">
                        <option value="">Choisir Sous-catégorie</option>
                        <option value="subFil1">40</option>
                        <option value="subFil2">80</option>
                        <option value="subFil3">120</option>
                        <option value="subFil4">150</option>
                        <option value="subFil5">180</option>
                        <option value="subFil6">420</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                )}
              </>
            )}

            {fourniture === 'piece' && (
              <Col lg={3} md={4} sm={12} className="mb-3">
                <Form.Group controlId="pieceDropdown">
                  <Form.Label className="font-weight-bold text-light">Pièces mécaniques</Form.Label>
                  <Form.Select value={selectedPiece} onChange={handlePieceChange} className="form-control-lg rounded-pill bg-light text-dark border-light">
                    <option value="">Choisir</option>
                    <option value="piece1">Fournitures Droguerie</option>
                    <option value="piece2">Fournitures  Consomables</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            )}

            <Col lg={3} md={12} sm={12} className="text-center mb-3">
              <Button 
                variant="secondary" 
                size="lg" 
                disabled={isSearchDisabled} 
                onClick={handleSearch}
                className="rounded-pill w-100 shadow-lg"
              >
                <i className="bi bi-search"></i> Rechercher
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {results.length > 0 && <ResultsTable results={results} />}
    </div>
  );
};

export default Dropdowns;
