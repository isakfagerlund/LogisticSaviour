import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = () => (
  <StyledHeader>
    <p>Logistic App</p>
  </StyledHeader>
);

export default Header;
