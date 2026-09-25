import React, { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import { Box, Button, CircularProgress, Grid, IconButton, Typography, useMediaQuery } from '@mui/material';
import InputFields from '../../components/InputFields';
import { useForm } from 'react-hook-form';
import './login.scss'
import Logo from '../../assests/qubitsFill.png'
import AuthImg from '../../assests/auth-img.jpg'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { login, me } from '../../store/actions/auth';
import { alphanumericWithPointRegex } from '../../utils/Utils';
import { Link } from 'react-router-dom';

const Login = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const theme = useTheme()
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)

    const [showPassword, setShowPassword] = React.useState(false);
    const defaultValues = useForm({
        defaultValues: {
            username: "",
            password: ""
        },
    });

    const {
        control,
        handleSubmit,
        setError,
        clearErrors,
        watch,
        reset,
        resetField,
        getValues,
        formState: { errors },
    } = defaultValues;

    const submit = async () => {
        setIsLoading(true)
        let data = getValues()
        data["actuser"] = data.username
        data["password"] = data.password;
        dispatch(login(data)).then((res) => {
            console.log(res.payload)
            sessionStorage.setItem('wasHidden', true);
            setIsLoading(false);
        })
    }


    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmit(submit)();
        }
    };

    return <Box className='loginContainer'>
        <Card style={{ width: '60%' }}>
            <Grid container spacing={0}>
                <Grid item xs={6}>
                    <img src={AuthImg} alt="Logo" style={{ maxHeight: '100%', width: '100%', objectFit: 'contain', borderRadius: '10px', overflow: 'hidden' }} />
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex' }}>
                    <Box sx={{ padding: '20px', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                        <Box className="logoContainer">
                            <img src={Logo} alt="Logo" />
                            <Typography variant="h2" component="span" color="#6c757d" >
                                Sign In
                            </Typography>
                            <Typography variant="h6" component="span" color={'#6c757d'} >
                                Enter your email address and password to access account.
                            </Typography>
                        </Box>

                        <form onKeyDown={handleKeyDown} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <InputFields
                                fieldName="username"
                                type="text"
                                label="Username"
                                control={control}
                                rules={{
                                    required: "Username is required",
                                }}
                                error={errors.username}
                                pattern={alphanumericWithPointRegex}
                            />
                            <Link href="#" underline="none" className="forgotLink">
                                Forgot your password?
                            </Link>
                            <InputFields
                                fieldName="password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                control={control}
                                rules={{
                                    required: "Password is required",
                                }}
                                error={errors.password}
                                inputProps={{
                                    endAdornment: (
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <AiFillEyeInvisible color={theme.palette.textColor} /> : <AiFillEye color={theme.palette.textColor} />}
                                        </IconButton>
                                    ),
                                }}
                            />
                            <Button fullWidth size="medium" variant="contained" color="secondary" disabled={isLoading}
                                onClick={handleSubmit(submit)}>
                                {isLoading && (
                                    <CircularProgress size={20} sx={{ marginRight: 1, color: "#fff" }} />
                                )}Login</Button>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    </Box>
}
export default Login;