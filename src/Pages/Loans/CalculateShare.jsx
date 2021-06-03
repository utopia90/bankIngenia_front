import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';


import { Container, Grid, Paper, Typography } from "@material-ui/core";

import "./CalculateShare.scss";

const CalculateShare = () => {
  const location = useLocation();
  const [loan, setLoan] = useState([]);
  const [share, setShare] = useState([]);

  const CalculateShares = () => {
    let quantity = location.state.loan.quantity;
    let duration = Number(location.state.loan.duration);

    let share = (quantity / duration).toFixed(2);

    setShare(share);
  };

  useEffect(() => {
    setLoan(location.state.loan);
    CalculateShares();

  }, [location]);


 
 

  console.log("share", share)
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
                  <span className="account-balance-txt">{loan.quantity}</span>
                </Typography>
                <Typography fontSize="28px" className="flexi">
                  <h6>Duración de tu prestamo:</h6>
                  <span className="account-balance-txt">
                    {loan.duration} meses
                  </span>
                </Typography>
                <Typography fontSize="28px" className="flexi">
                  <h6>Cuenta de ingreso del préstamo:</h6>
                  <span className="account-balance-txt">
                    {loan.accountReceive}
                  </span>
                </Typography>
                <Typography fontSize="28px" className="flexi">
                  <h6>Cuenta de pago del préstamo:</h6>
                  <span className="account-balance-txt">{loan.accountPay}</span>
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
                  <span className="pink-color"> {loan.duration}</span> meses
                </h2>
                <div className="loan-btns-container">   <button className="add-loan-btn">Acepto el préstamo</button>
                <button className="add-loan-btn">Cancelo el préstamo</button></div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default CalculateShare;
