import React, { useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
//Importr clsx para trabajar con las clases
import clsx from "clsx";
import "./AccountPage.scss";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  fixedHeight: {
    height: 240,
  },
}));

const AccountPage = () => {
  let idUser = localStorage.getItem("userId");
  const [accounts, setAccounts] = useState([]);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const getAcccountsByUserID = () => {
    axios
      .get(
        `http://localhost:8080/api/user/${idUser}`
      )
      .then((res) => {
        const accoun = res.data.accounts;
        console.log(accoun);
        setAccounts(accoun);
      });
  };
  useEffect(() => {
    getAcccountsByUserID();
  }, []);

  return (
    <div>
      <h1>Cuentas</h1>

      <Container>
        <Grid container spacing={3}>
          {accounts.map((account, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={3}
              lg={3}
              className="card-container"
            >
              <Paper>
                <h1 className="amountStyle">{account.currentBalance}€</h1>
                <Typography fontSize="28px" className="flexi">
                  <span className="account-balance-txt">{account.iban}</span>
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default AccountPage;
