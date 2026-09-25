import React, { createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Global sequence number, incremented every time a query is run
export const BreadCrumSelectorContext = createContext(null);

const BreadCrumSelectorProvider = ({ children }) => {
  const [breadCrumSelector, setBreadCrumSelector] = useState([]);
  const location = useLocation()

  const breadCrumSelectorAddHandler = (e) => {
    if (!e?.includes('undefined')) {
      let arr = [...breadCrumSelector]
      arr.push(e)
      setBreadCrumSelector(arr);
    }
  };
  const addNewSideItem = (e, subLabel) => {
    let arr = []
    arr.push(e)
    // if (subLabel) {
    //   arr.push(subLabel)
    // }
    setBreadCrumSelector(arr);
  };
  const addNewSubSideItem = (e) => {
    let arr = []
    arr.push(breadCrumSelector[0])
    arr.push(e)
    setBreadCrumSelector(arr);
  };
  const nameAsSideMenu = (name) => {
    const url = name?.replace(/([A-Z])/g, ' $&')
    return url[0]?.toUpperCase() + url.slice(1, url.length)
  }
  const addNewNestedSideItem = (e, url) => {
    console.log(url.slice(1))
    let arr = url && url?.split('/')
    console.log(arr?.map(e => nameAsSideMenu(e)))
    setBreadCrumSelector(arr?.map(e => nameAsSideMenu(e)))

    // console.log(breadCrumSelector, e,url)
    // let arr = [...breadCrumSelector]
    // // arr.push(breadCrumSelector[0])
    // arr.push(e)

    // setBreadCrumSelector(arr);
  };

  const breadCrumSelectorRemoveHandler = () => {
    let arr = [...breadCrumSelector]
    const lastIndex = arr[arr.length - 1]
    if (lastIndex?.includes(' tabs')) {
      arr.pop()
    }
    arr.pop()
    setBreadCrumSelector(arr);
  };

  const onChangeTabHandler = (e) => {
    let arr = [...breadCrumSelector]
    arr.pop()
    arr.push(e)
    setBreadCrumSelector(arr);
  };

  const lastItemRemove = () => {
    let arr = [...breadCrumSelector]
    arr.pop()
    setBreadCrumSelector(arr);
  }

  const value = {
    breadCrumSelector: breadCrumSelector,
    setBreadCrumSelector: setBreadCrumSelector,
    addNewSideItem: addNewSideItem,
    addNewSubSideItem: addNewSubSideItem,
    addNewNestedSideItem: addNewNestedSideItem,
    breadCrumSelectorAddHandler: breadCrumSelectorAddHandler,
    breadCrumSelectorRemoveHandler: breadCrumSelectorRemoveHandler,
    onChangeTabHandler: onChangeTabHandler,
    lastItemRemove: lastItemRemove
  };

  return <BreadCrumSelectorContext.Provider value={value}>{children}</BreadCrumSelectorContext.Provider>;
};

export default BreadCrumSelectorProvider;
