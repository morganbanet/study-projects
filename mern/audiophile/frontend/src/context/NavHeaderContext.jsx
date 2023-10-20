import React from 'react';
import { createContext, useState } from 'react';
import axios from 'axios';

const NavHeaderContext = createContext();

function NavHeaderProvider({ children }) {
  const bodyEl = document.querySelector('body');

  const handleDrawer = (scrollRef, overlayRef, drawerRef, cartRef) => {
    if (!drawerRef.current.classList.contains('visible')) {
      drawerRef.current.classList.add('visible');
      overlayRef.current.classList.add('visible');
      scrollRef.current.classList.add('visible');
      bodyEl.classList.add('no-scroll');
      cartRef.current.classList.remove('visible');
    } else {
      drawerRef.current.classList.remove('visible');
      overlayRef.current.classList.remove('visible');
      scrollRef.current.classList.remove('visible');
      bodyEl.classList.remove('no-scroll');
    }

    scrollRef.current.scrollTop = 0;
  };

  const handleCart = (scrollRef, overlayRef, drawerRef, cartRef) => {
    if (!cartRef.current.classList.contains('visible')) {
      cartRef.current.classList.add('visible');
      overlayRef.current.classList.add('visible');
      scrollRef.current.classList.add('visible');
      bodyEl.classList.add('no-scroll');
      drawerRef.current.classList.remove('visible');
    } else {
      cartRef.current.classList.remove('visible');
      overlayRef.current.classList.remove('visible');
      scrollRef.current.classList.remove('visible');
      bodyEl.classList.remove('no-scroll');
    }

    scrollRef.current.scrollTop = 0;
  };

  const exitMenuItems = (scrollRef, overlayRef, drawerRef, cartRef) => {
    cartRef.current.classList.remove('visible');
    overlayRef.current.classList.remove('visible');
    drawerRef.current.classList.remove('visible');
    scrollRef.current.classList.remove('visible');
    bodyEl.classList.remove('no-scroll');

    scrollRef.current.scrollTop = 0;
  };

  return (
    <NavHeaderContext.Provider
      value={{
        handleDrawer,
        handleCart,
        exitMenuItems,
      }}
    >
      {children}
    </NavHeaderContext.Provider>
  );
}

export { NavHeaderContext, NavHeaderProvider };
