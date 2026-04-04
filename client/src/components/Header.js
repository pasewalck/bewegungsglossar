import React from 'react';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const Header = ({ isMobile }) => {
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default Header;
