import {useRoutes } from 'react-router-dom';
import './App.css';
import routes from './routes';
import { useContext, useEffect, useMemo } from 'react';
import { ThemeSelectorContext } from './store/context/themeSelectore';
import generateTheme from './layouts/theme';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Notification from './components/Notification';
import './scrollbar.css'

function App() {
  const routing = useRoutes(routes);
  const themeCtxt = useContext(ThemeSelectorContext)

  const { notification } = useSelector((state) => state.ui);




  useEffect(() => {
    toggleDarkMode(themeCtxt.themeSelector)
  }, [themeCtxt])


  function toggleDarkMode(isDarkMode) {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }

  const activeTheme = useMemo(
    () => generateTheme(themeCtxt.themeSelector ? "dark" : "light"),
    [themeCtxt.themeSelector],
  );

  // The app uses MUI's regular ThemeProvider, which does not create the
  // --mui-palette-* CSS variables used by the existing SCSS files.
  useEffect(() => {
    const { palette } = activeTheme;
    const cssVariables = {
      "--mui-palette-background-default": palette.background.default,
      "--mui-palette-background-paper": palette.background.paper,
      "--mui-palette-divider": palette.divider,
      "--mui-palette-text-primary": palette.text.primary,
      "--mui-palette-text-secondary": palette.text.secondary || palette.textColor,
      "--app-table-header-background": palette.tableHeaderBackground,
      "--app-table-header-text": palette.tableHeaderText,
      "--mui-palette-modalButtonHeaderBackground": palette.modalButtonHeaderBackground,
    };

    Object.entries(cssVariables).forEach(([name, value]) => {
      if (value) document.documentElement.style.setProperty(name, value);
    });
  }, [activeTheme]);


  return (
    <ThemeProvider theme={activeTheme}>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {routing}
      {/* <Reporting /> */}
    </ThemeProvider>
  );
}

export default App;
