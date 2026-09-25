import { createTheme } from "@mui/material/styles";
// const font = "'Lato', sans-serif";

const generateTheme = (mode) => {

  const font = "'Rubik', sans-serif";
  let textColor;
  let inputLabelColor;
  let inputLabelFocusedColor;
  let inputFieldsetColor;
  let inputFocusedColor;

  if (mode === 'light') {
    textColor = "#6c757d";
  } else {
    textColor = "#aab8c5";
    inputLabelColor = '#E0E3E7';
    inputLabelFocusedColor = '#E0E3E7';
    inputFieldsetColor = '#6F7E8C';
    inputFocusedColor = '#E0E3E7';
  }

  return createTheme({
    palette: {
      mode: 'light',
      ...(mode == 'light' ? {
        btnColor: {
          main: "#1880e1",
          contrastText: "#fff",
        },
        secondary: {
          main: "#9855ff",
          contrastText: "#fff",
        },
        backgroundColor: 'rgb(255, 255, 255)',
        headerBackgroundColor: 'rgb(255, 255, 255)',
        popoverHeader: '#f7f7f7',
        backgroundBaseColor: 'rgb(238, 242, 246)',
        sideBarBackground: '#1a2942',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        textColor,
        text: {
          primary: '#000'
        },
        rowBackground: '#d3d3d3',
        inputBorder: 'rgba(0, 0, 0, 0.23)'
      }
        : {
          btnColor: {
            main: "#1880e1",
            contrastText: "#000",
          },
          secondary: {
            main: "#9855ff",
            contrastText: "#fff",
          },
          text: {
            primary: '#fff'
          },
          switchBase: '#fff',
          // backgroundColor: 'rgb(15, 18, 20)',
          backgroundColor: '#313a46',
          headerBackgroundColor: '#313a46',
          popoverHeader: '#2d333c',
          backgroundBaseColor: 'rgb(42, 52, 71)',
          sideBarBackground: '#313a46',
          shadowColor: 'rgba(197, 188, 188, 0.8) ',
          rowBackground: '#38373a',
          inputBorder: '#6F7E8C',
          textColor,
          inputLabelColor,
          inputLabelFocusedColor,
          inputFieldsetColor,
          inputFocusedColor
        })
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
        borderRadius: 4
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
      }
    },
    shape: {
      borderRadius: 4,
    },
  });
}
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
