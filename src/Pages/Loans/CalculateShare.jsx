import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

import { Container, Grid, Paper, Typography } from "@material-ui/core";

import "./CalculateShare.scss";
import { InsertInvitationTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  btnsContainer: {
    display: "flex",
    justifyContent: "space-between",
    textAlign: "center",
    paddingTop: 4,
    fontSize: 12,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
    width: "max-content",
  },
}));

const CalculateShare = () => {
  const location = useLocation();
  const [share, setShare] = useState([]);
  const [accountIncome, setAccountIncome] = useState([]);
  const [accountPayment, setAccountPayment] = useState([]);
  const classes = useStyles();

  const userLoan = location.state.loan;

  let history = useHistory();

  const CalculateShares = () => {
    let quantity = userLoan.quantity;
    let duration = Number(userLoan.duration);

    let share = (quantity / duration).toFixed(2);

    setShare(share);
  };

  const cancelLoan = () => {
    window.alert("hemos cancelado su préstamo");
    history.push("/");
  };

  const submitLoan = () => {
    const loan = {
      interestType: userLoan.interest,
      durationMonths: Number(userLoan.duration),
      cantidad: userLoan.quantity,
      accountIncome: accountIncome,
      accountPayment: accountPayment,
    };

    axios.post("https://projectbankingenia.herokuapp.com/api/prestam", loan);

    startLoanPayments();
    window.alert("El préstamo se ha procesado correctamente");
  };

  const startLoanPayments = () => {
    setInterval(() => {
      const movement = {
        operationType: "REST",
        paymentType: "ACCOUNT",
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
        account: accountPayment,
        quantity: Number(share),
        categoryType: "PAID",
      };
      console.log("movement before axios", movement);

      axios.post(
        "https://projectbankingenia.herokuapp.com/api/movement",
        movement
      );
    }, 1000);
  };

  const getIncomeAccount = () => {
    const incomeIban = userLoan.accountReceive;
    axios
      .get(
        `https://projectbankingenia.herokuapp.com/api/accountbyiban/${incomeIban}`
      )
      .then((res) => {
        const incomeAccount = res.data;
        setAccountIncome(incomeAccount);
      });
  };

  const getPaymentAccount = () => {
    const paymentIban = userLoan.accountPay;
    axios
      .get(
        `https://projectbankingenia.herokuapp.com/api/accountbyiban/${paymentIban}`
      )
      .then((res) => {
        const paymentAccount = res.data;
        setAccountPayment(paymentAccount);
      });
  };

  useEffect(() => {
    CalculateShares();
  }, [location]);

  useEffect(() => {
    getIncomeAccount();
    getPaymentAccount();
  }, []);

  return (
    <div>
      <h1>CALCULE SU CUOTA</h1>
      <div className="top-container">
        <Container className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8} className="card-container">
              <Paper>
                <h4>Datos de su préstamo:</h4>

                <Typography fontSize="28px" className="flexi">
                  <h5>Cantidad del prestamo:</h5>
                  <span className="account-balance-txt">
                    {userLoan.quantity} €
                  </span>
                </Typography>
                <Typography fontSize="28px" className="flexi">
                  <h5>Duración del prestamo:</h5>
                  <span className="account-balance-txt">
                    {userLoan.duration} meses
                  </span>
                </Typography>
                <Typography fontSize="28px" className="flexi">
                  <h5>Cuenta de ingreso del préstamo:</h5>
                  <span className="account-balance-txt">
                    {userLoan.accountReceive}
                  </span>
                </Typography>
                <Typography fontSize="28px" className="flexi">
                  <h5>Cuenta de pago del préstamo:</h5>
                  <span className="account-balance-txt">
                    {userLoan.accountPay}
                  </span>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4} className="card-container">
              <Paper className={classes.paper}>
                <h2>
                  Su cuota es de <span className="pink-color">{share} </span>€
                  al mes, y la duración de su préstamo es de
                  <span className="pink-color"> {userLoan.duration}</span> meses
                </h2>
                <Container className={classes.btnsContainer}>
                  <button className="add-loan-btn" onClick={cancelLoan}>
                    Cancelo el préstamo
                  </button>
                  <button className="add-loan-btn" onClick={submitLoan}>
                    Acepto el préstamo
                  </button>
                </Container>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default CalculateShare;
