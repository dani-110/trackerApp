import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Tooltip,
  Typography,
  Avatar
} from "@mui/material";
import { Check, Clipboard, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { useDispatch } from "react-redux";
import { resetUserPassword } from "../../store/actions/users";
import { getPasswordPolicy } from "../../store/actions/passwordPolicy";

const ResetPassword = ({ open, user, onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [copied, setCopied] = useState(false);
  const [passwordPolicy, setPasswordPolicy] = useState(null);
  const [policyLoading, setPolicyLoading] = useState(false);
  const [policyError, setPolicyError] = useState("");

  useEffect(() => {
    if (!open) {
      setPasswordPolicy(null);
      setPolicyError("");
      setPolicyLoading(false);
      return;
    }

    let cancelled = false;
    setPolicyLoading(true);

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
  }, [dispatch, open]);

  useEffect(() => {
    if (!open) {
      setTemporaryPassword("");
      setError("");
      setAcknowledged(false);
      setShowPassword(false);
      setCopied(false);
      setIsLoading(false);
      return;
    }
    if (!user?.id) return;

    let cancelled = false;
    const resetPassword = async () => {
      setIsLoading(true);
      setTemporaryPassword("");
      setError("");
      setAcknowledged(false);

      try {
        const result = await dispatch(resetUserPassword(user.id));
        if (cancelled) return;

        if (resetUserPassword.fulfilled.match(result)) {
          const password = result.payload?.temporaryPassword;
          if (password) setTemporaryPassword(password);
          else
            setError(
              "The reset succeeded, but no temporary password was returned.",
            );
        } else {
          setError(
            typeof result.payload === "string"
              ? result.payload
              : "Password reset failed. Please try again.",
          );
        }
      } catch {
        if (!cancelled) setError("Password reset failed. Please try again.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    resetPassword();
    return () => {
      cancelled = true;
    };
  }, [dispatch, open, user?.id]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(temporaryPassword);
      setCopied(true);
    } catch {
      setError(
        "Could not copy automatically. Select the password and copy it.",
      );
    }
  };

  const handleClose = () => {
    setTemporaryPassword("");
    setAcknowledged(false);
    setShowPassword(false);
    setCopied(false);
    setError("");
    onClose();
  };

  const initials = (user?.displayName || user?.username || "U")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return (
    <Box sx={{ p: 2, color: "text.primary" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 1.5,
          mb: 1.75,
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: "#e6e9ff",
            color: "#5b55d9",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {initials}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700 }}>
            {user?.displayName || user?.username || "User"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {[user?.username && `@${user.username}`, user?.status]
              .filter(Boolean)
              .join(" · ")}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          p: 1.75,
          mb: 1.5,
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Temporary password
          </Typography>
          <Typography
            variant="caption"
            sx={{
              px: 1,
              py: 0.25,
              borderRadius: 5,
              bgcolor: "action.hover",
              color: "text.secondary",
            }}
          >
            ONE-TIME VIEW
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            component="code"
            sx={{
              flex: 1,
              overflowWrap: "anywhere",
              fontSize: 16,
              letterSpacing: 1.5,
            }}
          >
            {isLoading
              ? "Generating temporary password…"
              : temporaryPassword
                ? showPassword
                  ? temporaryPassword
                  : "•".repeat(Math.min(temporaryPassword.length, 24))
                : "—"}
          </Typography>
          {temporaryPassword && (
            <>
              <Tooltip title={showPassword ? "Hide password" : "Show password"}>
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((value) => !value)}
                  size="small"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </IconButton>
              </Tooltip>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Clipboard size={15} />}
                onClick={handleCopy}
              >
                {copied ? "Copied" : "Copy"}
              </Button>
            </>
          )}
          {isLoading && <CircularProgress size={20} />}
        </Box>
      </Box>

      {(policyLoading || policyError || passwordPolicy) && (
        <Box
          sx={{
            p: 1.5,
            mb: 1.5,
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.75 }}>
            Active password requirements
          </Typography>
          {policyLoading && (
            <Typography variant="body2" color="text.secondary">
              Loading active policy…
            </Typography>
          )}
          {policyError && (
            <Typography variant="body2" color="error.main">
              {policyError} The server still validates generated passwords.
            </Typography>
          )}
          {passwordPolicy && (
            <>
              <Typography variant="body2" color="text.secondary">
                At least {passwordPolicy.minLength} characters and no more than{" "}
                {passwordPolicy.maxUtf8Bytes} UTF-8 bytes.
              </Typography>
              {[
                [passwordPolicy.requireUppercase, "Uppercase letter"],
                [passwordPolicy.requireLowercase, "Lowercase letter"],
                [passwordPolicy.requireDigit, "Number"],
                [passwordPolicy.requireSpecialChar, "Special character"],
              ]
                .filter(([required]) => required)
                .map(([, requirement]) => (
                  <Typography
                    key={requirement}
                    variant="body2"
                    color="text.secondary"
                  >
                    • Include at least one {requirement.toLowerCase()}.
                  </Typography>
                ))}
            </>
          )}
        </Box>
      )}

      <Alert
        icon={<ShieldAlert size={18} />}
        severity="info"
        sx={{ mb: 1.5, borderRadius: 2 }}
      >
        The password will disappear when this dialog closes. Deliver it through
        an approved secure channel; the user must change it at next sign-in.
      </Alert>

      {error && (
        <Alert severity="error" sx={{ mb: 1.5 }}>
          {error}
        </Alert>
      )}

      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={acknowledged}
            onChange={(event) => setAcknowledged(event.target.checked)}
            disabled={!temporaryPassword || isLoading}
          />
        }
        label={
          <Typography variant="body2">
            I have securely communicated or recorded the temporary password.
          </Typography>
        }
        sx={{ alignItems: "center", ml: -0.5, mb: 1 }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button variant="outlined" onClick={handleClose} disabled={isLoading}>
          Close
        </Button>
        <Button
          variant="contained"
          startIcon={<Check size={16} />}
          onClick={handleClose}
          disabled={!temporaryPassword || !acknowledged || isLoading}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
