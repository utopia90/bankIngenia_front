import React, { useState, useEffect } from "react";
import "./BalancePage.scss";
import axios from "axios";

import {
  AppBar,
  Badge,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
  Avatar,
  CssBaseline,
  MenuItem,
  TextField,
} from "@material-ui/core";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  PieSeries,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { scaleBand } from "@devexpress/dx-chart-core";
import { ArgumentScale, Stack } from "@devexpress/dx-react-chart";

import graphicIcon from "./../../Assets/Svg/circular-graphic-icon.svg";
import barIcon from "./../../Assets/Svg/bar-graphic-icon.svg";
import expandIcon from "./../../Assets/Svg/expand.svg";

import { makeStyles } from "@material-ui/core/styles";

import { object } from "yup";
import { EqualizerTwoTone } from "@material-ui/icons";

export default function BalancePage() {
  let idUser = localStorage.getItem("userId");
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

  let [changeIncomeGraphic, setChangeIncomeGraphic] = useState(true);
  let [changeLinearGraphic, setChangeLinearGraphic] = useState(true);

  let [inputValue, setInputValue] = useState("");

  let [areaFuel, setAreaFuel] = useState(0);
  let [areaPaid, setAreaPaid] = useState(0);
  let [areaClothes, setAreaClothes] = useState(0);
  let [areaServices, setAreaServices] = useState(0);
  let [areaRestaurants, setAreaRestaurants] = useState(0);

  let categoryData = [
    { category: "Gasolina", area: expensesFuel },
    { category: "Pagado", area: expensesPaid },
    { category: "Servicios", area: expensesServices },
    { category: "Restaurantes", area: expensesRestaurants },
    { category: "Ropa", area: expensesClothes },
  ];

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
  }, []);

  useEffect(() => {
    getTotalIncomeData();
    getTotalExpensesData();
  }, [income, expenses]);

  // useEffect(() => {
  //   getTotalCategoryData();
  // }, [expenses]);

  const getTotalIncome = () => {
    let incomes = [];
    axios
      .get(
        `http://localhost:8080/api/movements-user-date-operation/userId/${idUser}?startdate=2020-01-13&finishdate=2021-09-20&operation=SUM`
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
    data.push({ argument: data.length, value: expenses });

    setExpensesData(data);
  };

  const getTotalExpenses = () => {
    let expensesArray = [];

    axios
      .get(
        `http://localhost:8080/api/movements-user-date-operation/userId/${idUser}?startdate=2020-01-13&finishdate=2021-09-20&operation=REST`
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
        `http://localhost:8080/api/movements-user-date-operation-category/userId/${idUser}?startdate=2020-01-13&finishdate=2021-09-20&operation=REST&category=FUEL`
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
        `http://localhost:8080/api/movements-user-date-operation-category/userId/${idUser}?startdate=2020-01-13&finishdate=2021-09-20&operation=REST&category=RESTAURANTS`
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
        `http://localhost:8080/api/movements-user-date-operation-category/userId/${idUser}?startdate=2020-01-13&finishdate=2021-09-20&operation=REST&category=UTILITIES`
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
        `http://localhost:8080/api/movements-user-date-operation-category/userId/${idUser}?startdate=2020-01-13&finishdate=2021-09-20&operation=REST&category=CLOTHES`
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
        `http://localhost:8080/api/movements-user-date-operation-category/userId/${idUser}?startdate=2020-01-13&finishdate=2021-09-20&operation=REST&category=PAID`
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

  // const getTotalCategoryData = () => {
  //   if (expensesFuel === undefined || expensesFuel == 0) areaFuel = 0;
  //   if (expenses === undefined) expenses = 0;
  //   if (expensesPaid === undefined || expensesPaid == 0) areaPaid = 0;
  //   if (expensesServices === undefined || expensesServices == 0)
  //     areaServices = 0;
  //   if (expensesRestaurants === undefined || expensesRestaurants == 0)
  //     areaRestaurants = 0;
  //   if (expensesClothes === undefined || expensesClothes == 0) areaClothes = 0;

  //   setAreaFuel((expensesFuel / expenses) * 100);
  //   setAreaPaid((expensesPaid / expenses) * 100);
  //   setAreaServices((expensesServices / expenses) * 100);
  //   setAreaRestaurants((expensesRestaurants / expenses) * 100);
  //   setAreaClothes((expensesClothes / expenses) * 100);

  //   const data = [
  //     { category: "Gasolina", area: expensesFuel },
  //      { category: "Pagado", area: expensesPaid },
  //   { category: "Servicios", area: expensesServices },
  //   { category: "Restaurantes", area: expensesRestaurants },
  //    { category: "Ropa", area: expensesClothes },
  //   ];

  //   setCategoryData(data);
  //  };

  const handleInputChange = (event) => {
    let eventValue = event.target.value;
    console.log(eventValue);
    setInputValue(eventValue);
    eventValue == "gastos"
      ? setChangeLinearGraphic(false)
      : setChangeLinearGraphic(true);
  };

  console.log(inputValue);
  const useStyles = makeStyles((theme) => ({
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
        width: "210ch",
        color: "pink",
      },
    },
  }));
  const classes = useStyles();

  console.log("expensesData", expensesData);
  console.log("expensesmovements", expensesMovements);
  console.log("caregorydata", categoryData);
  console.log("expensesfuel", expensesFuel);
  console.log("expensespaid", expensesPaid);
  console.log("expensesclothes", expensesClothes);
  console.log("expensesservics", expensesServices);

  return (
    <div>
      {incomeData === undefined ? (
        <h5>Cargando datos</h5>
      ) : (
        <div className="balance-container">
          <div className="balance-container__top">
            <h2 className="balance-container__title">Balance</h2>
            <form className={classes.root} noValidate autoComplete="off">
              <div>
                <form className={classes.root} noValidate autoComplete="off">
                  <div>
                    <TextField
                      id="standard-select-currency-native"
                      select
                      label=""
                      value={inputData}
                      onChange={handleInputChange}
                      multiple={false}
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
          <div></div>
          <div className="balance-container__bottom">
            <div className="balance-container__left">
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

                      <LineSeries valueField="value" argumentField="argument" />
                    </Chart>
                  </Paper>
                ) : (
                  <Paper>
                    <Chart data={expensesData}>
                      <ArgumentAxis className={classes.lineSeries} />
                      <ValueAxis />

                      <LineSeries valueField="value" argumentField="argument" />
                    </Chart>
                  </Paper>
                )}
              </div>
            </div>
            <div className="balance-container__right">
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
              <div className="balance-container__right__graphic-block">
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
                              <Chart data={categoryData}>
                                <ArgumentAxis />
                                <ValueAxis />
                                <BarSeries
                                  valueField="area"
                                  argumentField="category"
                                  name="gasolina"
                                />
                                <BarSeries
                                  valueField="area"
                                  argumentField="category"
                                  name="pagado"
                                />
                                <BarSeries
                                  valueField="area"
                                  argumentField="category"
                                  name="servicios"
                                />
                                <BarSeries
                                  valueField="area"
                                  argumentField="category"
                                  name="restaurantes"
                                />
                                <BarSeries
                                  valueField="area"
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
  );
}
