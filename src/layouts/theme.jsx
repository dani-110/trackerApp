import { createTheme } from "@mui/material/styles";
// const font = "'Lato', sans-serif";

const generateTheme = (mode) => {
  const font = "'Rubik', sans-serif";
  let textColor;
  let inputLabelColor;
  let inputLabelFocusedColor;
  let inputFieldsetColor;
  let inputFocusedColor;

  if (mode === "light") {
    textColor = "#5d6266";
    inputLabelFocusedColor = "#5146d8";
     inputFieldsetColor = "#ffffff";
    inputFocusedColor = "#6c64e0";
  } else {
    textColor = "#aab8c5";
    inputLabelFocusedColor = "#ffffff";
    inputFieldsetColor = "#304a61";
    inputFocusedColor = "#7d6cff";
  }

  return createTheme({
    palette: {
      mode: mode,
      background: {
        default: mode === "light" ? "#eef2f6" : "#061522",
        paper: mode === "light" ? "#ffffff" : "#0b1d2e",
      },
      divider: mode === "light" ? "#dce4ef" : "#304a61",
      ...(mode == "light"
        ? {
            btnColor: {
              main: "linear-gradient(135deg, #665df0, #596ee8)",
              contrastText: "#fff",
            },
            secondary: {
              main: "#9855ff",
              contrastText: "#fff",
            },
            backgroundColor: "rgb(255, 255, 255)",
            headerBackgroundColor: "rgb(255, 255, 255)",
            popoverHeader: "linear-gradient(135deg, #665df0, #596ee8)",
            backgroundBaseColor: "rgb(238, 242, 246)",
            sideBarBackground: "#1a2942",
            shadowColor: "rgba(0, 0, 0, 0.5)",
            textColor,
            text: {
              primary: "#000",
            },
            inputLabelColor: "#000000",
            inputLabelFocusedColor,
            rowBackground: "#d3d3d3",
            inputBorder: "rgba(0, 0, 0, 0.23)",
            inputBackgroundColor: "#ffffff",
            inputFocusedColor,
            inputFocusRing: "rgba(91, 80, 232, 0.16)",
            inputPlaceholderColor:"#8a94a6",
            selectedTab: "#3bc0c3",
            tabText: "rgba(108, 117, 125, 0.75)",
            selectedTabText: "#000",

            //table colors for light mode
            tableHeaderBackground: "#eef2f7",
            tableHeaderText: "#405574",
            tableRowBackground: "#ffffff",
            tableRowHover: "#f3f6fa",
            tableText: "#172b4d",
            tableMutedText: "#74849a",
            paginationBackground: "#ffffff",
            ticketFilterChipBackground: "#f7f9fc",
            ticketFilterChipText: "#526580",
            ticketFilterChipBorder: "#d7e0eb",
            ticketFilterChipActiveBackground: "#e8e5ff",
            ticketFilterChipActiveText: "#5146d8",
            ticketFilterChipActiveBorder: "#5a4aec",
            ticketActiveBackground: "linear-gradient(135deg, #665df0, #596ee8)",
            approvalQueueBackground:"#f5f5ff",
            approvalQueueText:"#5650c9",
            
            modalButtonHeaderBackground: "linear-gradient(135deg, #101a2c, #1b3151)",
            ButtonBackground: "#fbfbfb",
            ButtonBorder: "#dce4ef",
            PanelHeaderBackground:"aliceblue",
            unreadNotificationBackground:"#eeefff",
            unreadNotificationDot:"#665df0"

          }
        : {
            btnColor: {
              main: "linear-gradient(135deg, #665df0, #596ee8)",
              contrastText: "#fff",
            },
            secondary: {
              main: "#624cf5",
              contrastText: "#fff",
            },
            text: {
              primary: "#f4f7fb",
              secondary: "#9cb0c3",
            },
            switchBase: "#fff",

            backgroundColor: "#081827",
            headerBackgroundColor: "#0b1d2e",
            popoverHeader: "linear-gradient(135deg, #665df0, #596ee8)",
            backgroundBaseColor: "#061522",
            sideBarBackground: "#081827",

            shadowColor: "rgba(0, 0, 0, 0.45)",

            rowBackground: "#102438",
            inputBorder: "#304a61",

            selectedTab: "#624cf5",
            selectedTabText: "#fff",
            tabText: "#8fa4b8",

            textColor: "#d9e4ee",

            inputLabelColor: "#b9c7d7",
            inputLabelFocusedColor,
            inputFieldsetColor,
            inputFocusedColor,
            inputBackgroundColor: "#0b1d2e",
            inputFocusRing: "rgba(125, 108, 255, 0.24)",
            inputPlaceholderColor:"#d9e4eeb5",

            pageBackground: "#061522",
            surfaceBackground: "#0b1d2e",
            surfaceHover: "#102438",
            borderColor: "#304a61",
            mutedText: "#8fa4b8",
            inputBackground: "#0b1d2e",

            //table colors for dark mode
            tableHeaderBackground: "#102438",
            tableHeaderText: "#aab8c5",
            tableRowBackground: "#081827",
            tableRowHover: "#102438",
            tableText: "#d9e4ee",
            tableMutedText: "#aab8c5",
            paginationBackground: "#081827",
            ticketFilterChipBackground: "#111f31",
            ticketFilterChipText: "#aab8c5",
            ticketFilterChipBorder: "#30445b",
            ticketFilterChipActiveBackground: "#463b7d",
            ticketFilterChipActiveText: "#f6f4ff",
            ticketFilterChipActiveBorder: "#7466df",
            ticketActiveBackground: "#463b7d",
            approvalQueueBackground:"#1c2145",
            approvalQueueText:"#c7c3ff",


            modalButtonHeaderBackground: "linear-gradient(135deg, #201d45, #2c3a8d)",
            ButtonBackground: "linear-gradient(135deg, #101a2c, #1b3151)",
            ButtonBorder: "#304a61",
            PanelHeaderBackground:"#253e54cf",
            unreadNotificationBackground:"#222b5b",
            unreadNotificationDot:"#b2afff",
          }),
    },
     components: {
    MuiButton: {
      styleOverrides: (() => {
        const containedButton = ({ theme }) => ({
          minHeight: 40,
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          borderRadius: "8px",
          background: theme.palette.btnColor.main,
          color: theme.palette.btnColor.contrastText,
          boxShadow: "0 7px 20px rgba(78, 73, 206, 0.21)",
          textTransform: "none",
          fontWeight: 600,
          fontSize: 12,
          "&:hover": {
            background: theme.palette.btnColor.main,
            filter: "brightness(0.96)",
          },
          "&.Mui-disabled": {
            background: theme.palette.btnColor.main,
            color: theme.palette.btnColor.contrastText,
            opacity: 0.58,
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.palette.secondary.main}`,
            outlineOffset: 2,
          },
        });

        const outlinedButton = ({ theme }) => ({
          minHeight: theme.palette.mode === "light" ? 34 : 40,
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          borderRadius: "8px",
          background: theme.palette.ButtonBackground,
          color:
            theme.palette.mode === "light"
              ? "#353a41"
              : theme.palette.text.primary,
          borderColor: theme.palette.ButtonBorder,
          boxShadow: "0 7px 20px rgba(78, 73, 206, 0.11)",
          textTransform: "none",
          fontSize: theme.palette.mode === "light" ? 12 : undefined,
          fontWeight: theme.palette.mode === "light" ? 500 : 600,
          "&:hover": {
            background:
              theme.palette.mode === "light"
                ? "#edf2f8"
                : "rgba(102, 93, 240, 0.08)",
            borderColor:
              theme.palette.mode === "light" ? "#cbd7e5" : "#665df0",
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.palette.secondary.main}`,
            outlineOffset: 2,
          },
        });

        return {
          contained: containedButton,
          containedPrimary: containedButton,
          containedSecondary: containedButton,
          outlined: outlinedButton,
        };
      })(),
    },
  },

    typography: {
      fontFamily: font,
      body1: {
        fontSize: 14,
        fontWeight: 400,
        color: textColor,
      },
      body2: {
        fontSize: 12,
        fontWeight: 400,
        color: textColor,
      },
      button: {
        fontSize: 10,
        lineHeight: "27px",
        fontWeight: 700,
        borderRadius: 4,
      },
      h1: {
        fontSize: 30,
        fontWeight: 700,
        color: textColor,
      },
      h2: {
        fontSize: 22,
        fontWeight: 700,
        color: textColor,
      },
      h3: {
        fontSize: 18,
        fontWeight: 500,
        lineHeight: "25.2px",
        color: textColor,
      },
      h4: {
        fontSize: 15,
        fontWeight: 600,
        lineHeight: "25.2px",
        color: textColor,
      },
      h5: {
        fontSize: 14,
        fontWeight: 300,
        lineHeight: "25.2px",
        color: textColor,
      },
      h6: {
        fontSize: 12,
        fontWeight: 300,
        lineHeight: "25.2px",
        color: textColor,
      },
    },
    shape: {
      borderRadius: 4,
    },
  });
};
// generateTheme().typography.h1 = {
//   fontSize: 34,
//   fontWeight: 700,
//   color: textColor,
//   [generateTheme().breakpoints.down('md')]: {
//     fontSize: 15,
//   },
// };

// generateTheme().typography.h2 = {
//   fontSize: 24,
//   fontWeight: 700,
//   color: textColor,
//   [generateTheme().breakpoints.down('md')]: {
//     fontSize: 15,
//   },
// };

// generateTheme().typography.h3 = {
//   fontSize: 20,
//   fontWeight: 500,
//   lineHeight: "25.2px",
//   color: textColor,
//   [generateTheme().breakpoints.down('md')]: {
//     fontSize: 13,
//   },
// };

// generateTheme().typography.h4 = {
//   fontSize: 18,
//   fontWeight: 400,
//   lineHeight: "25.2px",
//   color: textColor,
//   [generateTheme().breakpoints.down('md')]: {
//     fontSize: 11,
//   },
// };

// generateTheme().typography.h5 = {
//   fontSize: 16,
//   fontWeight: 300,
//   lineHeight: "25.2px",
//   color: textColor,
//   [generateTheme().breakpoints.down('md')]: {
//     fontSize: 9,
//   },
// };

export default generateTheme;
