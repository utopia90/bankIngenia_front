import React, {useState} from 'react'


import {BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom';

//Importr clsx para trabajar con las clases
import clsx from 'clsx'

//Makestyles -> Estilos con material UI y el tema (theme) por defecto
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { AppBar, Badge, Container, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemIcon, 
    ListItemText, Paper, Toolbar, Typography ,Avatar,CssBaseline } from '@material-ui/core'

//Componentes de Material UI
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

//Iconos de Material UI
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationIcon from '@material-ui/icons/Notifications'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import DashboardRoutes from '../../Routes/DashboardRoutes';
import CopyRight from '../CopyRight/CopyRight';
import MenuListItems from './MenuListItems';


//Definicion de estilos
const drawerWidth = 240

const useStyles = makeStyles (theme => ({
    root: {
        display: 'flex'
    },
    //Toolbar del menu lateral
    toolbar: {
        paddingRight: 24,
        backgroundColor:'white',
        color:' #171948',
        fontWeight:500,
        fontSize:18
    },
    //Iconos del Toolbar
    toolbarIcon: {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar //Se añaden todos los estilos de toolbar por defecto
    },
    //AppBar -> Barra de navegación para desaparecer de la pantalla
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })  
    },
    //AppBar -> Barra de navegación para aparecere en pantalla
    appBarShift: {
        marginLeft: drawerWidth, //Ancho del Drawer
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })  
    },
    //Separación entre elementos del AppBar
    appBarSpacer: theme.mixins.toolbar,
    //Botones del menú (Drawer)
    menuButton: {
        marginRight: 35
    },
    //Botones del menú (Drawer) cuando el menú esté plegado
    menuButtonHidden:{
        display: 'none'
    },
    //Titulo de las opciones del menú
    title:{
        flexGrow:1,
    },
    //Menu (Drawer) abierto
    drawerPaper:{
        position: 'relative',
        width: drawerWidth,
        whiteSpace: 'nowrap',
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })  
    },
    drawerPaperClosed: {
        overflowX : 'hidden',
        width: theme.spacing(7),
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('sm')]:{
            width: theme.spacing(9),
        }
    },
    //Paper del componente
    paper:{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        padding: theme.spacing(2)   
    },
    //Altura fija 
    fixedHeight: {
        height:240
    },
    //Contenidos del DashBoard
    content:{
        flexGrow:1,
        overflow : 'auto',
        height: '100vh'
    },
    //Container del Dashboard
    container:{
        paddingBottom: theme.spacing(4),
        paddingTop: theme.spacing(10),
        paddingLeft: theme.spacing(10)
    }
}))

const mainMenuList = [
    {
        text: 'Inicio',
        path: '/inicio',
        icon: 'INICIO'
    },
    {
        text: 'Cuentas',
        path: '/cuentas',
        icon: 'CUENTAS'
    },
    {
        text: 'Tarjetas',
        path: '/tarjetas',
        icon: 'TARJETAS'
    }
    ,
    {
        text: 'Movimientos',
        path: '/movimientos',
        icon: 'MOVIMIENTOS'
    }
    ,
    {
        text: 'Balance',
        path: '/balance',
        icon: 'BALANCE'
    }
]




