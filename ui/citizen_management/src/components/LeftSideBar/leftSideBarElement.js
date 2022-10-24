import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

const SideBar = styled.div`
  position: fixed;
  background: #606060;
  background-image: linear-gradient(to right, #484848, #909090);
  width: ${(props) => (props.size ? '80px' : '280px')};
  box-shadow: 0 60px 10px rgba(0, 0, 0, 0.4);
  height: 100%;
  transition: width 0.2s ease-in;

  @media screen and (max-width: 1100px) {
    width: 80px;
  }
`;

const SideBarLogo = styled(Link)`
  display: ${(props) => (props.size ? 'none' : '')};

  @media screen and (max-width: 1100px) {
    display: none;
  }
`;

const SideBarMenu = styled.div`
  display: block;
  align-items: center;
  justify-content: center;
  position: fixed;
  margin: 0;
  padding: 0.5rem 0.5rem;
  color: #fff;
  width: ${(props) => (props.size ? '80px' : '280px')};
  text-decoration: none;
  font-size: 15px;
  transition: position 0.2s ease-in;
  @media screen and (max-width: 1068px) {
    width: 50px;
  }
`;

const SideBarLink = styled(Link)`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: ${(props) => (props.size ? '0.5rem 0.5rem' : '0.5rem 1rem')};
  justify-content: ${(props) => (props.size ? 'center' : '')};
  text-decoration: none;
  width: 100%;
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0);
  transition: color 0.2s ease-in;
  transition: background 0.2s ease-in;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 1);
  }

  &.active {
    background: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 1);
    font-weight: 550;
  }
`;

const SideBarLabel = styled.div`
  display: ${(props) => (props.size ? 'none' : '')};
  padding: 0.5rem 0.5rem;
  margin: 0;
  background: none;
  transition: font-size 0.2s ease-in;
`;

const SideBarIcon = styled.span`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

const SideBarTag = styled.div`
  font-weight: 550;
  margin: 0.5rem 0;
  color: rgba(255, 255, 255, 0.7);
`;
export {
  SideBar,
  SideBarLink,
  SideBarMenu,
  SideBarLabel,
  SideBarLogo,
  SideBarIcon,
  SideBarTag,
};
