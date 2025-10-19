import React from 'react';

const FormField = ({ label, id, type = 'text', placeholder, autoComplete }) => {
  return (
    <div className="field">
      {label && <label className="label" htmlFor={id}>{label}</label>}
      <input
        id={id}
        className="input"
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete || 'off'}
      />
    </div>
  );
};

export default FormField;