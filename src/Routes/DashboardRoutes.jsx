import React, { useEffect } from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";

import HomePage from "../Pages/Home/HomePage";
import AccountPage from "../Pages/Accounts/AccountPage";
import BalancePage from "../Pages/Balance/BalancePage";
import BankcardPage from "../Pages/Bankcards/BankcardPage";
import LoginPage from "../Pages/Login/LoginPage";
import MovementsPage from "../Pages/Movements/MovementsPage";
import RegisterPage from "../Pages/Register/RegisterPage";
import LoansPage from "../Pages/Loans/LoansPage";
import LoansFormPage from "../Pages/Loans/LoansFormPage";
import CalculateSharePage from "../Pages/Loans/CalculateShare";

export default function DashboardRoutes() {
  const { path } = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${path}/inicio`} component={HomePage} />
        <Route path={`${path}/cuentas`} component={AccountPage} />
        <Route path={`${path}/balance`} component={BalancePage} />
        <Route path={`${path}/tarjetas`} component={BankcardPage} />
        <Route path={`${path}/login`} component={LoginPage} />
        <Route path={`${path}/movimientos`} component={MovementsPage} />
        <Route path={`${path}/registro`} component={RegisterPage} />
        <Route path={`${path}/prestamos`} component={LoansPage} />
        <Route path={`${path}/prestamos-form`} component={LoansFormPage} />
        <Route path={`${path}/cuota`} component={CalculateSharePage} />
      </Switch>
    </div>
  );
}
