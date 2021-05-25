import React, { useState, useEffect } from "react";
import "./BalancePage.scss";
import axios from "axios";

import graphicIcon from "./../../Assets/Svg/circular-graphic-icon.svg";
import barIcon from "./../../Assets/Svg/bar-graphic-icon.svg";

export default function BalancePage() {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const getMovements = () => {
      let idUser = 1;
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
  }, []);
  return (
    <div>
      <div className="balance-container">
        <div className="balance-container__top">
          <h2 className="balance-container__title">Balance</h2>
          <input className="balance-container__input" type="text" />
        </div>
        <div className="balance-container__bottom">
          <div className="balance-container__left">
            <div className="balance-container__left__txt-container">
              <h4 className="balance-container__left__txt-container--green">
                Ingresos totales del mes:{" "}
              </h4>
              <h4 className="balance-container__left__txt-container--red">
                Gastos totales del mes:{" "}
              </h4>
            </div>
            <div className="balance-container__left__graphic-container"></div>
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
                  <h5 className="txt-item">Electrónica</h5>
                  <h5 className="txt-item">Restaurantes</h5>
                  <h5 className="txt-item">Otros</h5>
                </div>
                <div className="balance-container__right__list-container__expenses">
                  <h5 className="expenses-item">122,4€</h5>
                  <h5 className="expenses-item">122,4€</h5>
                  <h5 className="expenses-item">122,4€</h5>
                  <h5 className="expenses-item">122,4€</h5>
                  <h5 className="expenses-item">122,4€</h5>
                  <h5 className="expenses-item">122,4€</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
