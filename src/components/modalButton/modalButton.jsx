import {
  Box,
  Button,
  IconButton,
  Modal,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { BreadCrumSelectorContext } from "../../store/context/breadCrumSelector";
import HeadingTitle from "../headingTitle/headingTitle";
import "./modalButton.scss";

const ModalButton = (props) => {
  const {
    children,
    heading,
    isOpen,
    showError,
    open,
    setOpen,
    label,
    type,
    startIcon,
    endIcon,
    disabled,
    className,
    variant = "contained",
  } = props;
  const theme = useTheme();
  const buttonVariant = variant === "outline" ? "outlined" : variant;
  const isLightOutlined =
    theme.palette.mode === "light" && buttonVariant === "outlined";
  const breadCrumCtxt = useContext(BreadCrumSelectorContext);

  const handleOpen = () => {
    breadCrumCtxt.breadCrumSelectorAddHandler(label);
    if (showError) {
      if (isOpen) setOpen(true);
      else {
        showError();
      }
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    breadCrumCtxt.breadCrumSelectorRemoveHandler(label);
    setOpen(false);
  };

  return (
    <>
      {type && (
        <>
          {type == "button" ? (
            <Button
              size="medium"
              variant={buttonVariant}
              className={className}
              sx={{
                margin: "0px 0px 10px",
                minHeight: isLightOutlined ? 34 : 40,
                px: 2,
                borderRadius: "8px",
                // borderColor:
                //   buttonVariant === "outlined" ? "#665df0" : "#ffffff17",
                background:
                  buttonVariant === "contained"
                    ? "linear-gradient(135deg, #665df0, #596ee8)"
                    : theme.palette.modalButtonBackground,
                color:
                  buttonVariant === "contained"
                    ? "#fff"
                    : isLightOutlined
                      ? "#353a41"
                      : "inherit",
                borderColor: isLightOutlined
                  ? theme.palette.modalButtonBorder
                  : undefined,
                boxShadow:
                  buttonVariant === "contained"
                    ? "0 7px 20px #4e49ce35"
                    : "none",
                textTransform: "none",
                fontSize: isLightOutlined ? 12 : undefined,
                fontWeight: isLightOutlined ? 500 : 600,
                "&:hover": {
                  background:
                    buttonVariant === "contained"
                      ? "linear-gradient(135deg, #665df0, #596ee8)"
                      : isLightOutlined
                        ? "#edf2f8"
                        : "rgba(102, 93, 240, 0.08)",
                  borderColor: isLightOutlined ? "#cbd7e5" : "#665df0",
                  filter:
                    buttonVariant === "contained" ? "brightness(0.96)" : "none",
                },
              }}
              onClick={handleOpen}
              disabled={disabled}
              startIcon={startIcon ? startIcon : null}
              endIcon={endIcon ? endIcon : null}
            >
              {" "}
              {label}
            </Button>
          ) : (
            <Tooltip title={label}>
              <IconButton
                onClick={handleOpen}
                sx={{ width: "40px", margin: "0px auto" }}
              >
                {startIcon ? startIcon : endIcon ? endIcon : null}
              </IconButton>
            </Tooltip>
          )}
        </>
      )}
      <Modal
        open={Boolean(open)}
        onClose={handleClose}
        aria-labelledby="modal-button-title"
        BackdropProps={{ className: "modalButtonBackdrop" }}
      >
        <Box
          className="modalCardContainer"
          sx={{
            width: "min(540px, calc(100vw - 32px))",
            maxHeight: "calc(100vh - 48px)",
          }}
        >
          <Box className="modalButtonHeader">
            <Typography className="modalButtonQuickAction">
              QUICK ACTION
            </Typography>
            <Box id="modal-button-title">
              <HeadingTitle
                title={heading || label}
                handleClose={handleClose}
              />
            </Box>
          </Box>
          <Box className="modalButtonContent">{children}</Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalButton;
