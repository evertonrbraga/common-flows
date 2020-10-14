import React, { useRef, createRef, useEffect, useState } from 'react';

import InputField from './components/InputField';
import './App.css';

function App() {
  const inputRefs = useRef([createRef(), createRef()]);
  const [data, setData] = useState({});

  const handleChange = (name, value) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    let isValid = true;

    for (let i = 0; i < inputRefs.current.length; i++) {
      const valid = inputRefs.current[i].current.validate();
      console.log(valid);
      if (!valid) {
        isValid = false;
      }
    }

    if (!isValid) {
      return;
    }

    console.log('loggedIn');
  };

  useEffect(() => {
    console.log(inputRefs);
  });

  return (
    <div className='App'>
      <form className='form' onSubmit={submitForm}>
        <h1>React Register Form</h1>
        <InputField
          ref={inputRefs.current[0]}
          name='username'
          label='Username'
          onChange={handleChange}
          validation={'required|min:6|max:12'}
        />
        <InputField
          ref={inputRefs.current[1]}
          name='password'
          label='Password'
          onChange={handleChange}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default App;