export default function Sidebar() {
//Clases para aplicar a los elementos
const classes = useStyles()

//History para manejar las rutas y navegar
let history = useHistory()

//Estado que controle si se muestra el menú o no
const [open, setOpen] = useState(true)

//Se define la altura fija del Paper
const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

//Metodo par controlar la Apertura del Drawer
const handleDrawerOpen = () => {
    setOpen(true)
}
 //Metodo par controlar el Cierre del Drawer
 const handleDrawerClose = () => {
    setOpen(false)
}



const [anchorEl, setAnchorEl] = React.useState(null);

const [openLogout, setOpenLogout] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenLogout((prevOpen) => !prevOpen);
  };

  const logout = (event) => {

        sessionStorage.removeItem('logged');
        history.push('/login');
    setOpenLogout(false);
  };
  const handleClose = (event) => {

setOpenLogout(false);
};
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenLogout(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(openLogout);
  React.useEffect(() => {
    if (prevOpen.current === true && openLogout === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openLogout;
  }, [openLogout]);
return (
    <div className={classes.root}>         

        <CssBaseline/>
        {/* Barra de navegación superior */}
        <AppBar 
            className = {clsx(classes.appBar, open && classes.appBarShift)}
            position= 'absolute'     
        >

            <Toolbar className = { classes.toolbar }>
                {/* Icono para abrir el drawer */}
                <IconButton
                    //clsx (clase q se ejecuta si se cumple el open, y sino se usa la otra)
                    className = {clsx (classes.menuButton, open && classes.menuButtonHidden)}
                    edge = 'start'
                    color = 'default'
                    aria-label='open drawer'
                    onClick = {handleDrawerOpen}
                >
                    {/* Icono de Hamburger para plegar y desplegar */}
                    <MenuIcon/>
                </IconButton>
                {/* Nombre de la aplicacion / empresa */}
                <Typography 
                    component='h1' 
                    variant='h6' 
                    color='inherit' 
                    className={classes.title}
                    noWrap 
                >
                    Bienvenido/a a tu banca
                </Typography>
                {/* Sección de Notificaciones para el usuario */}
                <IconButton color = 'inherit'>
                    <Badge color = 'secondary' badgeContent={10}>
                        <NotificationIcon/>
                    </Badge>
                </IconButton>
                <Typography 
                    component='h1' 
                    variant='h6' 
                    color='inherit' 
                    fontWeight='400'
                    fontSize='18px'
                    cursor='pointer'
                    noWrap 
                >
                    Notificaciones
                </Typography>




                <div>
        <Button
          ref={anchorRef}
          aria-controls={openLogout ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          NOMBRE APELLIDO
          <img src='../../Assets/Svg/expand.svg'/>
        </Button>
        <Popper open={openLogout} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={openLogout} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem >
                    <div  onClick={logout}>
                    Desconectar
                    <IconButton color = 'inherit'>                 
                    <ExitToAppIcon/>                   
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








                {/* Boton para Logout */}
            
            </Toolbar>
        </AppBar>
        {/* Drawer (Contenido izquierda(nav))*/}
        <Drawer
            open = { open }
            classes = {{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClosed)
            }}      
        >
            <div className = {classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon/>
                </IconButton>
            </div>
            {/* Divider para separar los elementos del menú */}
            <Divider/>   
            {/* Lista de elementos de navegación del menú Principal*/}   
      
            <List>
                <MenuListItems list={mainMenuList} />         
            </List>
            <Divider/> 
        </Drawer>  

        {/* Contenido del Dashboard */}
        <main className = {classes.content}>
            {/* Se separa el contenido del AppBar para poder verlo */}
            <div className = { classes.appBarSpacer}>
                {/* Se crea el Container */}
                <Container className={classes.container} maxWidth = 'lg'>
                    {/* Aqui se ponen los componentes o Switch de rutas */}  
                   
                    <Switch>
                        <Route path = '/dashboard' component={DashboardRoutes}/>                      
                    </Switch>


                       {/*  <Switch>
                            <Route path = '/dashboard/home' component={DashboardContent}/>
                            <Route path = '/dashboard/shop' component={DashboardContent}/>
                            <Route path = '/dashboard/contacts' component={DashboardContent}/>
                            <Route path = '/dashboard/settings' component={DashboardContent}/>
                        </Switch>  */}
                        {/* <Grid container spacing={3}>  
                        <Grid item xs = {12} md={4} lg={9}>
                            <Paper className={fixedHeightPaper}>                                  */}
                                {/* Crear un componente que reciba props.children */}
                               {/*  <Typography>Primera caja</Typography>
                            </Paper>
                        </Grid>
                        
                        <Grid item xs = {12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}> */}
                                {/* Crear un componente que reciba props.children */}
                           {/*      <Typography>Segunda caja</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs = {12} md={4} lg={12}>
                            <Paper className={fixedHeightPaper}> */}
                                {/* Crear un componente que reciba props.children */}
                             {/*    <Typography>Tercera caja</Typography>
                            </Paper>
                        </Grid>
                    </Grid>       */}            
                </Container>
            </div>
        </main>
    </div>
)
}
