import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Grid,
  Paper,
  Container,
  Typography,
  TextField,
} from "@material-ui/core";
import { ArgumentScale, Stack } from "@devexpress/dx-react-chart";

import bbvaIcon from "./../../Assets/Svg/bbva-icon.svg";
import graphicIcon from "./../../Assets/Svg/circular-graphic-icon.svg";
import barIcon from "./../../Assets/Svg/bar-graphic-icon.svg";
import expandIcon from "./../../Assets/Svg/expand.svg";

import { pink } from "@material-ui/core/colors";
import "./HomePage.scss";
import GreenIcon from "./../../Assets/Svg/movement-green-down.svg";
import RedIcon from "./../../Assets/Svg/movement-red.svg";
import visaIcon from "./../../Assets/Svg/visa-icon.svg";
import masterCardIcon from "./../../Assets/Svg/mastercard-icon.svg";
import BalancePage from "../Balance/BalancePage";

import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  PieSeries,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";

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
  chart: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  lineSeries: {
    color: "pink",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "80ch",
    },
  },
}));
export default function HomePage() {
  const [idUser, setId] = useState('')
  useEffect(() => {
   let idre= localStorage.getItem("userId");
   setId(idre)
  }, [])
  const location = useLocation();
  const history = useHistory();
  const navegar = (ruta) => {
    history.push(ruta);
  };
  const volver = () => {
    history.goBack();
  };
  const classes = useStyles();
  const [movements, setMovements] = useState([]);
  const [bankCards, setCardsBank] = useState([]);

  let [income, setIncome] = useState(0);
  let [expenses, setExpenses] = useState(0);
  let [incomeMovements, setIncomeMovements] = useState([]);
  let [expensesMovements, setExpensesMovements] = useState([]);

  let [expensesFuel, setExpensesFuel] = useState(0);
  let [expensesRestaurants, setExpensesRestaurants] = useState(0);
  let [expensesClothes, setExpensesClothes] = useState(0);
  let [expensesServices, setExpensesServices] = useState(0);
  let [expensesPaid, setExpensesPaid] = useState(0);

  let [incomeData, setIncomeData] = useState([]);
  let [expensesData, setExpensesData] = useState([]);

  let [categoryData, setCategoryData] = useState([]);
  let [barCategoryData, setBarCategoryData] = useState([]);

  let [changeIncomeGraphic, setChangeIncomeGraphic] = useState(false);
  let [changeLinearGraphic, setChangeLinearGraphic] = useState(true);

  let [inputValue, setInputValue] = useState("");

  const inputData = [
    {
      value: "",
      label: "",
    },
    {
      value: "gastos",
      label: "Balance GLobal Gastos",
    },
    {
      value: "ingresos",
      label: "Balance GLobal Ingresos",
    },
  ];
  useEffect(() => {
    getTotalIncome();
    getTotalExpenses();
    getTotalExpensesFuel();
    getTotalExpensesRestaurants();
    getTotalExpensesServices();
    getTotalExpensesClothes();
    getTotalExpensesPaid();
    getTotalCategoryData();
  }, []);

  useEffect(() => {
    getTotalIncomeData();
    getTotalExpensesData();
    getTotalCategoryData();
  }, [income, incomeMovements, expenses, expensesMovements]);

  useEffect(() => {
    getTotalCategoryData();
  }, [changeIncomeGraphic, changeLinearGraphic]);

  const getTotalIncome = () => {

    let incomes = [];
    axios
      .get(
        `https://projectbankingenia.herokuapp.com/api/movements-user-date-operation/userId/${idUser}?startdate=2020-01-13&finishdate=2021-09-20&operation=SUM`
      )
      .then((res) => {
        const movens = res.data;

        for (let i = 0; i < movens.length; i++) {
          let quantity = res.data[i].quantity;

          incomes.push(quantity);
          setIncome((income += quantity));
        }
      });
    setIncomeMovements(incomes);
  };

  const getTotalIncomeData = () => {
    const data = [];
    for (let i = 0; i < incomeMovements.length; i++) {
      data.push({ argument: i, value: incomeMovements[i] });
    }
    data.push({ argument: data.length, value: income });

    setIncomeData(data);
  };

  const getTotalExpensesData = () => {
    const data = [];
    for (let i = 0; i < expensesMovements.length; i++) {
      data.push({ argument: i, value: expensesMovements[i] });
    }
    data.push({ argument: data.length, value: income });

    setExpensesData(data);
  };
  const getTotalCategoryData = () => {
    const areaFuel = (expensesFuel / expenses) * 100;
    const areaPaid = (expensesPaid / expenses) * 100;
    const areaServices = (expensesServices / expenses) * 100;
    const areaRestaurants = (expensesRestaurants / expenses) * 100;
    const areaClothes = (expensesClothes / expenses) * 100;

    const data = [
      { category: "Fuel", area: areaFuel },
      { category: "Paid", area: areaPaid },
      { category: "Services", area: areaServices },
      { category: "Restaurants", area: areaRestaurants },
      { category: "Clothes", area: areaClothes },
    ];

    setCategoryData(data);

    const barData = [
      { category: "gasolina", expenses: areaFuel },
      { category: "pagado", expenses: areaPaid },
      { category: "servicios", expenses: areaServices },
      { category: "restaurantes", expenses: areaRestaurants },
      { category: "ropa", expenses: areaClothes },
    ];

    setBarCategoryData(barData);
  };

  const getTotalExpenses = () => {

    let expensesArray = [];

    axios
      .get(
        `https://projectbankingenia.herokuapp.com/api/movements-user-date-operation/userId/${idUser}?startdate=2020-01-13&finishdate=2021-09-20&operation=REST`
      )
      .then((res) => {
        const movens = res.data;
        for (let i = 0; i < movens.length; i++) {
          let quantity = res.data[i].quantity;
          expensesArray.push(quantity);
          setExpenses((expenses += quantity));
        }
      });
    setExpensesMovements(expensesArray);
  };
  const getTotalExpensesFuel = () => {

    axios
      .get(
        `https://projectbankingenia.herokuapp.com/api/movements-user-date-operation-category/userId/${idUser}?startdate=2020-01-13&finishdate=2021-09-20&operation=REST&category=FUEL`
      )
      .then((res) => {
        const movens = res.data;
        for (let i = 0; i < movens.length; i++) {
          let quantity = res.data[i].quantity;
          setExpensesFuel((expensesFuel += quantity));
        }
      });
  };
  const getTotalExpensesRestaurants = () => {


    axios
      .get(
        `https://projectbankingenia.herokuapp.com/api/movements-user-date-operation-category/userId/${idUser}?startdate=2020-01-13&finishdate=2021-09-20&operation=REST&category=RESTAURANTS`
      )
      .then((res) => {
        const movens = res.data;
        for (let i = 0; i < movens.length; i++) {
          let quantity = res.data[i].quantity;
          setExpensesRestaurants((expensesRestaurants += quantity));
        }
      });
  };
  const getTotalExpensesServices = () => {


    axios
      .get(
        `https://projectbankingenia.herokuapp.com/api/movements-user-date-operation-category/userId/${idUser}?startdate=2020-01-13&finishdate=2021-09-20&operation=REST&category=UTILITIES`
      )
      .then((res) => {
        const movens = res.data;
        for (let i = 0; i < movens.length; i++) {
          let quantity = res.data[i].quantity;
          setExpensesServices((expensesServices += quantity));
        }
      });
  };
  const getTotalExpensesClothes = () => {


    axios
      .get(
        `https://projectbankingenia.herokuapp.com/api/movements-user-date-operation-category/userId/${idUser}?startdate=2020-01-13&finishdate=2021-09-20&operation=REST&category=CLOTHES`
      )
      .then((res) => {
        const movens = res.data;
        for (let i = 0; i < movens.length; i++) {
          let quantity = res.data[i].quantity;
          setExpensesClothes((expensesClothes += quantity));
        }
      });
  };
  const getTotalExpensesPaid = () => {

    axios
      .get(
        `https://projectbankingenia.herokuapp.com/api/movements-user-date-operation-category/userId/${idUser}?startdate=2020-01-13&finishdate=2021-09-20&operation=REST&category=PAID`
      )
      .then((res) => {
        const movens = res.data;
        console.log(movens);
        for (let i = 0; i < movens.length; i++) {
          let quantity = res.data[i].quantity;
          setExpensesPaid((expensesPaid += quantity));
        }
      });
  };

  const handleInputChange = (event) => {
    let eventValue = event.target.value;
    setInputValue(eventValue);
    eventValue == "gastos"
      ? setChangeLinearGraphic(false)
      : setChangeLinearGraphic(true);
  };

  const getCardBankByUserID = () => {

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
    getCardBankByUserID();
    getMovements();
  }, []);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>

