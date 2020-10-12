import React, { useState, forwardRef, useImperativeHandle } from 'react';

const InputField = forwardRef(
  (
    {
      label,
      placeholder,
      name,
      onChange,
      type = 'text',
      value,
      autoComplete = 'off',
      validation,
    },
    ref
  ) => {
    const [data, setData] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
      setData(e.target.value);
      setError('');
      onChange(e.target.name, e.target.value);
    };

    const validate = () => {
      if (validation) {
        const rules = validation.split('|');

        for (let i = 0; i < rules.length; i++) {
          const current = rules[i];

          if (current === 'required') {
            if (!data) {
              setError('This field is required');
              return false;
            }
          }

          const pair = current.split(':');

          switch (pair[0]) {
            case 'min':
              if (data.length < pair[1]) {
                setError(
                  `This field must be at least ${pair[1]} characters long`
                );
                return false;
              }
              break;
            case 'max':
              if (data.length > pair[1]) {
                setError(
                  `This field must be no longer than ${pair[1]} characters long`
                );
                return false;
              }
              break;
            default:
              break;
          }
        }
      }
      return true;
    };

    useImperativeHandle(ref, () => {
      return {
        validate: () => validate(),
      };
    });

    return (
      <div className='input-wrapper'>
        {label && <label>{label}</label>}
        <input
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => handleChange(e)}
        />
        {error && <p className='error'>{error}</p>}
      </div>
    );
  }
);

export default InputField;
