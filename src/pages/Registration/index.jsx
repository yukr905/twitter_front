import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from "react-redux";
import {  fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import {useForm} from "react-hook-form"
import styles from './Login.module.scss';
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispath =useDispatch()
  const {register,handleSubmit,formState:{errors,isValid}} = useForm({
    defaultValues:{
      fullName:"",
      email:"",
      password:""
    },
    mode:"onChange"
  })

  if(isAuth){
    return <Navigate to="/" />
  }


  const onSubmit = async (values)=>{
    const data = await dispath(fetchRegister(values))
    if(!data.payload){
      alert("Неудалось зарегистрироваться")
    }
    if("token" in data.payload){
      window.localStorage.setItem("token", data.payload.token)
    }
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>

      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField className={styles.field}
        label="FullName"
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName',{required:"Укажите имя"})}
        fullWidth />
      <TextField className={styles.field}
        label="E-Mail"
        type="email"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email',{required:"Укажите почту"})}
        fullWidth />
      <TextField className={styles.field}
        label="Password"
        type="password"
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register('password',{required:"Укажите пароль"})}
        fullWidth />
      <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
