import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import { Avatar, Button, Checkbox, Container, CssBaseline, FormControlLabel, TextField, Typography,Grid,Link, Box } from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CopyRight from '../../Components/CopyRight/CopyRight';
import './RegisterPage.scss';
import RegisterForm from '../../Components/RegisterForm/RegisterForm';


export default function RegisterPage() {
    
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
const classes = useStyles();
let history = useHistory();

const submit =(e) =>{

    e.preventDefault();
    console.log(e.target.value)
    sessionStorage.setItem("logged",true);
    history.push('/inicio');
}

const getMovements = () => {
    let idUser=1;
    axios.get(`https://projectbankingenia.herokuapp.com/api/movement/userId/${idUser}`)
    .then(res => {
      const movens = res.data;
      console.log(movens)

    })

}



    return (
        <Container component='main' maxWidth='xs'>
        <CssBaseline/>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component='h1'>Registro</Typography> 
           <RegisterForm submit={submit} classes={classes}/>
        </div>
        <Box my={8}>
           <CopyRight/>
        </Box>
    </Container>
    )
}
