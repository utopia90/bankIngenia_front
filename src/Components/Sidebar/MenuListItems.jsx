import React from "react";

import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

//Componentes de Material UI
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

//Iconos de material UI


import { ReactComponent  as HomePageIcon } from './../../Assets/Svg/house-icon.svg';
import { ReactComponent  as AccountPageIcon } from './../../Assets/Svg/account-icon.svg';
import { ReactComponent  as BankCardIcon } from './../../Assets/Svg/card-icon.svg';
import { ReactComponent  as  MovementsIcon} from './../../Assets/Svg/movements-icon.svg';
import { ReactComponent  as  BalanceIcon} from './../../Assets/Svg/balance-icon.svg';






const getIcon = (icon) => {
  switch (icon) {
    case "INICIO":
      return <HomePageIcon/>
    case "CUENTAS":
      return <AccountPageIcon />;
    case "TARJETAS":
      return <BankCardIcon/>;
    case "MOVIMIENTOS":
      return <MovementsIcon/>;
    case "BALANCE":
      return <BalanceIcon/>;
    default:
      return <HomePageIcon />;
  }
};

const MenuListItems = ({ list }) => {
  const history = useHistory();
  //Obtenemos el PATH
  const { path } = useRouteMatch();

  const navegar = (ruta) => {
    console.log("navegar ruta", ruta);
    history.push(`${path}${ruta}`);
  };

  return (
    <List>
      {list.map(({ text, path, icon }, index) => (
        <ListItem key={index} button onClick={() => navegar(path)}>
          <ListItemIcon>
            {/* Llamamos al método getIcon que nos va a devover el 
                            componente Icono que toque */}
            {getIcon(icon)}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );
};

export default MenuListItems;
