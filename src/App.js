import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [unit, setUnit] = useState('%');
  const [value, setValue] = useState(1.0);
  const [previousValidValue, setPreviousValidValue] = useState(1.0);

  const handleUnitChange = (newUnit: '%' | 'px') => {
    if (newUnit === '%' && value > 100) {
      setValue(100);
      setPreviousValidValue(100);
    }
    setUnit(newUnit);
  };

  const sanitizeInput = (val) => {
    let sanitized = val.replace(',', '.'); // chuyển , => .
    sanitized = sanitized.replace(/[^0-9.]/g, ''); // loại bỏ ký tự không hợp lệ

    const parsed = parseFloat(sanitized);

    if (isNaN(parsed)) return 0;
    if (parsed < 0) return 0;
    if (unit === '%' && parsed > 100) return previousValidValue;

    return parsed;
  };

  const handleInputChange = (e) => {
    const newValue = sanitizeInput(e.target.value);
    setValue(newValue);
    setPreviousValidValue(newValue);
  };

  const handleBlur = () => {
    if (value < 0) setValue(0);
    if (unit === '%' && value > 100) setValue(previousValidValue);
  };

  const increment = () => {
    if (unit === '%' && value >= 100) return;
    const newValue = value + 1;
    setValue(unit === '%' ? Math.min(newValue, 100) : newValue);
    setPreviousValidValue(newValue);
  };

  const decrement = () => {
    if (value <= 0) return;
    const newValue = value - 1;
    setValue(Math.max(newValue, 0));
    setPreviousValidValue(newValue);
  };

  return (
    <div className="unit-input-wrapper">
      <div className='row'>
        <div>Unit</div>
        <div className="unit-switch">
          <button className={unit === '%' ? 'active' : ''} onClick={() => handleUnitChange('%')}>%</button>
          <button className={unit === 'px' ? 'active' : ''} onClick={() => handleUnitChange('px')}>px</button>
        </div>
      </div>
      <div className='row'>
        <div>Value</div>
        <div className="stepper">
          <button className='button-decrement' onClick={decrement} disabled={value <= 0}>-</button>
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          <button className='button-increment' onClick={increment} disabled={unit === '%' && value >= 100}>+</button>
        </div>
      </div>
    </div>
  );
};

export default App;
