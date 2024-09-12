import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dropdowns.css'; // Import custom CSS for additional styling
import ResultsTable from './ResultsTable'; // Import the new ResultsTable component
import axios from 'axios'; // Import axios

const Dropdowns = () => {
  const [fourniture, setFourniture] = useState('');
  const [selectedFil, setSelectedFil] = useState('');
  const [subFil, setSubFil] = useState('');
  const [filRef, setFilRef] = useState('');
  const [selectedPiece, setSelectedPiece] = useState('');
  const [subPiece, setSubPiece] = useState('');
  const [results, setResults] = useState([]);
  const [filTypes, setFilTypes] = useState([]); // New state for fil types
  const [grosseurs, setGrosseurs] = useState([]); // new state for size
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResultsMessage, setNoResultsMessage] = useState(null);

  useEffect(() => {
    // Fetch data from the back-end
    axios.get('http://localhost:8060/types')  // Replace with your back-end URL
      .then(response => {
        console.log("Réponse API FilType:", response.data); // Log des types reçues
        setFilTypes(response.data); // Set the fil types from the back-end response
      })
      .catch(error => {
        console.error('Error fetching fil types:', error);
      });
  }, []); 
  // Fetch grosseurs when selectedFil changes
  useEffect(() => {
    
      axios.get('http://localhost:8060/grosseurs')
        .then(response => {
          console.log("Réponse API :", response.data); // Log des grosseurs reçues
          setGrosseurs(response.data);
        })
        .catch(error => {
          console.error('Error fetching grosseurs:', error);
        });
  
  }, [selectedFil]);

  const handleFournitureChange = (e) => {
    setFourniture(e.target.value);
    // Clear other fields when Fourniture changes
    setSelectedFil('');
    setSubFil('');
    setFilRef('');
    setSelectedPiece('');
    setSubPiece('');
    setResults([]);
  };

  const handleFilChange = (e) => {
    setSelectedFil(e.target.value);
    console.log("Valeur sélectionnée pour le type de fil :", e.target.value);
    setSubFil('');
    setFilRef('');
  };

  const handleSubFilChange = (e) => {
    setSubFil(e.target.value);
    console.log("Valeur sélectionnée pour le size de fil :", e.target.value);
  };

  const handleFilRefChange = (e) => {
    setFilRef(e.target.value);
  };

  const handlePieceChange = (e) => {
    setSelectedPiece(e.target.value);
    setSubPiece('');
  };

  const handleSubPieceChange = (e) => {
    setSubPiece(e.target.value);
  };

 /* const handleSearch = () => {
    // Mock results with more columns for demonstration
    const mockResults = [
      { element1: 'Data 1', element2: 'Data 2', element3: 'Data 3', element4: 'Data 4', element5: 'Data 5', element6: 'Data 6', element7: 'Data 7', element8: 'Data 8', element9: 'Data 9', element10: 'Data 10' },
      { element1: 'Data 11', element2: 'Data 12', element3: 'Data 13', element4: 'Data 14', element5: 'Data 15', element6: 'Data 16', element7: 'Data 17', element8: 'Data 18', element9: 'Data 19', element10: 'Data 20' },
      { element1: 'Data 21', element2: 'Data 22', element3: 'Data 23', element4: 'Data 24', element5: 'Data 25', element6: 'Data 26', element7: 'Data 27', element8: 'Data 28', element9: 'Data 29', element10: 'Data 30' },
    ];

    setResults(mockResults);
  };*/

  const handleSearch = () => {
    console.log("Valeur de selectedFil :", selectedFil);
    console.log("Valeur de filTypes :", filTypes);

    const selectedTypeId = Number(selectedFil);
    const selectedType = filTypes.find(type => type.id === selectedTypeId)?.libelleType;

    console.log("Type sélectionné :", selectedType);
    const params = {
      numReference: filRef || undefined,
      type: selectedType || undefined,
      grosseur: subFil || undefined
    };
    console.log("Paramètres de recherche :", params);
    console.log("call back end :", params);

    setLoading(true);
    setError(null);
    setNoResultsMessage(null);

    axios.get('http://localhost:8060/colors', { params })
      .then(response => {
        console.log("retour du back end :", response);
        const data = response.data;
        if (Array.isArray(data)) {
          if (data.length === 0) {
            setNoResultsMessage("Aucun résultat trouvé");
          } else {
            setResults(data);
          }
        } else {
          setError("Les données reçues ne sont pas un tableau");
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Il y a eu une erreur lors de la récupération des couleurs!', error);
        setError('Erreur lors de la récupération des données');
        setLoading(false);
      });
  };

  const isSearchDisabled = !(fourniture === 'fil' && filRef) && 
                           !(fourniture === 'fil' && selectedFil && subFil) && 
                           !(fourniture === 'piece' && selectedPiece && subPiece) && 
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
                    <Form.Label className="font-weight-bold text-light">Type de Fil</Form.Label>
                    <Form.Select value={selectedFil} onChange={handleFilChange} className="form-control-lg rounded-pill bg-light text-dark border-light">
                      <option value="">Choisir le Fil</option>
                      {filTypes.map((fil) => (
                        <option key={fil.id} value={fil.id}>{fil.libelleType}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

               
                  <Col lg={3} md={4} sm={12} className="mb-3">
                    <Form.Group controlId="subFilDropdown">
                      <Form.Label className="font-weight-bold text-light">Grosseur</Form.Label>
                      <Form.Select value={subFil} onChange={handleSubFilChange} className="form-control-lg rounded-pill bg-light text-dark border-light">
                        <option value="">Choisir Sous-catégorie</option>
                        {grosseurs.map((grosseur) => (
                          <option key={grosseur.id} value={grosseur.id}>{grosseur.nomGrosseur}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                
              </>
            )}

            {fourniture === 'piece' && (
              <>
                <Col lg={3} md={4} sm={12} className="mb-3">
                  <Form.Group controlId="pieceDropdown">
                    <Form.Label className="font-weight-bold text-light">Pièces mécaniques</Form.Label>
                    <Form.Select value={selectedPiece} onChange={handlePieceChange} className="form-control-lg rounded-pill bg-light text-dark border-light">
                      <option value="">Choisir la Pièce</option>
                      <option value="piece1">Pièce 1</option>
                      <option value="piece2">Pièce 2</option>
                      <option value="piece3">Pièce 3</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                {selectedPiece && (
                  <Col lg={3} md={4} sm={12} className="mb-3">
                    <Form.Group controlId="subPieceDropdown">
                      <Form.Label className="font-weight-bold text-light">Sous-catégorie</Form.Label>
                      <Form.Select value={subPiece} onChange={handleSubPieceChange} className="form-control-lg rounded-pill bg-light text-dark border-light">
                        <option value="">Choisir Sous-catégorie</option>
                        <option value="subPiece1">Sous-catégorie 1</option>
                        <option value="subPiece2">Sous-catégorie 2</option>
                        <option value="subPiece3">Sous-catégorie 3</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                )}
              </>
            )}

<Col lg={3} md={4} sm={12} className="mb-3">
              <Button
                variant="secondary"
                size="lg"
                className="rounded-pill w-100"
                onClick={handleSearch}
                disabled={isSearchDisabled}
              >
                Rechercher
              </Button>
            </Col>
          </Row>

          {loading && <div>Chargement...</div>}
      {error && <div>{error}</div>}
      {noResultsMessage && <div>{noResultsMessage}</div>}
      {results.length > 0 && !loading && !error && !noResultsMessage && (
        <ResultsTable results={results} />
      )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dropdowns;
