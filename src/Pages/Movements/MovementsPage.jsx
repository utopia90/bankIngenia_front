import React, { useState, useEffect } from "react";
import "./MovementsPage.scss";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import GreenIcon from "./../../Assets/Svg/movement-green-down.svg";
import RedIcon from "./../../Assets/Svg/movement-red.svg";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function MovementsPage() {
  const classes = useStyles();
  const [movements, setMovements] = useState([]);
  let idUser = localStorage.getItem("userId");
  const getMovements = () => {
    axios
      .get(
        `https://projectbankingenia.herokuapp.com/api/movement/userId/${idUser}`
      )
      .then((res) => {
        const movens = res.data;
        console.log(movens);
        setMovements(movens);
      });
  };

  useEffect(() => {
    getMovements();
  }, []);
  return (
    <div>
      <h1>Movimientos</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <span className="colorGris">IBAN-NºTarjeta</span>
              </TableCell>
              <TableCell align="center">
                <span className="colorGris">Cantidad</span>
              </TableCell>
              <TableCell align="center">
                <span className="colorGris">Concepto</span>
              </TableCell>
              <TableCell align="center">
                <span className="colorGris">Fecha</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movements.map((row) => (
              <TableRow key={row.id}>
                {row.paymentType == "ACCOUNT" ? (
                  <TableCell align="center">
                    {row.operationType == "REST" ? (
                      <img className="movement-icon" src={RedIcon} />
                    ) : (
                      <img className="movement-icon" src={GreenIcon} />
                    )}

                    {row.account.iban}
                  </TableCell>
                ) : (
                  <TableCell align="center">
                    {row.operationType == "REST" ? (
                      <img className="movement-icon" src={RedIcon} />
                    ) : (
                      <img className="movement-icon" src={GreenIcon} />
                    )}
                    {row.account.cards[0].pan}
                  </TableCell>
                )}

                <TableCell align="center">{row.quantity} €</TableCell>
                <TableCell align="center">{row.categoryType}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
