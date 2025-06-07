import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [unit, setUnit] = useState('%');
  const [value, setValue] = useState('1.0');
  const [previousValidValue, setPreviousValidValue] = useState('1.0');

  const sanitizeInput = (val) => {
    let sanitized = val.replace(',', '.');

    if (/^[^0-9]/.test(sanitized) && sanitized[0] !== '.') {
      return '0';
    }

    let validPart = '';
    for (let i = 0; i < sanitized.length; i++) {
      if (/[0-9.]/.test(sanitized[i])) {
        validPart += sanitized[i];
      } else {
        break;
      }
    }

    if (validPart === '' || validPart === '.') return '0';

    const parts = validPart.split('.');
    if (parts.length > 2) {
      validPart = parts[0] + '.' + parts[1];
    }

    const parsed = parseFloat(validPart);
    if (isNaN(parsed)) return '0';
    if (parsed < 0) return '0';
    if (unit === '%' && parsed > 100) return previousValidValue;

    return parsed.toString();
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const sanitizedValue = sanitizeInput(inputValue);
    setValue(inputValue);
    setPreviousValidValue(sanitizedValue);
  };

  const handleBlur = () => {
    const sanitizedValue = sanitizeInput(value);
    setValue(sanitizedValue);
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    const parsedValue = parseFloat(value);
    if (newUnit === '%' && parsedValue > 100) {
      setValue('100');
      setPreviousValidValue('100');
    }
  };

  const increment = () => {
    const parsedValue = parseFloat(value);
    const newValue = parsedValue + 1;
    const limitedValue = unit === '%' ? Math.min(newValue, 100) : newValue;
    const formattedValue = Number.isInteger(limitedValue) ? limitedValue.toString() : limitedValue.toFixed(1);
    setValue(formattedValue);
    setPreviousValidValue(formattedValue);
  };

  const decrement = () => {
    const parsedValue = parseFloat(value);
    const newValue = parsedValue - 1;
    const limitedValue = Math.max(newValue, 0);
    const formattedValue = Number.isInteger(limitedValue) ? limitedValue.toString() : limitedValue.toFixed(1);
    setValue(formattedValue);
    setPreviousValidValue(formattedValue);
  };

  return (
    <div className="unit-input-wrapper">
      <div className="row">
        <div>Unit</div>
        <div className="unit-switch">
          <button className={unit === '%' ? 'active' : ''} onClick={() => handleUnitChange('%')}>%</button>
          <button className={unit === 'px' ? 'active' : ''} onClick={() => handleUnitChange('px')}>px</button>
        </div>
      </div>
      <div className="row">
        <div>Value</div>
        <div className="stepper">
          <button className="button-decrement" onClick={decrement} disabled={parseFloat(value) <= 0}>-</button>
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <button className="button-increment" onClick={increment} disabled={unit === '%' && parseFloat(value) >= 100}>+</button>
        </div>
      </div>
    </div>
  );
};

export default App;