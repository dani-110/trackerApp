import React, {createContext, useEffect, useState} from 'react';

// Global sequence number, incremented every time a query is run
export const ThemeSelectorContext = createContext(null);

const ThemeSelectorProvider = ({children}) => {
  const [themeSelector, setThemeSelector] = useState(false);
  useEffect(()=>{
    const theme = localStorage.getItem("openAPITheme")
    setThemeSelector(JSON.parse(theme))
  },[])
  
  const themeSelectorHandler = (e) => {
    setThemeSelector(e);
    localStorage.setItem("openAPITheme", JSON.stringify(e));
  };

  const value = {
    themeSelector: themeSelector,
    themeSelectorHandler: themeSelectorHandler
  };

  return <ThemeSelectorContext.Provider value={value}>{children}</ThemeSelectorContext.Provider>;
};

export default ThemeSelectorProvider;
