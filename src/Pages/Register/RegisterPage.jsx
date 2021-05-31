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
import CopyRight from "../../Components/CopyRight/CopyRight";
import "./RegisterPage.scss";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
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

const RegisterPage = () => {
  let history = useHistory();
  const classes = useStyles();

  const Registro = (user) => {
    axios
      .post(`https://projectbankingenia.herokuapp.com/auth/registro`, user)
      .then((res) => {
        history.push("/login");
      });
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        name:"",
        surname:""
      }}
      onSubmit={(values, { setSubmitting }) => {

        if(values){
            let user={
            email:values.email,
            password:values.password,
            name:values.name,
            surname:values.surname,
        }
        Registro(user)

        }

        setSubmitting(false);
      }}
      //**************Uso de YUP validacion de campos */
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("El email no es valido")
          .required("El email es obligatorio"),
        password: Yup.string().required("Las contraseña es obligatoria"),
        name: Yup.string().required("El nombre es obligatorio"),
        surname: Yup.string().required("El apellido es obligatorio"),
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
              <Typography component="h1">Registro</Typography>
              <RegisterForm
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

export default RegisterPage;
