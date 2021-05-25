import React, { useState, useEffect } from "react";
import "./BalancePage.scss";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";

import graphicIcon from "./../../Assets/Svg/circular-graphic-icon.svg";
import barIcon from "./../../Assets/Svg/bar-graphic-icon.svg";
import { object } from "yup";

export default function BalancePage() {
  let [income, setIncome] = useState(0);
  let [expenses, setExpenses] = useState(0);
  let [incomeMovements, setIncomeMovements] = useState([]);

  let [expensesFuel, setExpensesFuel] = useState(0);
  let [expensesRestaurants, setExpensesRestaurants] = useState(0);
  let [expensesClothes, setExpensesClothes] = useState(0);
  let [expensesServices, setExpensesServices] = useState(0);
  let [expensesPaid, setExpensesPaid] = useState(0);

  let [incomeData, setIncomeData] = useState([])

 

  useEffect(() => {
    getTotalIncome();
    getTotalExpenses();
    getTotalExpensesFuel();
    getTotalExpensesRestaurants();
    getTotalExpensesServices();
    getTotalExpensesClothes();
    getTotalExpensesPaid();
    getTotalIncomeData()
  }, []);

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
    const data = [
      { argument: 1, value: incomeMovements[0] },
      { argument: 2, value: income },
    ];
    setIncomeData(data)
  }

  const getTotalExpenses = () => {
    let idUser = 1;
    axios
      .get(
        `https://projectbankingenia.herokuapp.com/api/movements-user-date-operation/userId/${idUser}?startdate=2020-01-13&finishdate=2021-09-20&operation=REST`
      )
      .then((res) => {
        const movens = res.data;
        for (let i = 0; i < movens.length; i++) {
          let quantity = res.data[i].quantity;
          setExpenses((expenses += quantity));
        }
      });
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

  // const Incomedata = [
  //   for (let i = 0; i < incomeMovements.length; i++){
  // { argument: 1, value: 10 },
  // { argument: 2, value: 20 },
  // { argument: 3, value: 30 },
  //   }];

  console.log("incomedata:", incomeData);
  return (
    <div>

    {
      incomeData ===undefined ?
     <h5>Cargando datos</h5>
      :  <div className="balance-container">
        <div className="balance-container__top">
          <h2 className="balance-container__title">Balance</h2>
          <input className="balance-container__input" type="text" />
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
                  <ArgumentAxis />
                  <ValueAxis />

                  <LineSeries valueField="value" argumentField="argument" />
                </Chart>
              </Paper>
            </div>
          </div>
          <div className="balance-container__right">
            <div className="balance-container__right__txt-container">
              <span>
                <img src={graphicIcon} />
                <h4>Gráfico circular</h4>
              </span>
              <span>
                <img src={barIcon} />
                <h4>Gráfico de barras</h4>
              </span>
            </div>
            <div className="balance-container__right__graphic-container">
              <div className="balance-container__right__graphic"></div>
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
    }
    </div>
 
  );
}
