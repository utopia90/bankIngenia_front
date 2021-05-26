import React from 'react';
import {useHistory,Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import { Avatar, Button, Checkbox, Container, CssBaseline, FormControlLabel, TextField, Typography,Grid, Box } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LoginPage from '../../Pages/Login/LoginPage';
const RegisterForm = ({submit},classes) => {
    return (
        <form onSubmit={submit} className={classes.form} noValidate>
        <TextField required fullWidth autoFocus id='email' label='Email' name='email' margin='normal' autoComplete='email' variant='outlined'></TextField>
        <TextField required fullWidth autoFocus id='password' type='password' label='Password' name='password' margin='normal' autoComplete='current-password' variant='outlined'></TextField>
        <FormControlLabel control={
                        <Checkbox value='remenber' color='secondary'/>
                        }
                        label='Recordad datos'/>
        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Registrarse</Button>
        <Grid container>

            <Grid item xs={12} sm={6}>
                <Link  variant='body2' to='/login'>{'Ya tengo Cuenta'}</Link>
            </Grid>
        </Grid>
    </form>
    );
}

export default RegisterForm;
