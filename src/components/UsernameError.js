import React from "react";
import { useTranslation } from "react-i18next";
import { ChatControls_UsernameErrorMessage } from "../utils/locales/translationKeys";

const UsernameErrorMsg = () => {
  const { t } = useTranslation();

  return (
    <p className="error-msg">{t(ChatControls_UsernameErrorMessage)}</p>
  );
}

export default UsernameErrorMsg;
