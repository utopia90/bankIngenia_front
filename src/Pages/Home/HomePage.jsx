import React, {useState, useEffect} from 'react'

import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Grid,Paper,Container} from '@material-ui/core';
import "./HomePage.scss";

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
    }

  }));
export default function HomePage() {
    const classes = useStyles();
    const [movements, setMovements] = useState([])
    const [bankCards, setCardsBank] = useState([]);

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
    const getMovements = () => {
        let idUser=1;
        axios.get(`https://projectbankingenia.herokuapp.com/api/movement/userId/${idUser}`)
        .then(res => {
          const movens = res.data;
          console.log(movens)
          setMovements(movens)
        })
 
    }

    useEffect(() => {
      getCardBankByUserID()
      getMovements()
    }, []);
  return (
    <div className={classes.root}>

    <h1>Inicio</h1>
      <Grid container spacing={12}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}><h1>Tarjetas</h1></Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}><h1>BalanceTotal</h1></Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}><h1>Movimientos</h1>        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>

              <TableCell align="center">IBAN-NºTarjeta</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell align="center">Concepto</TableCell>
              <TableCell align="center">Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movements.map((row) => (
              <TableRow key={row.id}>
              { row.paymentType == "ACCOUNT" ?

              <TableCell align="center" >{row.account.iban}</TableCell>

              :
              <TableCell align="center" >{row.account.cards[0].pan}</TableCell>}
           

                <TableCell align="center">{row.quantity} €</TableCell>
                <TableCell align="center">{row.categoryType}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></Paper>
        </Grid>

      </Grid>
    </div>
  );
}
