import React, {useEffect, useRef, useState, useCallback} from 'react';
import {Nav, Navbar} from 'rsuite';
import {FaBars, FaFile, FaFolderOpen, FaQuestion, FaRedo, FaSave, FaTimes, FaUndo} from 'react-icons/fa';
import {NavBtn} from './basic/NavBtn';

interface props {
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  isMobile: boolean;
  newFile: () => void;
  openFile: () => void;
  saveFile: () => void;
  openHelp: () => void;
  undo?: () => void;
  redo?: () => void;
}

const Header = React.forwardRef<HTMLInputElement, props>(
  ({undo, redo, fileName, setFileName, newFile, openFile, saveFile, openHelp, isMobile}, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const headerRef = useRef(null);

    // Handel Change File Name
    const handelChangeFileName = useCallback((input: string) => setFileName(input.replace(/[\\/:*?"<>|]/, '')), [fileName]);

    // Handel Menu
    useEffect(() => closeMenu(), [isMobile]);

    const toggleMenu = useCallback(() => {
      return isOpen ? closeMenu() : openMenu();
    }, [isOpen]);

    const openMenu = useCallback(() => {
      return setIsOpen(true);
    }, []);

    const closeMenu = useCallback(() => {
      headerRef.current.classList.add('header--close');
      setTimeout(() => {
        headerRef.current.classList.remove('header--close');
        setIsOpen(false);
      }, 500);
    }, []);

    const handelClick = useCallback((callback: () => void) => {
      callback();
      closeMenu();
    }, []);

    const NavPrefix = isMobile ? 'rs-nav-default rs-navbar-nav' : 'rs-nav rs-nav-default rs-navbar-nav rs-navbar-right rs-nav-horizontal';
    return (
      <header ref={headerRef}>
        <Navbar className='header' appearance='subtle'>
          <Navbar.Header>
            <input
              ref={ref}
              type='text'
              value={fileName}
              placeholder='File Name'
              maxLength={64}
              onChange={(e) => handelChangeFileName(e.currentTarget.value)}
            />
            <Nav>
              <NavBtn onClick={undo} icon={<FaUndo />} />
              <NavBtn onClick={redo} icon={<FaRedo />} />
              {isMobile && <NavBtn onClick={toggleMenu} icon={isOpen ? <FaTimes /> : <FaBars />} />}
            </Nav>
          </Navbar.Header>
          {(isOpen || !isMobile) && (
            <Navbar.Body>
              <Nav classPrefix={NavPrefix}>
                <NavBtn onClick={() => handelClick(newFile)} icon={<FaFile />} label='New File' />
                <NavBtn onClick={() => handelClick(openFile)} icon={<FaFolderOpen />} label='Open File' />
                <NavBtn onClick={() => handelClick(saveFile)} icon={<FaSave />} label='Save File' />
                <NavBtn onClick={() => handelClick(openHelp)} icon={<FaQuestion />} label='Help' />
                {isMobile && (
                  <NavBtn label='Code and Design by AvivAbachi@gmail.com' href='https://github.com/AvivAbachi/' target='_blank' />
                )}
              </Nav>
            </Navbar.Body>
          )}
        </Navbar>
        {isOpen && isMobile && <div className='header__backdrop' onClick={closeMenu} />}
      </header>
    );
  }
);

export default React.memo(Header);
