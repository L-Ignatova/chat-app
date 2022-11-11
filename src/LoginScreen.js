import React from 'react';

const LoginScreen = ({setIsLogged, setUsername, username}) => {
  return (
    <div className='login-screen'>
      <input 
        className='input-username' 
        placeholder='username' 
        value={username} 
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <button onClick={() => setIsLogged(true)}>Login</button>
    </div>
  );
}

export default LoginScreen;