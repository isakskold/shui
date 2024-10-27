import React from "react";
import styled from "styled-components";
import useBurgerStore from "../../../hooks/nav/useBurgerStore";
import useMenuStore from "../../../hooks/nav/useMenuStore";
import HeaderLink from "./HeaderLink";

// Importing your PNG icons
import notificationsIcon from "../../../assets/icons/bell.png";
import profileIcon from "../../../assets/icons/profile.png";
import settingsIcon from "../../../assets/icons/settings.png";

const Menu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  height: calc(100vh - 70px);
  display: ${({ $isVisible }) => ($isVisible ? "flex" : "none")};
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background-color: #7a7a75;
  width: 7rem;
  z-index: 999;
  overflow-y: auto;
`;

const ListItem = styled.li`
  height: 3rem;
  width: 100%;
  border-bottom: 2px solid black;
`;

const MobileHeaderLink = styled(HeaderLink)`
  display: block; /* Make it behave like a block element */
  width: 100%; /* Fill the entire width of the ListItem */
  height: 100%; /* Fill the entire height of the ListItem */
  background-color: #0089ea;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconImage = styled.img`
  height: 32px; /* Adjust the size of the icons */
  width: 32px;
  padding-bottom: 0.2rem;
`;

const MobileMenu = () => {
  const isBurger = useBurgerStore((state) => state.isBurger);
  const setBurger = useBurgerStore((state) => state.setBurger);
  const isMenu = useMenuStore((state) => state.isMenu);
  const setMenu = useMenuStore((state) => state.setMenu);

  return (
    <Menu $isVisible={isBurger && isMenu}>
      <ListItem>
        <MobileHeaderLink to="/notifications">
          <IconImage src={notificationsIcon} alt="Notifications" />
        </MobileHeaderLink>
      </ListItem>
      <ListItem>
        <MobileHeaderLink to="/profile">
          <IconImage src={profileIcon} alt="Profile" />
        </MobileHeaderLink>
      </ListItem>
      <ListItem>
        <MobileHeaderLink to="/settings">
          <IconImage src={settingsIcon} alt="Settings" />
        </MobileHeaderLink>
      </ListItem>
    </Menu>
  );
};

export default MobileMenu;
