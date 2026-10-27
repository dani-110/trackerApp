import React, { useContext, useState } from "react";
// import Card from "../../components/card/Card";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import {
  CheckCircle2,
  Users,
  LockKeyhole,
  LogIn,
  Sun,
  Moon,
} from "lucide-react";
import InputFields from "../../components/InputFields";
import { useForm } from "react-hook-form";
import "./login.scss";
import Logo from "../../assests/qorbito-modern-flow-mark-final.png";
import { ThemeSelectorContext } from "../../store/context/themeSelectore";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/auth";
import { alphanumericWithPointRegex } from "../../utils/Utils";
// import { Link } from "react-router-dom";

const Login = () => {
  const themeCtxt = useContext(ThemeSelectorContext);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true",
  );

  const [showPassword, setShowPassword] = React.useState(false);
  const defaultValues = useForm({
    defaultValues: {
      username: localStorage.getItem("rememberedUsername") || "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = defaultValues;

  const submit = async () => {
    setIsLoading(true);
    let data = getValues();
    data["actuser"] = data.username;
    dispatch(login(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        if (rememberMe) {
          localStorage.setItem("rememberedUsername", data.username);
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberedUsername");
          localStorage.removeItem("rememberMe");
        }

        sessionStorage.setItem("wasHidden", true);
      }

      setIsLoading(false);
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(submit)();
    }
  };

  return (
    <Box className="loginContainer">
      <button
        className="loginThemeOnly"
        aria-label="Toggle theme"
        onClick={() => themeCtxt.themeSelectorHandler(!themeCtxt.themeSelector)}
      >
        {themeCtxt.themeSelector ? <Sun size={17} /> : <Moon size={17} />}
      </button>
      <Box className="loginLayout">
        <Box className="loginHero">
          <Box className="loginBrand">
            <img src={Logo} alt="" aria-hidden="true" />
            <Box>
              <Typography className="brandName">Orbito</Typography>
              <Typography className="brandTagline">Work in motion.</Typography>
            </Box>
          </Box>

          <Typography
            className="heroEyebrow"
            sx={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em" }}
          >
            WORK DELIVERY PLATFORM
          </Typography>
          <Typography component="h1" className="heroHeading">
            Everything your team
            <br />
            needs to move work
            <br />
            forward.
          </Typography>
          <Typography className="heroDescription">
            Tickets, approvals, time, teams and operational visibility â€” in one
            focused workspace.
          </Typography>

          <Box className="heroFeatures">
            <span>
              <CheckCircle2 />
              Clear ownership
            </span>
            <span>
              <CheckCircle2 />
              Less operational noise
            </span>
            <span>
              <CheckCircle2 />
              Complete activity trail
            </span>
          </Box>
        </Box>

        <Box className="loginCard">
          <Typography component="h2">Welcome back</Typography>
          <Typography className="loginIntro">
            Sign in to continue to QOrbito.
          </Typography>

          <form onKeyDown={handleKeyDown} className="loginForm">
            <InputFields
              fieldName="username"
              type="text"
              label="Username"
              control={control}
              rules={{ required: "Username is required" }}
              error={errors.username}
              inputProps={{
                startAdornment: <Users size={23} style={{ color: "var(--login-icon)" }} />,
              }}
              pattern={alphanumericWithPointRegex}
            />
            <InputFields
              fieldName="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              control={control}
              rules={{ required: "Password is required" }}
              error={errors.password}
              inputProps={{
                startAdornment: <LockKeyhole size={25} style={{ color: "var(--login-icon)" }} />,
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible style={{ color: "var(--login-foreground)" }} />
                    ) : (
                      <AiFillEye style={{ color: "var(--login-foreground)" }} />
                    )}
                  </IconButton>
                ),
              }}
            />
            <Box className="loginOptions">
              <label className="rememberMe">
                <Checkbox
                  size="small"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Remember me</span>
              </label>
            </Box>

            <Button
              fullWidth
              size="medium"
              variant="contained"
              disabled={isLoading}
              onClick={handleSubmit(submit)}
            >
              {isLoading ? (
                <CircularProgress size={18} color="inherit" aria-label="Signing in" />
              ) : (
                <LogIn size={17} aria-hidden="true" />
              )}
              <span>{isLoading ? "Signing in…" : "Sign in"}</span>
            </Button>
          </form>
        </Box>
      </Box>

      <Box className="planetHorizon" aria-hidden="true" />
      <Typography className="loginFooter">QOrbito Â· Qubits Tracker</Typography>
    </Box>
  );
};
export default Login;
