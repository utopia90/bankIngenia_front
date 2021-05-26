import React, { useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
//Importr clsx para trabajar con las clases
import clsx from "clsx";

import visaIcon from "./../../Assets/Svg/visa-icon.svg";
import masterCardIcon from "./../../Assets/Svg/mastercard-icon.svg";
import bbvaIcon from "./../../Assets/Svg/bbva-icon.svg";
import { pink } from "@material-ui/core/colors";
import "./BankcardPage.scss";
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
    getCardBankByUserID();
  }, []);

  return (
    <div>
      <h1>Cards</h1>

      <Container>
        <Grid container spacing={3} className="card-container">


          {bankCards.map((card, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={3}
              lg={3}
              
            >
              <Paper>
                <img src={bbvaIcon} className="bbva-icon" />
                <h1 className="amountStyle">
                  {card.account.currentCreditCardBalance} €
                </h1>
                <Typography fontSize="28px" className='flexi'>
           
           {card.bankCardType==='VISA'?
           <img src={visaIcon} className="bbva-icon" />:
           <img src={masterCardIcon} className="bbva-icon" />
           }
                  
                  <span className="account-balance-txt">
                    {  card.pan}
                  </span>
               </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default BankcardPage;
