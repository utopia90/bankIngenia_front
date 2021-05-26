import React, {useState, useEffect} from 'react'
import { useLocation, useHistory } from "react-router-dom";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Grid,Paper,Container,Typography} from '@material-ui/core';
import visaIcon from "./../../Assets/Svg/visa-icon.svg";
import bbvaIcon from "./../../Assets/Svg/bbva-icon.svg";
import { pink } from "@material-ui/core/colors";
import "./HomePage.scss";
import GreenIcon from "./../../Assets/Svg/movement-green-down.svg";
import RedIcon from "./../../Assets/Svg/movement-red.svg";
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
  const location = useLocation();
  const history = useHistory();
  const navegar = (ruta) => {
    history.push(ruta);
  };
  const volver = () => {
    history.goBack();
  };
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
          <Paper className={classes.paper}><div className="flexi"><h1>Tarjetas</h1>  <h3 onClick={()=>{navegar('/dashboard/tarjetas')}}>Ver Tarjetas</h3></div>
                 <Grid container spacing={3}>
          {bankCards.map((card, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={6}
              lg={6}
              className="card-container"
            >
              <Paper>
                <img src={bbvaIcon} className="bbva-icon" />
                <h1 className="amountStyle">
                  {card.account.currentCreditCardBalance} €
                </h1>
                <Typography fontSize="28px" className='flexi'>
           
                  <img src={visaIcon} className="bbva-icon" />
                  <span className="account-balance-txt">
                    {  card.pan}
                  </span>
               </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}><h1>BalanceTotal</h1></Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}><div className="flexi"><h1>Movimientos</h1> <h3 onClick={()=>{navegar('/dashboard/movimientos')}}>Ver Movimientos</h3></div>
                 <TableContainer component={Paper}>
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

<TableCell align="center" >

 {row.operationType=='REST' ? <img src={RedIcon}/>:<img src={GreenIcon}/>}

{row.account.iban}</TableCell>

:
<TableCell align="center" >


{row.operationType=='REST' ? <img src={RedIcon}/>:<img src={GreenIcon}/>}
{row.account.cards[0].pan}
</TableCell>}
           

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
