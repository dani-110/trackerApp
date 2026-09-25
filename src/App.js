import {useRoutes } from 'react-router-dom';
import './App.css';
import routes from './routes';
import { useContext, useEffect } from 'react';
import { ThemeSelectorContext } from './store/context/themeSelectore';
import generateTheme from './layouts/theme';
import { ThemeProvider } from '@emotion/react';
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

  const theme = localStorage.getItem("openAPITheme")
  const themeSelector = JSON.parse(theme)

  const lightTheme = generateTheme("light");
  const darkTheme = generateTheme("dark");


  return (
    <ThemeProvider theme={themeSelector ? darkTheme : lightTheme}>
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
