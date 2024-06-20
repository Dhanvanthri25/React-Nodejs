import React, { useEffect } from 'react';
import './SideMenu.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  FaUserFriends, FaRegAddressCard, FaPowerOff } from 'react-icons/fa';
import { IoPersonAddSharp } from "react-icons/io5";
import { MdLibraryAdd } from "react-icons/md";
import { MdOutlineAddchart } from "react-icons/md";
import { CgPlayListAdd } from "react-icons/cg";
import { AiFillHome, AiTwotoneSchedule } from "react-icons/ai";
import { logout } from '../../../Auth/Auth';


const SideMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const toggleNav = () => {
      const htmlElement = document.querySelector('html');
      const navToggle = document.querySelector('.nav-toggle');
      htmlElement.classList.toggle('openNav');
      navToggle.classList.toggle('active');
    };

    const navToggleBtn = document.querySelector('.nav-toggle');
    if (navToggleBtn) {
      navToggleBtn.addEventListener('click', toggleNav);
    }

    return () => {
      if (navToggleBtn) {
        navToggleBtn.removeEventListener('click', toggleNav);
      }
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
    
    <div>
      <div className="primary-nav">
        <button className="hamburger open-panel nav-toggle">
          <span className="screen-reader-text">Menu</span>
        </button>
        <nav role="navigation" className="menu">
          <a className="logotype">ADMIN<span>Pannel</span></a>
          <div className="overflow-container">
            <ul className="menu-dropdown">
            <li>
                <Link to="/Dashboard">Dashboard</Link><span className="icon"><AiFillHome  /></span>
              </li>
              <li>
                <Link to="/Register">Register User</Link><span className="icon"><IoPersonAddSharp /></span>
              </li>
              <li>
                <Link to="/UserList">User List</Link><span className="icon"><FaUserFriends  /></span>
              </li>
              <li>
                <Link to="/RoleForm">Manage Roles</Link><span className="icon"><MdLibraryAdd /> </span>
              </li>
              <li>
                <Link to="/Permittype">Enroll Permittype</Link><span className="icon"><MdOutlineAddchart/></span>
              </li>
              <li>
                <Link to="/Description">Description Management</Link><span className="icon"><AiTwotoneSchedule /></span>
              </li>
              <li>
                <Link to="/CheckList">CheckList Management</Link><span className="icon"><CgPlayListAdd   /></span>
              </li>


              <li className="menu-hasdropdown">
                <a >Settings</a><span className="icon"><i className="fa fa-gear"></i></span>
                <label title="toggle menu" htmlFor="settings">
                  <span className="downarrow"><i className="fa fa-caret-down"></i></span>
                </label>
                <input type="checkbox" className="sub-menu-checkbox" id="settings" />
                <ul className="sub-menu-dropdown">
                  <li>
                     <Link to="/Profile">Profie</Link><span className="icon"><FaRegAddressCard   /></span>
                  </li>
                  <li>
                  <a onClick={handleLogout}>Logout</a><span className="icon"><FaPowerOff /></span>
                  </li>

                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>


    </>
  );
}

export default SideMenu;
