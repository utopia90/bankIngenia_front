import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

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
  Box,
} from "@material-ui/core";

const LoanForm = (props) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    classes,
  } = props;

  const [accounts, setAccounts] = useState([]);
  const [accountReceive, setAccountReceive] = useState([]);
  const [accountPay, setAccountPay] = useState([]);
  const [duration, setDuration] = useState([]);

  const monthsData = [
    {
      value: 3,
      label: "3 meses",
    },
    {
      value: 6,
      label: "6 meses",
    },
    {
      value: 12,
      label: "12 meses",
    },
    {
      value: 24,
      label: "24 meses",
    },
  ];

  const getAcccountsByUserID = () => {
    let idUser = localStorage.getItem("userId");

    axios
      .get(`https://projectbankingenia.herokuapp.com/api/user/${idUser}`)
      .then((res) => {
        const accoun = res.data.accounts;
        setAccounts(accoun);
      });
  };
  useEffect(() => {
    getAcccountsByUserID();
  }, []);

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        required
        fullWidth
        autoFocus
        id="quantity"
        type="number"
        label="cantidad"
        name="quantity"
        margin="normal"
        autoComplete="current-password"
        variant="outlined"
        placeholder="Indique la cantidad del préstamo"
        value={values.quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.quantity && touched.quantity && "error"}
      ></TextField>
      {errors.quantity && touched.quantity && (
        <div className="error">{errors.quantity}</div>
      )}

      <TextField
        id="duration"
        select
        value={duration}
        onChange={handleChange}
        SelectProps={{
          native: true,
        }}
        helperText="Por favor, seleccione la duración que desea que tenga el préstamo"
      >
        <option value="">{values.duration != 0 ? values.duration : null}</option>

        {monthsData.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>

      <TextField
        id="accountReceiveLoan"
        select
        label=""
        onChange={handleChange}
        value={accountReceive}
        SelectProps={{
          native: true,
        }}
        helperText="Por favor, seleccione la cuenta donde desea recibir el préstamo"
      >
        <option value="">{values.accountReceiveLoan}</option>

        {accounts.map((option) => (
          <option key={option.id} value={option.iban}>
            {option.iban}
          </option>
        ))}
      </TextField>
      <TextField
        id="accountPayment"
        select
        label=""
        onChange={handleChange}
        value={accountPay}
        SelectProps={{
          native: true,
        }}
        helperText="Por favor, seleccione la cuenta desde la cual quiere pagar el préstamo"
      >
        <option value="">{values.accountPayment}</option>
        {accounts.map((option) => (
          <option key={option.id} value={option.iban}>
            {option.iban}
          </option>
        ))}
      </TextField>

      <h5>Tipo de interés: FIJO</h5>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        className={classes.submit}
      >
        Ver mis cuotas
      </Button>
      <Grid container></Grid>
    </form>
  );
};

export default LoanForm;
