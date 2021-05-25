
import React, { useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
//Importr clsx para trabajar con las clases
import clsx from "clsx";
import './BankcardPage.scss';

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

const BankcardPage = () => {
    const [bankCards, setCardsBank] = useState([]);
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const getCardBankByUserID = () => {
      let idUser = 1;
      axios
        .get(
          `https://projectbankingenia.herokuapp.com/api/bankcard-user-id/${idUser}`
        )
        .then((res) => {
          const cards = res.data;
          console.log(cards);
          setCardsBank(cards);
        });
    };
  useEffect(() => {
    getCardBankByUserID()
  }, []);
  
    return (
      <div>
        <h1>Cards</h1>
  
      <Container>
  
  
            <Grid container spacing={3}>  
              {bankCards.map((card, index) => (
                  <Grid  key={index}item xs = {12} md={3} lg={3}>
                      <Paper className={fixedHeightPaper}>         
                
                          <Typography>{card.account.currentCreditCardBalance} €</Typography>
  
                          <Typography>{card.pan}</Typography>
                      </Paper>
                  </Grid>
              ))}
            </Grid>  
  
      </Container>
  
  
      </div>
    );
  };

export default BankcardPage;
