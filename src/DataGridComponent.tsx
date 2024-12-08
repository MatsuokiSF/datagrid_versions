import React, { useState } from 'react';
import DataGrid, { textEditor } from 'react-data-grid'; // Importamos el componente DataGrid y el textEditor
import 'react-data-grid/lib/styles.css'; // Importamos los estilos de react-data-grid
//Version1
// Definimos las filas iniciales (simulando tareas)
const createRows = () => {
  const rows = [];
  for (let i = 1; i <= 10; i++) {
    rows.push({
      id: i,
      A: `Task ${i}`, // Columna A (Título de la tarea)
      B: 'High',      // Columna B (Prioridad)
      C: 'Bug',       // Columna C (Tipo de problema)
      D: Math.round(Math.random() * 100), // Columna D (% Completo)
      E: 'asdasd',       // Columna C (Tipo de problema)
    });
  }
  return rows;
};

// Definición de las columnas de la tabla con las letras como encabezados
const columns = [
  { key: 'id', name: ' ', width: 80 },  // Columna 1, como ID
  { 
    key: 'A', 
    name: 'A', // Título de la tarea (editable)
    renderEditCell: textEditor, // Usamos el editor de texto para hacer la celda editable
  },
  { 
    key: 'B', 
    name: 'B', // Prioridad (editable)
    renderEditCell: textEditor,
  },
  { 
    key: 'C', 
    name: 'C', // Tipo de problema (editable)
    renderEditCell: textEditor,
  },
  { 
    key: 'D', 
    name: 'D', // % Completo (editable)
    renderEditCell: textEditor,
  },
  { 
    key: 'E', 
    name: 'E', // Tipo de problema (editable)
    renderEditCell: textEditor,
  },
];

const DataGridComponent: React.FC = () => {
  // Estado para almacenar las filas
  const [rows, setRows] = useState(createRows());

  // Función que maneja los cambios en las filas (cuando se edita una celda)
  const handleRowsChange = (updatedRows: any[]) => {
    setRows(updatedRows); // Actualiza el estado con las filas modificadas
  };

  // Función para exportar los datos como CSV
  const exportToCSV = () => {
    const csvRows = rows.map(row => columns.map(col => row[col.key] || '').join(';')); // Filas separadas por punto y coma
    const csvContent = csvRows.join('\n'); // Solo las filas
  
    // Crea un archivo Blob con los datos CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    // Crea un enlace para descargar el archivo
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data-grid-export.csv';
    link.click();
  
    // Limpia el objeto URL creado
    URL.revokeObjectURL(url);
  };
  

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Mi Tabla Editable</h2>
      <div style={{ marginBottom: '10px', textAlign: 'right' }}>
        <button onClick={exportToCSV} style={{ padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Exportar a CSV
        </button>
      </div>
      <DataGrid
        columns={columns} // Definición de las columnas
        rows={rows} // Filas que se mostrarán en la tabla
        onRowsChange={handleRowsChange} // Maneja los cambios de las filas cuando se editan
        minHeight={300} // Altura mínima para la tabla
      />
    </div>
  );
};

export default DataGridComponent;