<div className='tarjetas'>
<div className="flexi">
                  <h1>Tarjetas</h1>{" "}
                  <h3
                    onClick={() => {
                      navegar("/dashboard/tarjetas");
                    }}
                  >
                    Ver Tarjetas
                  </h3>
                </div>
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
                        <Typography fontSize="28px" className="flexi">
                          {card.bankCardType === "VISA" ? (
                            <img src={visaIcon} className="bbva-icon" />
                          ) : (
                            <img src={masterCardIcon} className="bbva-icon" />
                          )}
                          <span className="account-balance-txt">
                            {card.pan}
                          </span>
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>



</div>

<div className='movimientos'>

<div className="flexi">
                  <h1>Movimientos</h1>{" "}
                  <h3
                    onClick={() => {
                      navegar("/dashboard/movimientos");
                    }}
                  >
                    Ver Movimientos
                  </h3>
                </div>
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
                                <img src={RedIcon} />
                              ) : (
                                <img src={GreenIcon} />
                              )}

                              {row.account.iban}
                            </TableCell>
                          ) : (
                            <TableCell align="center">
                              {row.operationType == "REST" ? (
                                <img src={RedIcon} />
                              ) : (
                                <img src={GreenIcon} />
                              )}
                              {row.account.cards[0].pan}
                            </TableCell>
                          )}

                          <TableCell align="center">{row.quantity} €</TableCell>
                          <TableCell align="center">
                            {row.categoryType}
                          </TableCell>
                          <TableCell align="center">{row.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>


</div>




            
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
                <div className='graficos'>

                {incomeData === undefined ? (
            <h5>Cargando datos</h5>
          ) : (
            <div className="">
              <div className="balance-container__top">
                <form className={classes.root} noValidate autoComplete="off">
                  <div>
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          id="standard-select-currency-native"
                          select
                          label=""
                          value={inputData}
                          onChange={handleInputChange}
                          SelectProps={{
                            native: true,
                          }}
                          helperText="Por favor, seleccione el balance que desea consultar"
                        >
                          {inputData.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </div>
                    </form>
                  </div>
                </form>
              </div>
     
              <div className="balance-graphiccontainer__bottom">
                <div className="">
                  <div className="balance-container__left__txt-container">
                    <h4
                      onClick={() => setChangeLinearGraphic(true)}
                      className="balance-container__left__txt-container--green"
                    >
                      Ingresos totales del mes: {income}
                    </h4>
                    <h4
                      onClick={() => setChangeLinearGraphic(false)}
                      className="balance-container__left__txt-container--red"
                    >
                      Gastos totales del mes: {expenses}
                    </h4>
                  </div>
                  <div className="balance-container__left__graphic-container">
                    {changeLinearGraphic ? (
                      <Paper>
                        <Chart data={incomeData}>
                          <ArgumentAxis className={classes.lineSeries} />
                          <ValueAxis />

                          <LineSeries
                            valueField="value"
                            argumentField="argument"
                          />
                        </Chart>
                      </Paper>
                    ) : (
                      <Paper>
                        <Chart data={expensesData}>
                          <ArgumentAxis className={classes.lineSeries} />
                          <ValueAxis />

                          <LineSeries
                            valueField="value"
                            argumentField="argument"
                          />
                        </Chart>
                      </Paper>
                    )}
                  </div>
                </div>
                <div className="">
                  <div className="balance-container__right__txt-container">
                    <div>
                      <span
                        className="graphic-btn"
                        onClick={() => setChangeIncomeGraphic(true)}
                      >
                        <img src={graphicIcon} />
                        <h4>Gráfico circular</h4>
                      </span>
                    </div>
                    <span
                      className="graphic-btn"
                      onClick={() => setChangeIncomeGraphic(false)}
                    >
                      <img src={barIcon} />
                      <h4>Gráfico de barras</h4>
                    </span>
                  </div>
                  <div className="balance-container__right__graphic-container">
                    <div className="balance-container__right__graphic">
                      {changeIncomeGraphic ? (
                        <Paper className={classes.chart}>
                          <Chart data={categoryData}>
                            <PieSeries
                              valueField="area"
                              argumentField="category"
                            />
                          </Chart>
                        </Paper>
                      ) : (
                        <Paper>
                          <Chart data={barCategoryData}>
                            <ArgumentAxis />
                            <ValueAxis />
                            <BarSeries
                              valueField="expenses"
                              argumentField="category"
                              name="gasolina"
                            />
                            <BarSeries
                              valueField="expenses"
                              argumentField="category"
                              name="pagado"
                            />
                            <BarSeries
                              valueField="expenses"
                              argumentField="category"
                              name="servicios"
                            />
                            <BarSeries
                              valueField="expenses"
                              argumentField="category"
                              name="restaurantes"
                            />
                            <BarSeries
                              valueField="expenses"
                              argumentField="category"
                              name="ropa"
                            />
                            <Stack />
                          </Chart>
                        </Paper>
                      )}
                    </div>
                    <div className="balance-container__right__list-container">
                      <div className="balance-container__right__list-container__txt">
                        <h5 className="txt-item">Gasolina</h5>
                        <h5 className="txt-item">Servicios</h5>
                        <h5 className="txt-item">Ropa</h5>
                        <h5 className="txt-item">Restaurantes</h5>
                        <h5 className="txt-item">Pagado</h5>
                      </div>

                      <div className="balance-container__right__list-container__expenses">
                        <h5 className="expenses-item">{expensesFuel}</h5>
                        <h5 className="expenses-item">{expensesServices}</h5>
                        <h5 className="expenses-item">{expensesClothes}</h5>
                        <h5 className="expenses-item">{expensesRestaurants}</h5>
                        <h5 className="expenses-item">{expensesPaid}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
















                </div>


          </Paper>
        </Grid>
      </Grid>
      </div>
  );
}
