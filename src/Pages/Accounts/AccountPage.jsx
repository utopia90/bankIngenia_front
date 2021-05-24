import React, { useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper } from "@material-ui/core";
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
}));

const AccountPage = () => {


  const [accounts, setAccounts] = useState([]);
  const classes = useStyles();
  const getAcccountsByUserID = () => {
    let idUser = 1;
    axios
      .get(
        `https://projectbankingenia.herokuapp.com/api/account-user-id/${idUser}`
      )
      .then((res) => {
        const movens = res.data;
        console.log(movens);
        setAccounts(movens);
      });
  };
useEffect(() => {
    getAcccountsByUserID()
}, []);

  return (
    <div>
      <h1>bancard</h1>
      <Container maxWidth="lg" className={classes.container}>

      {accounts.map((account, index) => (
        <Grid key={index} container spacing={3}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
        </Grid>

      ))}




      </Container>
    </div>
  );
};

export default AccountPage;
