import React, { useState } from 'react';

function ContactList({ contacts, loading, error, onRefresh }) {
  const [isListExpanded, setIsListExpanded] = useState(true);

  const toggleList = () => {
    setIsListExpanded(!isListExpanded);
  };

  const getToggleButtonText = () => {
    return isListExpanded ? '📄 Contraer Lista' : '📋 Expandir Lista';
  };

  return (
    <section className="contacts-section">
      <div className="section-header">
        <h2>Lista de Contactos</h2>
        <div className="btn-group">
          <button 
            onClick={toggleList} 
            className={`btn-toggle ${!isListExpanded ? 'collapsed' : ''}`}
          >
            {getToggleButtonText()}
          </button>
          <button onClick={onRefresh} className="btn-secondary">
            🔄 Actualizar
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando contactos...</p>
        </div>
      )}

      {error && !loading && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && contacts.length === 0 && (
        <div className="empty-state">
          <p>📝 No hay contactos en la agenda</p>
          <p>Agrega tu primer contacto usando el formulario de arriba</p>
        </div>
      )}

      {!loading && !error && contacts.length > 0 && (
        <div 
          className="contacts-list"
          style={{
            maxHeight: isListExpanded ? 'none' : '200px',
            overflow: isListExpanded ? 'visible' : 'hidden',
            transition: 'max-height 0.3s ease, overflow 0.3s ease'
          }}
        >
          {contacts.map((contact, index) => (
            <div key={`${contact.nombre}-${contact.apellido}-${contact.telefono}-${index}`} className="contact-card">
              <div className="contact-info">
                <h3>{contact.nombre} {contact.apellido}</h3>
                <p className="phone">📞 {contact.telefono}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ContactList;

