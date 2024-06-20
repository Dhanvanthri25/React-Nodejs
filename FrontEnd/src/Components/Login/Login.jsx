import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axiosService from '../Axios/Axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { login } from '../../Auth/Auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosService.Login(email, password);

      // Check if the user's role is "Admin" before dispatching the login action
      if (response.user.role === 'Admin') {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('user', JSON.stringify(response.user));
  
        dispatch(login({ user: response.user, role: response.user.role }));
  
        navigate('/Dashboard');
      } else {
        // Notify user that only Admins can log in
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Only users with Admin role can log in.',
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'An error occurred while trying to login. Please try again later.',
      });
    }
  };

  return (
    <>
      <div className='bodys'>
        <div className="container ">
          <div className="screen">
            <div className="screen__content">
              <form className="login">
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input
                    type="text"
                    className="login__input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="login__input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn pass"
                    onClick={togglePasswordVisibility}
                  >
                    <i className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
                <button type="submit" className="button login__submit" onClick={handleLogin}>
                  <span className="button__text">Log In Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </form>
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
