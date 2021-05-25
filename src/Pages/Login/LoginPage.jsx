import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import { Avatar, Button, Checkbox, Container, CssBaseline, FormControlLabel, TextField, Typography,Grid,Link, Box } from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './Login.scss';
import LoginFom from '../../Components/LoginForm/LoginFom';
import CopyRight from '../../Components/CopyRight/CopyRight';




const useStyles = makeStyles(theme =>({
    paper:{
        marginTop:theme.spacing(8),
        display:'flex',
        flexDirection:'column',
        alignItems: 'center'
    },
    form:{
        marginTop:theme.spacing(2),
        width:'100%',

    },
    submit:{
        margin: theme.spacing(3,0,2)
    },
    avatar:{
        backgroundColor:theme.palette.secondary.main,
        margin: theme.spacing(1)
    }
}))


    
const LoginPage = () => {
    const classes = useStyles();
    let history = useHistory();
    
    const submit =(e) =>{
 
        e.preventDefault();
        let user={
            email:"borja@diaz",
            password:"1234"
        }
      Login(user)
    }

    const Login = (user) => {

        axios.post(`https://projectbankingenia.herokuapp.com/auth/login`,user)
        .then(res => {
          const token = res.data;
          sessionStorage.setItem("logged",token);
          console.log(token)
          history.push('/dashboard/inicio');
    
        })
 
    }







    return (
        <Container component='main' maxWidth='xs'>
        <CssBaseline/>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component='h1'>Acceso</Typography> 
           <LoginFom submit={submit} classes={classes}/>
        </div>
        <Box my={8}>
           <CopyRight/>
        </Box>
    </Container>
    );
}

export default LoginPage;
