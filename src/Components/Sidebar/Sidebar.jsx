import React, { useState } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import CopyRight from "../CopyRight/CopyRight";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuListItems from "./MenuListItems";
import DashboardRoutes from "../../Routes/DashboardRoutes";
import expandIcon from "./../../Assets/Svg/expand.svg";
import UserIcon from "./../../Assets/Svg/user-icon.svg";
import IngeniaIcon from "./../../Assets/Svg//ingenia-logo.svg";
import BankLogo from "./../../Assets/Svg/bank-logo.svg";

import "./Sidebar.scss";
import { Badge, Container, Grid, Avatar } from "@material-ui/core";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,

      color: "inherit",
     
    },
    color: "inherit",
    backgroundColor: "white"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    fontFamily: "dmSans-regular",
  },
}));
const mainMenuList = [
  {
    text: "Inicio",
    path: "/inicio",
    icon: "INICIO",
  },
  {
    text: "Cuentas",
    path: "/cuentas",
    icon: "CUENTAS",
  },
  {
    text: "Tarjetas",
    path: "/tarjetas",
    icon: "TARJETAS",
  },
  {
    text: "Movimientos",
    path: "/movimientos",
    icon: "MOVIMIENTOS",
  },
  {
    text: "Balance",
    path: "/balance",
    icon: "BALANCE",
  },
];

const Sidebar = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //Estado que controle si se muestra el menú o no
  const [open, setOpen] = useState(true);

  //History para manejar las rutas y navegar
  let history = useHistory();
  //Se define la altura fija del Paper
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  //Metodo par controlar la Apertura del Drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  //Metodo par controlar el Cierre del Drawer
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [openLogout, setOpenLogout] = React.useState(false);
  const anchoRef = React.useRef(null);
  const handleToggle = () => {
    setOpenLogout((prevOpen) => !prevOpen);
  };

  const logout = (event) => {
    sessionStorage.removeItem("logged");
    history.push("/login");
    setOpenLogout(false);
  };
  const handleClose = (event) => {
    setOpenLogout(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenLogout(false);
    }
  }

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} >

        <Toolbar>



          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>











<div className="toolbar-father">


          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            className={classes.title}
            noWrap
          >
            Bienvenido/a a tu banca
          </Typography>




<div className="secondSection">
          {/* Sección de Notificaciones para el usuario */}
          <div className="notifications-section">
            <IconButton color="inherit">
              <Badge color="secondary" badgeContent={10}>
                <NotificationIcon />
              </Badge>
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              fontWeight="400"
              fontSize="16px"
              cursor="pointer"
              noWrap
              className={classes.title}
            >
              Notificaciones
            </Typography>
            </div>







            <div className="user-section">
              <img src={UserIcon} className="user-icon" />
              <Button
                ref={anchoRef}
                aria-controls={openLogout ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className="user__btn"
              >
                <Typography
                  component="h1"
                  variant="h6"
                  color="inherit"
                  fontWeight="500"
                  fontSize="10px"
                  cursor="pointer"
                  className={classes.title}
                >
                  NOMBRE APELLIDO
                </Typography>
                <img src={expandIcon} className="expand-icon" />
              </Button>
       

            <Popper
              open={openLogout}
              anchorEl={anchoRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={openLogout}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem>
                          <div onClick={logout}>
                            Desconectar
                            <IconButton color="inherit">
                              <ExitToAppIcon />
                            </IconButton>
                          </div>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            </div>
</div>
</div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div className={(classes.toolbar, "logoingenia")}>
              <img src={IngeniaIcon} />
              <img src={BankLogo} />
            </div>
            <Divider />
            <List>
              <MenuListItems list={mainMenuList} />
            </List>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div className={(classes.toolbar, "logoingenia")}>
              <img src={IngeniaIcon} />
              <img src={BankLogo} />
            </div>
            <Divider />
            <List>
              <MenuListItems list={mainMenuList} />
            </List>
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/dashboard" component={DashboardRoutes} />
        </Switch>
      </main>
    </div>
  );
};
Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;
