import React, { useState, useEffect } from 'react';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';

const API_URL = 'http://www.raydelto.org/agenda.php';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener contactos
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setContacts(data);
    } catch (err) {
      console.error('Error al obtener contactos:', err);
      setError('Error al cargar los contactos. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar un nuevo contacto
  const handleAddContact = async (contactData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Contacto agregado:', result);
      
      // Actualizar la lista de contactos
      await fetchContacts();
      
      return true;
    } catch (err) {
      console.error('Error al agregar contacto:', err);
      throw err;
    }
  };

  // Cargar contactos al montar el componente
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Agenda Web</h1>
        <p>Gestiona tus contactos de manera fácil y rápida</p>
      </header>

      <main>
        <AddContact onAddContact={handleAddContact} />
        <ContactList 
          contacts={contacts} 
          loading={loading} 
          error={error}
          onRefresh={fetchContacts}
        />
      </main>
    </div>
  );
}

export default App;

