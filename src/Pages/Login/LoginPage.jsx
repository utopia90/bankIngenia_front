import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Typography,
  Grid,
  Link,
  Box,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./Login.scss";
import LoginFom from "../../Components/LoginForm/LoginFom";
import CopyRight from "../../Components/CopyRight/CopyRight";
import * as Yup from "yup";
import { Formik } from "formik";
import IngeniaIcon from "./../../Assets/Svg//ingenia-logo.svg";
import BankLogo from "./../../Assets/Svg/bank-logo.svg";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },
}));

const LoginPage = () => {
  let history = useHistory();
  const classes = useStyles();

  const Login = (user) => {
    axios
      .post(`http://localhost:8080/auth/login`, user)
      .then((res) => {
        const token = res.data.jwt;
        sessionStorage.setItem("logged", token);
        console.log(token);
        traerUsuarioporNombreUsu(user.email);
        console.log(user);
      });
  };
  const traerUsuarioporNombreUsu = (nomUsu) => {
    console.log(nomUsu);
    axios
      .get("http://localhost:8080/api/user-mail/" + nomUsu)
      .then((res) => {
        const usu = res.data;
        localStorage.setItem("userName", usu.name + " " + usu.surname);
        localStorage.setItem("userId", usu.id);
        window.location.replace("/");
        history.push("/");
      });
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (values) {
          console.log(values);
          let user = {
            email: values.email,
            password: values.password,
          };
          Login(user);
        }

        setSubmitting(false);
      }}
      //**************Uso de YUP validacion de campos */
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("El email no es valido")
          .required("El email es obligatorio"),
        password: Yup.string().required("Las contraseña es obligatoria"),
        //.matches(/(?=.*[0-9])/,'La contraseña debe tener al menos un numero')
      })}
    >
      {/**Obtenemos de formik y se lo pasamos a nuestro formulario */}

      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        {
          /*return del formulario que vamos a implementar*/
        }

        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <div className="logoingenia">
                <img src={IngeniaIcon} />
                <img src={BankLogo} />
              </div>

              <Typography component="h1">Acceso</Typography>
              <LoginFom
                values={values}
                touched={touched}
                errors={errors}
                isSubmitting={isSubmitting}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleSubmit={handleSubmit}
                classes={classes}
              />
            </div>
            <Box my={8}>
              <CopyRight />
            </Box>
          </Container>
        );
      }}
    </Formik>
  );
};
export default LoginPage;
