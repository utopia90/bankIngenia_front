import React, {useState, useEffect} from 'react'
import './MovementsPage.scss';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  function createData(name, calories, fat, carbs, protein) {

    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
export default function MovementsPage() {
    const classes = useStyles();
    const [movements, setMovements] = useState([])

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
      getMovements()
    }, []);
    return (
      <div>
      <h1>Movimientos</h1>
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
      </TableContainer>
      </div>

    )
}
