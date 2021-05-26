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

  useEffect(() => {
    getTotalIncome();
    getTotalExpenses();
    getTotalExpensesFuel();
    getTotalExpensesRestaurants();
    getTotalExpensesServices();
    getTotalExpensesClothes();
    getTotalExpensesPaid();
    getBarCategoryData();

  }, []);

  useEffect(() => {
    getTotalIncomeData();
  }, [income, incomeMovements]);

  useEffect(() => {
    getTotalCategoryData();
  }, [
    expensesFuel,
    expensesClothes,
    expensesRestaurants,
    expensesServices,
    expensesPaid,
  ]);

  useEffect(() => {
    getBarCategoryData();
  }, [expensesFuel]);

  const getTotalIncome = () => {
    let idUser = 1;
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
  };

  const getBarCategoryData = () => {
    const barData = [
      { category: "gasolina", expenses: expensesFuel },
      { category: "pagado", expenses: expensesPaid },
      { category: "servicios", expenses: expensesServices },
      { category: "restaurantes", expenses: expensesRestaurants },
      { category: "ropa", expenses: expensesClothes },
    ];

    setBarCategoryData(barData);
  };

  const getTotalExpenses = () => {
    let idUser = 1;
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
    let idUser = 1;

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
    let idUser = 1;

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
    let idUser = 1;

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
    let idUser = 1;

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
    let idUser = 1;
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

  const useStyles = makeStyles((theme) => ({
    chart: {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
    lineSeries: {
      color: "pink",
    },
  }));

  const classes = useStyles();

  console.log("barcategorydata", barCategoryData);

  return (
    <div>
      {incomeData === undefined ? (
        <h5>Cargando datos</h5>
      ) : (
        <div className="balance-container">
          <div className="balance-container__top">
            <h2 className="balance-container__title">Balance</h2>
            <div className="balance-container__input">
              <input type="text" /> <img src={expandIcon}></img>
            </div>
          </div>
          <div className="balance-container__bottom">
            <div className="balance-container__left">
              <div className="balance-container__left__txt-container">
                <h4 className="balance-container__left__txt-container--green">
                  Ingresos totales del mes: {income}
                </h4>
                <h4 className="balance-container__left__txt-container--red">
                  Gastos totales del mes: {expenses}
                </h4>
              </div>
              <div className="balance-container__left__graphic-container">
                <Paper>
                  <Chart data={incomeData}>
                    <ArgumentAxis className={classes.lineSeries} />
                    <ValueAxis />

                    <LineSeries valueField="value" argumentField="argument" />
                  </Chart>
                </Paper>
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
              <div className="balance-container__right__graphic-container">
                <div className="balance-container__right__graphic">
                  {changeIncomeGraphic ? (
                    <Paper className={classes.chart}>
                      <Chart data={categoryData}>
                        <PieSeries valueField="area" argumentField="category" />
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
  );
}
