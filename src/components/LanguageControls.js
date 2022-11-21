import React from 'react';
import "../utils/locales/config"
import i18n from '../utils/locales/config';

const LanguageControls = () => {
  const handleChangeLanguage = (ev) => {
    i18n.changeLanguage(ev.target.innerHTML);
  };
 
  return (
    <div>
      <button onClick={handleChangeLanguage}>bg</button>
      <button onClick={handleChangeLanguage}>en</button>
    </div>
  );
}

export default LanguageControls;
