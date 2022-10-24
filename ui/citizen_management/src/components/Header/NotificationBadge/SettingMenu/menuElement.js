import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Menu = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0.5rem 0.5rem;
  color: #fff;
  width: 100%;
  text-decoration: none;
  font-size: 15px;
  transition: position 0.2s ease-in;
  @media screen and (max-width: 1068px) {
    width: 50px;
  }
`;

const SettingMenuLink = styled(Link)`
  display: flex;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  text-decoration: none;
  width: 100%;
  margin: 0;
  color: rgba(0, 0, 0, 0.7);
  background: rgba(255, 255, 255, 1);
  transition: color 0.2s ease-in;
  transition: background 0.2s ease-in;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 1);
  }

  &.active {
    background: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 1);
    font-weight: 550;
  }
`;

const SettingMenuLabel = styled.div`
  padding: 0.5rem 0.5rem;
  margin: 0;
  background: none;
  transition: font-size 0.2s ease-in;
`;

const SettingMenuIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

export { SettingMenuLink, Menu, SettingMenuLabel, SettingMenuIcon };
