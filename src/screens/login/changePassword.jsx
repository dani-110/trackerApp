import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getPasswordPolicy } from "../../store/actions/passwordPolicy";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from "@mui/material";
import { Eye, EyeOff, KeyRound, AlertCircle, CheckCircle2 } from "lucide-react";
import InputFields from "../../components/InputFields";
import PageHeader from "../../components/pageHeader/pageHeader";
import { changePassword } from "../../store/actions/auth";
import ButtonContainer from "../../components/buttonContainer";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordPolicy, setPasswordPolicy] = useState(null);
  const [policyLoading, setPolicyLoading] = useState(true);
  const [policyError, setPolicyError] = useState("");

  const [visible, setVisible] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  

  useEffect(() => {
    let cancelled = false;

    dispatch(getPasswordPolicy()).then((result) => {
      if (cancelled) return;

      if (getPasswordPolicy.fulfilled.match(result)) {
        setPasswordPolicy(result.payload.data.policy);
        setPolicyError("");
      } else {
        setPolicyError("Unable to load the active password policy.");
      }

      setPolicyLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const newPassword = watch("newPassword", "");
  const passwordCharacters = Array.from(newPassword).length;
  const passwordBytes = new TextEncoder().encode(newPassword).length;
  const meetsMinimumLength =
    passwordPolicy && passwordCharacters >= passwordPolicy.minLength;
  const meetsByteLimit =
    passwordPolicy && passwordBytes <= passwordPolicy.maxUtf8Bytes;
  const complexityRequirements = [
    { enabled: passwordPolicy?.requireUppercase, label: "At least one uppercase letter", matches: /[A-Z]/.test(newPassword) },
    { enabled: passwordPolicy?.requireLowercase, label: "At least one lowercase letter", matches: /[a-z]/.test(newPassword) },
    { enabled: passwordPolicy?.requireDigit, label: "At least one number", matches: /[0-9]/.test(newPassword) },
    { enabled: passwordPolicy?.requireSpecialChar, label: "At least one special character", matches: /[^A-Za-z0-9]/.test(newPassword) },
  ].filter(({ enabled }) => enabled);

  const passwordAdornment = (field) => ({
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label={visible[field] ? "Hide password" : "Show password"}
          onClick={() =>
            setVisible((current) => ({ ...current, [field]: !current[field] }))
          }
          edge="end"
          size="small"
        >
          {visible[field] ? <EyeOff size={18} /> : <Eye size={18} />}
        </IconButton>
      </InputAdornment>
    ),
  });

  const submit = async ({ currentPassword, newPassword: nextPassword }) => {
    setIsLoading(true);
    try {
      const result = await dispatch(
        changePassword({ currentPassword, newPassword: nextPassword }),
      );
      if (changePassword.fulfilled.match(result)) {
        navigate("/login", { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      className="screenPage"
      sx={{
        minHeight: 0,
        overflowY: "auto",
        px: { xs: 2, md: 3.5 },
        py: { xs: 2.5, md: 3 },
        width: "100%",
        gap: 2,
        bgcolor: "background.default",
        "& input[type='password']::-ms-reveal, & input[type='password']::-ms-clear":
          {
            display: "none",
          },
        "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus":
          {
            WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
            caretColor: theme.palette.text.primary,
            transition: "background-color 99999s ease-out 0s",
          },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 980,
          mx: "auto",
          "& .pageHeaderText": { textAlign: "left" },
        }}
      >
        <PageHeader
          eyebrow="MY ACCOUNT / SECURITY"
          title="Change password"
          description="Update your sign-in password and protect your QOrbito account."
        />
      </Box>

      <Box
        component="section"
        sx={{
          width: "100%",
          maxWidth: 980,
          mx: "auto",
          p: { xs: 2.5, md: 3.5 },
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
          boxShadow: "0 10px 30px rgba(30, 55, 90, 0.05)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              display: "grid",
              placeItems: "center",
              borderRadius: 2,
              bgcolor: "#e6e9ff",
              color: "secondary.main",
              flexShrink: 0,
            }}
          >
            <KeyRound size={25} />
          </Box>
          <Box>
            <Typography
              component="h2"
              variant="h5"
              sx={{
                fontWeight: "600",
                color: "text.primary",
                fontSize: "24px",
              }}
            >
              Set a new password
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 0.3 }}>
              Enter your current password and choose a different one.
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(submit)}>
          {policyError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {policyError}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputFields
                fieldName="currentPassword"
                type={visible.current ? "text" : "password"}
                label="Current password"
                placeholder="Enter password"
                autoComplete="current-password"
                control={control}
                inputProps={passwordAdornment("current")}
                rules={{ required: "Enter your current password" }}
                error={errors.currentPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFields
                fieldName="newPassword"
                type={visible.next ? "text" : "password"}
                label="New password"
                placeholder="Enter password"
                autoComplete="new-password"
                control={control}
                inputProps={passwordAdornment("next")}
                rules={{
                  required: "Enter a new password",
                  validate: (value) => {
                    if (!passwordPolicy) return "Password policy is unavailable.";
                    if (
                      passwordPolicy.requireCurrentPasswordDifference &&
                      value === watch("currentPassword")
                    ) {
                      return "New password must differ from current password";
                    }
                    if (Array.from(value).length < passwordPolicy.minLength) {
                      return `Use at least ${passwordPolicy.minLength} characters`;
                    }
                    if (new TextEncoder().encode(value).length > passwordPolicy.maxUtf8Bytes) {
                      return `Password must be no more than ${passwordPolicy.maxUtf8Bytes} UTF-8 bytes`;
                    }
                    if (passwordPolicy.requireUppercase && !/[A-Z]/.test(value)) return "Include at least one uppercase letter";
                    if (passwordPolicy.requireLowercase && !/[a-z]/.test(value)) return "Include at least one lowercase letter";
                    if (passwordPolicy.requireDigit && !/[0-9]/.test(value)) return "Include at least one number";
                    if (passwordPolicy.requireSpecialChar && !/[^A-Za-z0-9]/.test(value)) {
                      return "Include at least one special character";
                    }
                    return true;
                  },
                }}
                error={errors.newPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <InputFields
                fieldName="confirmPassword"
                type={visible.confirm ? "text" : "password"}
                label="Confirm new password"
                placeholder="Enter password"
                autoComplete="new-password"
                control={control}
                inputProps={passwordAdornment("confirm")}
                rules={{
                  required: "Confirm your new password",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                }}
                error={errors.confirmPassword}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: "background.default",
            }}
          >
            <Typography
              variant="body2"
              fontWeight={700}
              sx={{ mb: 1, color: "text.primary" }}
            >
              Password requirements
            </Typography>
            <Typography
              variant="body2"
              color={
                !passwordPolicy
                  ? "text.secondary"
                  : meetsMinimumLength
                    ? "success.main"
                    : "text.secondary"
              }
            >
              {meetsMinimumLength ? (
                <CheckCircle2 size={15} />
              ) : (
                <AlertCircle size={15} />
              )}{" "}
              &nbsp;At least {passwordPolicy?.minLength ?? "—"} characters
            </Typography>
            <Typography
              variant="body2"
              color={
                !passwordPolicy || newPassword.length === 0
                  ? "text.secondary"
                  : meetsByteLimit
                    ? "success.main"
                    : "error.main"
              }
              sx={{ mt: 0.5 }}
            >
              {meetsByteLimit ? (
                <CheckCircle2 size={15} />
              ) : (
                <AlertCircle size={15} />
              )}{" "}
              &nbsp;No more than {passwordPolicy?.maxUtf8Bytes ?? "—"} UTF-8 bytes
            </Typography>
            {complexityRequirements.map(({ label, matches }) => (
              <Typography
                key={label}
                variant="body2"
                color={
                  newPassword.length === 0
                    ? "text.secondary"
                    : matches
                      ? "success.main"
                      : "text.secondary"
                }
                sx={{ mt: 0.5, display: "flex", alignItems: "center", gap: 0.5 }}
              >
                {matches ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                {label}
              </Typography>
            ))}
          </Box>
          <ButtonContainer isSingle>
            <Button
              type="submit"
              size="medium"
              variant="contained"
              disabled={isLoading || policyLoading || !passwordPolicy}
              sx={{ marginTop: "12px" }}
              startIcon={
                isLoading ? (
                  <CircularProgress
                    size={16}
                    sx={{ marginRight: 1, color: "#fff" }}
                  />
                ) : (
                  <KeyRound size={16} />
                )
              }
            >
              Change password
            </Button>
          </ButtonContainer>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 2 }}
          >
            For your security, you’ll need to sign in again after changing your
            password.
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default ChangePassword;
