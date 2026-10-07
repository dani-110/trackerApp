import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import "./header.scss";
import { AiOutlineMenu } from "react-icons/ai";
import qorbitoMark from "../../assests/qorbito-modern-flow-mark-final.png";
import { ThemeSelectorContext } from "../../store/context/themeSelectore";
import ThemeToggle from "../../components/themeToggle";
import {
  Search,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  LogOut,
  UserShield,
  UsersRound,
  UserKey,
  Rows4,
  Boxes
} from "lucide-react";
import UserSetting from "../../components/userSetting/userSetting";
import { useDispatch, useSelector } from "react-redux";
// import { useTheme } from "@emotion/react";
import { navBar } from "../sidebar/_profileNav";
import { logout } from "../../store/actions/auth";
import {
  LuActivity,
  LuBuilding2,
  LuLayoutDashboard,
  LuScrollText,
  LuUsers,
} from "react-icons/lu";
import { LuTicket } from "react-icons/lu";
import { WiTime3 } from "react-icons/wi";
import { LuShieldCheck } from "react-icons/lu";

import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const themeCtxt = useContext(ThemeSelectorContext);

  const [profileMenu, setProfileMenu] = useState(false);

  const displayName = user?.name || user?.fullName || user?.username || "";

  const userRole =
    user?.role?.name || user?.roleName || user?.roles?.[0]?.name || "";

  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const [tab, setTab] = useState(navBar[0].label);
  const [subTab, setSubTab] = useState(
    navBar.find((val) => val.label == tab).subTab[0].label,
  );

  useEffect(() => {
    setSubTab(navBar.find((val) => val.label == tab).subTab[0].label);
    navigate(navBar.find((val) => val.label == tab).subTab[0].url);
  }, [tab]);
  const logoutAction = () => {
    let obj = {};
    themeCtxt.themeSelectorHandler(false);
    dispatch(logout(obj));
  };
  const subTabChange = (url, label) => {
    setSubTab(label);
    navigate(url);
  };

  const renderIcon = (iconName, isSelected, size) => {
    console.log(iconName, isSelected);
    const activeColor = "#ffff";
    const inactiveColor = "#8699ad";

    const currentColor = isSelected ? activeColor : inactiveColor;

    switch (iconName) {
      case "LuLayoutDashboard":
        return <LuLayoutDashboard color={currentColor} size={size} />;
      case "LuTicket":
        return <LuTicket color={currentColor} size={size} />;
      case "WiTime3":
        return <WiTime3 color={currentColor} size={size} />;
      case "LuShieldCheck":
        return <LuShieldCheck color={currentColor} size={size} />;
      case "LuActivity":
        return <LuActivity color={currentColor} size={size} />;
      case "LuUsers":
        return <LuUsers color={currentColor} size={size} />;
      case "LuBuilding2":
        return <LuBuilding2 color={currentColor} size={size} />;
      case "LuScrollText":
        return <LuScrollText color={currentColor} size={size} />;
      case "UserShield":
        return <UserShield color={currentColor} size={size} />;
      case "UsersRound":
        return <UsersRound color={currentColor} size={size} />;
      case "UserKey":
        return <UserKey color={currentColor} size={size} />;
      case "Rows4":
        return <Rows4 color={currentColor} size={size} />;
      case "Boxes":
        return <Boxes color={currentColor} size={size} />;
    }
  };

  function QOrbitoLogo() {
    return (
      <Box className={`qorbitoLiveLogo`}>
        <img src={qorbitoMark} alt="" aria-hidden="true" />
        <span className="qorbitoLiveWord">
          <span className="qorbitoTitle">Orbito</span>
          <span className="qorbitoSubtitle">Work in motion.</span>
        </span>
      </Box>
    );
  }

  return (
    <>
      <Box className="headerContainer">
        {QOrbitoLogo()}
        <Box sx={{ display: "flex", gap: "10px", margin: "0px 10px" }}>
          {navBar.map((val) => (
            <Box
              className={`tab ${tab == val.label && "activeTab"}`}
              onClick={() => setTab(val.label)}
              sx={{ cursor: "pointer" }}
            >
              {renderIcon(val.icon, tab === val.label, 20)}
              <Typography sx={{ color: tab == val.label ? "#fff" : "#9aa9d6" }}>
                {val.label}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box className="headerRight">
          <Box className="globalSearch">
            <Search size={16} />
            <input placeholder="Search or jump to..." aria-label="Search" />
            <kbd>Ctrl K</kbd>
          </Box>

          <button
            type="button"
            className="themeToggle"
            title={
              themeCtxt.themeSelector
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            aria-label="Toggle color theme"
            onClick={() =>
              themeCtxt.themeSelectorHandler(!themeCtxt.themeSelector)
            }
          >
            {themeCtxt.themeSelector ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button type="button" className="bell" aria-label="Notifications">
            <Bell size={18} />
          </button>

          <Box className="profileMenuWrap">
            <button
              type="button"
              className={`userMenu ${profileMenu ? "open" : ""}`}
              onClick={() => setProfileMenu((open) => !open)}
              aria-expanded={profileMenu}
            >
              <span className="avatar">{initials}</span>
              <Box className="userMenuText">
                <strong>{displayName}</strong>
                <span>{userRole}</span>
              </Box>
              <ChevronDown size={14} />
            </button>

            {profileMenu && (
              <Box className="profileDropdown">
                <Box className="profileDropdownHead">
                  <span className="avatar">{initials}</span>

                  <Box className="profileDropdownUser">
                    <strong>{displayName}</strong>
                    <span>
                      {[user?.username, userRole].filter(Boolean).join(" · ")}
                    </span>
                  </Box>
                </Box>

                <button
                  type="button"
                  className="profileDropdownItem"
                  onClick={() => setProfileMenu(false)}
                >
                  <Box className="profileDropdownIcon">♙</Box>
                  <Box className="profileDropdownUser">
                    <strong>My profile</strong>
                    <span>Account and preferences</span>
                  </Box>
                </button>

                <Box className="profileDropdownDivider" />

                <button
                  type="button"
                  className="profileDropdownItem profileDropdownSignOut"
                  onClick={() => {
                    setProfileMenu(false);
                    logoutAction();
                  }}
                >
                  <LogOut size={16} />
                  <Box className="profileDropdownUser">
                    <strong>Sign out</strong>
                    <span>End this session</span>
                  </Box>
                </button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box className="subTabBar">
        {navBar
          .find((val) => val.label == tab)
          .subTab.map((ele) => (
            <Box
              className={`subTab ${subTab == ele.label && "activeSubTab"}`}
              onClick={() => subTabChange(ele.url, ele.label)}
              sx={{ cursor: "pointer" }}
            >
              {renderIcon(ele.icon, subTab === ele.label, 20)}
              <Typography
                sx={{ color: subTab == ele.label ? "#fff" : "#9aa9d6" }}
              >
                {ele.label}
              </Typography>
            </Box>
          ))}
      </Box>
    </>
  );
};

export default Header;
