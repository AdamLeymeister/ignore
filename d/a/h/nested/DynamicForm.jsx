import React, { useEffect, useState } from 'react';

function DynamicForm({ schema }) {
  const [formState, setFormState] = useState({});

  useEffect(() => {
    // Set initial form state
    const initialState = schema.fields.reduce((acc, field) => {
      acc[field.name] = field.initialValue;
      return acc;
    }, {});
    setFormState(initialState);
  }, [schema]);

  const handleInputChange = (event, fieldName) => {
    setFormState({
      ...formState,
      [fieldName]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.fields.map((field) => {
        switch (field.type) {
          case 'text':
            return (
              <input 
                key={field.name}
                type="text" 
                name={field.name} 
                value={formState[field.name] || ''} 
                onChange={(e) => handleInputChange(e, field.name)} 
              />
            );
          case 'checkbox':
            return (
              <input 
                key={field.name}
                type="checkbox" 
                name={field.name} 
                checked={formState[field.name] || false} 
                onChange={(e) => handleInputChange(e, field.name)} 
              />
            );
          default:
            return null;
        }
      })}
      <button type="submit">Submit</button>
    </form>
  );
}

export default DynamicForm;
