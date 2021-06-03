import React, { useState, useEffect } from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";


import './LoansPage.scss';


const LoansPage = () => {
    const [loans, setLoans] = useState([]);

  

  const getLoansByUserID = () => {
    let idUser = localStorage.getItem("userId");

    axios
      .get(`https://projectbankingenia.herokuapp.com/api/prestam-user-id/${idUser}`)
      .then((res) => {
        const prestams = res.data;
        console.log(prestams)
        setLoans(prestams);
      });
  };
  useEffect(() => {
    getLoansByUserID();
  }, []);


  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  const classes = useStyles();
  let history = useHistory();


  return (
    <div>
      <div>
         <div className="top-container"><h1>Loans</h1> <div className="btn-div"><button onClick={() => history.push("/dashboard/loans-form")} className="add-loan-btn">Añadir préstamo</button></div></div> 
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <span className="colorGris">Cantidad</span>
                </TableCell>
                <TableCell align="center">
                  <span className="colorGris">Duración</span>
                </TableCell>
                <TableCell align="center">
                  <span className="colorGris">Tipo de interés</span>
                </TableCell>
                <TableCell align="center">
                  <span className="colorGris">Cuenta Ingreso</span>
                </TableCell>
                <TableCell align="center">
                  <span className="colorGris">Cuenta Pago</span>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loans.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.cantidad}</TableCell>

                  <TableCell align="center">{row.durationMonths} </TableCell>
                  <TableCell align="center">{row.interestType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default LoansPage;
