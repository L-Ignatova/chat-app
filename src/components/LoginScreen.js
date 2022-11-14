import React from 'react';

const LoginScreen = ({setIsLogged, setUsername, username, activeLocale}) => {
  return (
    <div className='login-screen'>
      <input
        className='input-username'
        placeholder={activeLocale.username}
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <button onClick={() => setIsLogged(true)}>{activeLocale.login}</button>
    </div>
  );
}

export default LoginScreen;
