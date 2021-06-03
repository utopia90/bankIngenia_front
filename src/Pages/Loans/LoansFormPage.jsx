import React from "react";
import LoanForm from "../../Components/LoanForm/LoanForm";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

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
import * as Yup from "yup";
import { Formik } from "formik";

const LoansFormPage = () => {
  let history = useHistory();

  const calcularCuotas = (loan) => {
    history.push({
      pathname: "/dashboard/cuota",
      state: { loan: loan },
    });
  };

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
      margin: theme.spacing(3, 0, 2)
    },
    avatar: {
      backgroundColor: theme.palette.secondary.main,
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        quantity: 0,
        duration: 0,
        accountReceive: [],
        accountPay: [],
        interest: "FIJO",
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (values) {
          console.log(values);
          let loan = {
            quantity: values.quantity,
            duration: values.duration,
            accountReceive: values.accountReceiveLoan,
            accountPay: values.accountPayment,
            interest: "FIJO",
          };
          calcularCuotas(loan);
        }

        setSubmitting(false);
      }}
      //**************Uso de YUP validacion de campos */
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
              <LoanForm
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
          </Container>
        );
      }}
    </Formik>
  );
};

export default LoansFormPage;
