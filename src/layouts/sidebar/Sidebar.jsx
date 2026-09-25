import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.scss";
import { Box, Collapse, IconButton, Tooltip, Typography } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { navData as nav } from "./_profileNav";
import { MdExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { useTheme } from '@mui/material/styles';
import { BreadCrumSelectorContext } from "../../store/context/breadCrumSelector";

import Logo from '../../assests/qubitsHorizontal.png'
import QubitsQ from '../../assests/qubitsQ.png'

// ==========================================
// Sub-Component 1: Direct Leaf Navigation Links
// ==========================================
const NavLinkItem = ({ item, sideMenuToggle, type, onClick }) => (
  <li>
    <NavLink onClick={(e) => onClick(e, item)} className='' to={item.url}>
      {!sideMenuToggle ? (
        <Tooltip title={item.label}>
          <img src={item?.icon} alt={item.label} />
        </Tooltip>
      ) : (
        <img src={item?.icon} alt={item.label} />
      )}
      {sideMenuToggle && <Typography variant="h5" component="span" className="navText">{item.label}</Typography>}
    </NavLink>
  </li>
);

// ==========================================
// Sub-Component 2: Handles the Nested Sub-Menu Blocks
// ==========================================
const SubMenuBlock = ({ sub, submenuExpanded, sideMenuToggle, type, onSubClick, onLinkClick }) => {
  const isSubExpanded = submenuExpanded === sub.label;
  return (
    <>
      <Box onClick={() => onSubClick(sub)} className={`navSubText ${isSubExpanded ? 'selectedText' : ''}`}>
        <Box style={{ display: 'flex', displayDirection: 'row', alignItems: 'center' }}>
          {!sideMenuToggle ? (
            <Tooltip title={sub.label}>
              <img src={sub.icon} alt={sub.label} />
            </Tooltip>
          ) : (
            <img src={sub.icon} alt={sub.label} />
          )}
          {sideMenuToggle && <Typography variant="h5" component="span" sx={{ color: isSubExpanded ? '#3bc0c3' : '#70809a', marginLeft: type !== "drawer" ? '10px' : 0, fontWeight: '400' }}>{sub.label}</Typography>}
        </Box>
        {sub.subLable && (isSubExpanded ? <MdOutlineExpandLess size={20} /> : <MdExpandMore size={20} />)}
      </Box>

      {sub.subLable && (
        <Collapse in={isSubExpanded} timeout="auto" unmountOnExit>
          <ul className="menuList">
            {sub.subLable.map((s, index) => (
              <NavLinkItem key={index} item={s} sideMenuToggle={sideMenuToggle} type={type} onClick={onLinkClick} />
            ))}
          </ul>
        </Collapse>
      )}
    </>
  );
};

// ==========================================
// Main Sidebar Component
// ==========================================
const Sidebar = (props) => {
  const { fixed, sideMenu, menuToggleHandler, type, sideMenuToggle, menuToggle } = props;
  const theme = useTheme();
  const location = useLocation();
  const breadCrumCtxt = useContext(BreadCrumSelectorContext);

  const [expanded, setExpanded] = useState("");
  const [submenuExpanded, setSubMenuExpanded] = useState("");
  const [navData] = useState(nav);

  const navigate = useNavigate();

  const nameAsSideMenu = (name) => {
    const url = name?.replace(/([A-Z])/g, ' $&');
    return url?.toUpperCase() + url.slice(1, url.length);
  };

  useEffect(() => {
    let arr = location.pathname.slice(1).split('/');
    breadCrumCtxt.setBreadCrumSelector(arr.map(e => e.includes("UpdateForm") ? 'Edit' : nameAsSideMenu(e)));
  }, [location]);

  const handleExpandClick = (key) => {
    navigate(key.url);
    if (key?.subMenu?.length > 0) {
      setSubMenuExpanded(key?.subMenu?.label);
    }
    setExpanded((prev) => (prev === key.label ? "" : key.label));
  };

  const handleExpandSubClick = (key) => {
    navigate(key.url);
    setSubMenuExpanded((prev) => (prev === key.label ? "" : key.label));
  };

  const handleClick = (e, url) => {
    if (url?.url?.split('/').length === 2) {
      setSubMenuExpanded('');
    }
    navigate(url.url);
  };

  return (
    <Box sx={{ background: theme.palette.sideBarBackground }} className={`sidebar ${fixed ? 'fixed' : sideMenu ? 'sideMenu' : ''} ${!sideMenuToggle ? 'small' : ''} ${menuToggle ? 'show' : ''}`}>
      <Box sx={{ maxWidth: '450px', margin: '10px auto' }}>
        {menuToggle && fixed && (
          <IconButton sx={{ position: 'absolute', top: 0, right: 10 }} aria-label="add" color="primary" onClick={menuToggleHandler}>
            <IoMdClose color="#fff" />
          </IconButton>
        )}
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: theme.palette.sideBarBackground,
      }}>
        {
          menuToggle ?
            <img src={Logo} alt="Logo" onClick={() => navigate('dashboard')} />
            : <img className="Qimg" src={QubitsQ} alt="Logo" onClick={() => navigate('dashboard')} />
        }
      </Box>
      {navData.map((navItem, index) => {
        const isMainExpanded = expanded === navItem.label;
        if (navItem.type == 'category' && type !== "drawer")
          return <Typography variant="h5" component="span" sx={{ color: '#70809a', marginLeft: '10px', fontWeight: '400' }}>{navItem.label}</Typography>
        return (
          <React.Fragment key={index}>
            <Box onClick={() => handleExpandClick(navItem)} className={`navMainText ${isMainExpanded ? 'selectedText' : ''}`}>
              <Box style={{ display: 'flex', displayDirection: 'row', alignItems: 'center' }}>
                {!sideMenuToggle ? (
                  <Tooltip title={navItem.label}>
                    <img src={navItem.icon} alt={navItem.label} />
                  </Tooltip>
                ) : (
                  <img src={navItem.icon} alt={navItem.label} />
                )}
                {sideMenuToggle && <Typography variant="h5" component="span" sx={{ color: isMainExpanded ? '#3bc0c3' : '#70809a', marginLeft: type !== "drawer" ? '10px' : 0, fontWeight: '400' }}>{navItem.label}</Typography>}
              </Box>
              {navItem.subLable && (isMainExpanded ? <MdOutlineExpandLess size={20} /> : <MdExpandMore size={20} />)}
            </Box>

            {navItem.subLable && (
              <Collapse in={isMainExpanded} timeout="auto" unmountOnExit>
                <ul className="menuList">
                  {navItem?.subMenu?.map((sub, ind) => {
                    return (
                      <SubMenuBlock
                        key={ind}
                        sub={sub}
                        submenuExpanded={submenuExpanded}
                        sideMenuToggle={sideMenuToggle}
                        type={type}
                        onSubClick={handleExpandSubClick}
                        onLinkClick={handleClick}
                      />
                    )
                  })}

                  {navItem?.subLable?.map((sub, i) => (
                    <NavLinkItem key={i} item={sub} sideMenuToggle={sideMenuToggle} type={type} onClick={handleClick} />
                  ))}
                </ul>
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default Sidebar;