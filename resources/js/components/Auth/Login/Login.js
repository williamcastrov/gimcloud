import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import { validateEmail } from "../../../server/Validations";
import firebase from "../../../server/firebase";
import "firebase/auth";
//import { useDispatch } from "react-redux";
//import { BigContext } from "../../../context/BigProvider";

import "./Login.scss";

export default function LoginForm(props) {
  //const { firebase } = React.useContext(BigContext);
  //const dispatch = useDispatch();

  const { setSelectedForm } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }
    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {
      setIsLoading(true);

      firebase
      .auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then((response) => {
        toast.warning("Acceso a GIM Cloud OK.")
      })
      .catch((err) => {
        handlerErrors(err.code);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-form">
      <h1>Gestionar de manera eficiente sus activos</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electrónico"
            icon="mail outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Por favor, ingresa un correo electronico válido.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            error={formError.password}
            icon={showPassword ? (
                <Icon name="eye slash outline" link onClick={handlerShowPassword} />
              ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )
            }
          />
          {formError.password && (
            <span className="error-text">
              Por favor, ingresa una contraseña superior a 5 caracteres.
            </span>
          )}
        </Form.Field>
        <Button type="submit" isLoading={isLoading} >Iniciar Sesión</Button>
      </Form>

      <div className="login-form__options">
        <p onClick={() => setSelectedForm(null)}>Regresar</p>
        <p>
          ¿No tienes cuenta?{" "}
          <span onClick={() => setSelectedForm("register")}>Regístrate</span>
        </p>
      </div>
    </div>
  );
}

function handlerErrors(code) {
  switch (code) {
    case "auth/wrong-password":
      toast.warning("El usuario o la contraseña son incorrecto.");
      break;
    case "auth/too-many-requests":
      toast.warning(
        "Has enviado demasiadas solicitudes de reenvio de email de confirmacion en muy poco tiempo."
      );
      break;
    case "auth/user-not-found":
      toast.warning("El usuario o la contraseña son incorrecto.");
      break;
    default:
      break;
  }
}

function defaultValueForm() {
  return {
    email: "",
    password: "",
  };
}
