import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

import { Container, Grid, Paper, Typography } from "@material-ui/core";

import "./CalculateShare.scss";

const CalculateShare = () => {
  const location = useLocation();
  const [share, setShare] = useState([]);
  const [accountIncome, setAccountIncome] = useState([]);
  const [accountPayment, setAccountPayment] = useState([]);

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
    if(userLoan.quantity <= accountPayment.currentGlobalBalance){
    axios.post("https://projectbankingenia.herokuapp.com/api/prestam", loan);

    window.alert("El préstamo se ha procesado correctamente");
  }else{
      window.alert("Lo siento, no tiene fondos suficientes para solicitar este préstamo")
  }
}

  const getIncomeAccount = () => {
    const incomeIban = userLoan.accountReceive;
    axios
      .get(
        `https://projectbankingenia.herokuapp.com/api/accountbyiban/${incomeIban}`
      )
      .then((res) => {
        const incomeAccount = res.data;
        console.log(incomeAccount);
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
        console.log(paymentAccount);
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

  console.log("share", share);
  return (
    <div>
      <h1>CALCULA TU CUOTA</h1>
      <div className="top-container">
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} lg={6} className="card-container">
              <Paper>
                <h4>Datos de tu préstamo:</h4>

                <Typography fontSize="28px" className="flexi">
                  <h6>Cantidad de tu prestamo:</h6>
                  <span className="account-balance-txt">
                    {userLoan.quantity} €
                  </span>
                </Typography>
                <Typography fontSize="28px" className="flexi">
                  <h6>Duración de tu prestamo:</h6>
                  <span className="account-balance-txt">
                    {userLoan.duration} meses
                  </span>
                </Typography>
                <Typography fontSize="28px" className="flexi">
                  <h6>Cuenta de ingreso del préstamo:</h6>
                  <span className="account-balance-txt">
                    {userLoan.accountReceive}
                  </span>
                </Typography>
                <Typography fontSize="28px" className="flexi">
                  <h6>Cuenta de pago del préstamo:</h6>
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
            <Grid item xs={12} md={3} lg={6} className="card-container">
              <Paper>
                <h2>
                  Tu cuota es de <span className="pink-color">{share} </span>€
                  al mes, y la duración de tu préstamo es de
                  <span className="pink-color"> {userLoan.duration}</span> meses
                </h2>
                <div className="loan-btns-container">
                  <button className="add-loan-btn" onClick={submitLoan}>
                    Acepto el préstamo
                  </button>
                  <button className="add-loan-btn" onClick={cancelLoan}>
                    Cancelo el préstamo
                  </button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default CalculateShare;
