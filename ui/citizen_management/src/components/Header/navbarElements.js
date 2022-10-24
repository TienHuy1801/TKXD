import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Nav = styled.nav`
  background: #fff;
  height: 10vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.5rem;
  z-index: 10;
`;

const NavLink = styled(Link)`
  color: #505256;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &:hover {
    color: #000;
  }

  &.active {
    color: #000;
  }
`;

const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 1068px) {
    display: flex;
    color: #000;
    margin-left: 2rem;
    transform: translate(-100%, 75%);
    font-size: 1rem;
    cursor: pointer;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  margin-right: 12px;

  @media screen and (max-width: 1068px) {
    display: none;
  }
`;

const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-left: 1rem;

  @media screen and (max-width: 1068px) {
    display: none;
  }
`;

const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #f1f2f4;
  padding: 10px 22px;
  color: #505256;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #dcdcdc;
    color: #000;
  }
`;

export { Nav, NavBtn, NavBtnLink, NavLink, NavMenu, Bars };
