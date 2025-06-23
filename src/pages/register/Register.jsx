import {Button, Box, InputAdornment, TextField } from "@mui/material";
import { Form } from "react-router";
import style from './Register.module.css'
import { AccountCircle, CalendarToday, Email, Password } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import axios from "axios";



export default function Register() {
  const {register,handleSubmit} = useForm();

  const registerUser = async (values) =>{
    const response = await axios.post(`https://mytshop.runasp.net/api/Account/register`,values);
    console.log(response);
  }
  return (

    <Box component={Form} 
    className={style.formC}
    onSubmit={handleSubmit(registerUser)}
>
        <TextField
        {...register('firstName')}
          label="first Name"
         
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <AccountCircle/>
              </InputAdornment>,
            },
          }}
        />

           <TextField
            {...register('lastName')}
          label="last Name"
         
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <AccountCircle/>
              </InputAdornment>,
            },
          }}
        />

           <TextField
            {...register('userName')}
          label="user Name"
         
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <AccountCircle/>
              </InputAdornment>,
            },
          }}
        />

           <TextField
           {...register('email')}
          label="user email"
          type="email"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <Email/>
              </InputAdornment>,
            },
          }}
        />

           <TextField
           {...register('password')}
          label="user password"
         type="password"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <Password/>
              </InputAdornment>,
            },
          }}
        />

           <TextField
           {...register('confirmPassword')}
          label="confirm Password"
         type="password"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                  <Password/>
              </InputAdornment>,
            },
          }}
        />

         <TextField
         {...register('birthOfDate')}
          label="birth Of Date"
          type="date"
          sx={{ m: 1 }}
          fullWidth
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">
                <CalendarToday/>
              </InputAdornment>,
            },
          }}
        />

        <Button variant="outlined" type="submit" >Register </Button>
   </Box>
  )
}
