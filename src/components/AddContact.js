import React, { useState } from 'react';

function AddContact({ onAddContact }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onAddContact(formData);
      // Limpiar el formulario si se agregó exitosamente
      setFormData({
        nombre: '',
        apellido: '',
        telefono: ''
      });
      alert('✓ Contacto agregado exitosamente');
    } catch (err) {
      setSubmitError('Error al agregar el contacto. Inténtalo de nuevo.');
      alert('✗ Error al agregar el contacto. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="add-contact-section">
      <h2>Agregar Nuevo Contacto</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        {submitError && (
          <div className="error" style={{ padding: '10px', marginBottom: '10px' }}>
            {submitError}
          </div>
        )}
        <button 
          type="submit" 
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Agregando...' : 'Agregar Contacto'}
        </button>
      </form>
    </section>
  );
}

export default AddContact;

