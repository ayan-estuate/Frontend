"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderContainer,
  HeaderMenuButton,
  HeaderPanel,
  Switcher,
  SwitcherDivider,
  SwitcherItem,
} from "@carbon/react";
import {
  Logout,
  UserAvatar,
  Light,
  Moon,
  Help,
  Notification,
  SwitchLayer_2,
} from "@carbon/icons-react";
import { getUserFromToken, logout } from "@/api";
import { useTheme } from "@/context/ThemeContext";

const AppHeader = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [user, setUser] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [isSideNavReady, setIsSideNavReady] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const fetchUser = async () => {
        try {
          const username = await getUserFromToken(token);
          setUser(username);
        } catch (error) {
          console.error("Failed to fetch user details", error);
        }
      };

      fetchUser();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsSideNavReady(true);
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("theme");
    window.location.href = "/login";
  };

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="IBM IntelliSphere® Optim">
          <SkipToContent />
          <HeaderMenuButton
            aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName href="/" prefix="IBM">
            IntelliSphere® Optim
          </HeaderName>

          <HeaderNavigation aria-label="Main navigation">
            <HeaderMenuItem
              href="/profile/user/dashboard"
              className={isDarkMode ? "dark-theme" : "light-theme"}
            >
              Dashboard
            </HeaderMenuItem>
            <HeaderMenuItem href="/profile/user/dashboard">
              Products
            </HeaderMenuItem>
            <HeaderMenuItem href="/documentation">Documentation</HeaderMenuItem>
          </HeaderNavigation>

          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="Theme Toggle"
              onClick={toggleTheme}
              tooltipAlignment="end"
              className="theme-toggle"
            >
              {isDarkMode ? <Light size={20} /> : <Moon size={20} />}
            </HeaderGlobalAction>

            <HeaderGlobalAction
              aria-label="Notifications"
              tooltipAlignment="end"
              isActive={false}
            >
              <Notification size={20} />
            </HeaderGlobalAction>

            <HeaderGlobalAction
              aria-label="App Switcher"
              tooltipAlignment="end"
              isActive={isSwitcherOpen}
              onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
            >
              <SwitchLayer_2 size={20} />
            </HeaderGlobalAction>

            <div className="profile-container" ref={dropdownRef}>
              <HeaderGlobalAction
                aria-label="User Profile"
                tooltipAlignment="end"
                isActive={showDropdown}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <UserAvatar size={20} />
              </HeaderGlobalAction>

              {showDropdown && (
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <UserAvatar size={32} />
                    <p className="profile-name">{user}</p>
                  </div>
                  <SwitcherDivider />
                  <button
                    className="logout-button cds--btn cds--btn--ghost"
                    onClick={handleLogout}
                  >
                    <Logout size={16} /> Sign out
                  </button>
                </div>
              )}
            </div>
          </HeaderGlobalBar>

          <HeaderPanel aria-label="App Switcher" expanded={isSwitcherOpen}>
            <Switcher aria-label="App Switcher">
              <SwitcherItem aria-label="Dashboard" href="/dashboard">
                Dashboard
              </SwitcherItem>
              <SwitcherDivider />
              <SwitcherItem aria-label="Settings" href="/settings">
                Settings
              </SwitcherItem>
            </Switcher>
          </HeaderPanel>

          {isSideNavReady && (
            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              isPersistent={false}
            >
              <SideNavItems>
                {/* Add your side nav items here */}
                <></>
              </SideNavItems>
            </SideNav>
          )}
        </Header>
      )}
    />
  );
};

export default AppHeader;
