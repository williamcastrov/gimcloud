import React from "react";
import { Button } from "semantic-ui-react";

import "./AuthOptions.scss";

function AuthOptions(props) {
  const { setSelectedForm } = props;

  return (
    <div className="auth-options">
      <h2> Registrarse y/o loguearse en GIM Cloud</h2>
      <Button className="register" onClick={() => setSelectedForm("registro")}>
        Registrarse
      </Button>
      <Button className="login" onClick={() => setSelectedForm("login")}>
        Iniciar sesión
      </Button>
    </div>
  );
}

export default AuthOptions;