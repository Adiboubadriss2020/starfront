import React from 'react';
import { Table, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SelectedResultsTable = ({ selectedRows }) => {
  // Function to handle PDF generation
  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Add "STAR" as the header
    doc.setFontSize(30);
    doc.setFont('helvetica', 'bold');
    doc.text('STAR', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
  
    // Add the "Facture/Receipt" title
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Facture/Receipt', doc.internal.pageSize.getWidth() / 2, 50, { align: 'center' });
  
    // Add the date and company information
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 60);
    doc.text('Nom de l\'entreprise', doc.internal.pageSize.getWidth() - 70, 60);
  
    // Add a line separator
    doc.line(10, 65, doc.internal.pageSize.getWidth() - 10, 65);
  
    // Adjust the table headers with wider "Date Dernière Utilisation" and "Emplacement" columns
    const headers = [
      [
        { content: 'Couleur', styles: { halign: 'center', cellWidth: 25, fillColor: [41, 128, 185], textColor: [255, 255, 255], fontStyle: 'bold' }},
        { content: 'Type', styles: { halign: 'center', cellWidth: 40, fillColor: [41, 128, 185], textColor: [255, 255, 255], fontStyle: 'bold' }},
        { content: 'Grosseur', styles: { halign: 'center', cellWidth: 20, fillColor: [41, 128, 185], textColor: [255, 255, 255], fontStyle: 'bold' }},
        { content: 'Prix Unitaire', styles: { halign: 'center', cellWidth: 25, fillColor: [41, 128, 185], textColor: [255, 255, 255], fontStyle: 'bold' }},
        { content: 'Quantité', styles: { halign: 'center', cellWidth: 25, fillColor: [41, 128, 185], textColor: [255, 255, 255], fontStyle: 'bold' }},
        { content: 'Date Dernière Utilisation', styles: { halign: 'center', cellWidth: 50, fillColor: [41, 128, 185], textColor: [255, 255, 255], fontStyle: 'bold' }},
        { content: 'Emplacement', styles: { halign: 'center', cellWidth: 35, fillColor: [41, 128, 185], textColor: [255, 255, 255], fontStyle: 'bold' }}, // Wider column for "Emplacement"
      ],
    ];
  
    // Map the selected rows data to an array format that jsPDF can read
    const data = selectedRows.map(row => [
      { content: row.couleur, styles: { halign: 'center', cellWidth: 25 }},
      { content: row.type, styles: { halign: 'center', cellWidth: 40 }},
      { content: row.grosseur, styles: { halign: 'center', cellWidth: 20 }},
      { content: row.prixUnitaire, styles: { halign: 'center', cellWidth: 25 }},
      { content: row.quantite, styles: { halign: 'center', cellWidth: 25 }},
      { content: row.dateDerniereUtilisation ? new Date(row.dateDerniereUtilisation).toLocaleDateString() : 'N/A', styles: { halign: 'center', cellWidth: 50 }},
      { content: row.emplacement, styles: { halign: 'center', cellWidth: 35 }},
    ]);
  
    // Add table to the PDF with reduced font size and adjusted column widths
    doc.autoTable({
      head: headers,
      body: data,
      startY: 70,
      theme: 'striped',
      styles: {
        font: 'helvetica',
        fontSize: 10, // Reduced font size
        halign: 'center',
        cellPadding: 2, // Reduced padding to make space for text
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      tableLineWidth: 0.1,
      tableLineColor: [0, 0, 0],
    });
  
    // Footer message
    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    doc.setFontSize(10);
    doc.text('Merci pour votre commande!', 14, pageHeight - 10);
  
    // Generate the file name and save the PDF
    const fileName = `facture_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
  };
  

  return (
    <div>
      <h2>Résultats Sélectionnés</h2>
      {selectedRows.length > 0 ? (
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
              {selectedRows.map((row, index) => (
                <tr key={index}>
                  <td>{row.couleur}</td>
                  <td>{row.type}</td>
                  <td>{row.grosseur}</td>
                  <td>{row.prixUnitaire}</td>
                  <td>{row.quantite}</td>
                  <td>{row.dateDerniereUtilisation ? new Date(row.dateDerniereUtilisation).toLocaleDateString() : 'N/A'}</td>
                  <td>{row.emplacement}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* "Commander" Button */}
          <Button onClick={generatePDF} className="mt-3">
            Commander (Enregistrer en PDF)
          </Button>
        </div>
      ) : (
        <p>Aucun résultat sélectionné</p>
      )}
    </div>
  );
};

export default SelectedResultsTable;
