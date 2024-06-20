import React, { useEffect, useState } from 'react';
import './Register.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axiosService from '../../Axios/Axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import SideMenu from '../../Common/SideMenu/SideMenu';



export const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    mobileNumber: '',
    role: '',
    companyName: '',
    email: '',
    status: '',
  });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);


  const [roles, setRoles] = useState([]);




  const fetchRoles = async() => {
    try {
      const response = await axiosService.getRoles();
      console.log('Roles:', response.roles);
      setRoles(response.roles);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }


  useEffect(() => {
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.mobileNumber.length !== 10) {
      Swal.fire({
        icon : "error",
        title: 'Validation Failed',
        text: 'Mobile number should be 10 digits long',
      })
      return;
    }

    try {
      const response = await axiosService.Register(formData);
      console.log('Registration response:', response);
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'User registered successfully!',
        onClose: () => {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error('Error registering user:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Failed to register user. Please try again later.',
      });
    }
  };

  // const navigateToUserList = () => {
  //   navigate('/UserList')

  // };
  // const navigateToRole = () => {
  //   navigate('/RoleForm')

  // };



  return (
    <>

    <SideMenu/>
        <div className="containers">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card-body">
            <div className="card bg-white ">
              <div className="card-body">
                <div className='row'>
                  <div className='col-lg-8'>
                    <h2 className="card-title">Register A User</h2>
                  </div>
                  {/* <div className='col-lg-2'>
                    <button type='button'
                      className='btn btn-dark'
                      onClick={navigateToUserList}>UserList</button>
                  </div>
                  <div className='col-lg-2'>
                  <button type='button'
                      className='btn btn-dark'
                      onClick={navigateToRole}>Add Role</button>
                  </div> */}
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Password</label>
                        <div className="input-group">
                          <input type={showPassword ? "text" : "password"} className="form-control" name="password" value={formData.password} onChange={handleChange} />
                          <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={handlePasswordVisibility}>
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Mobile Number</label>
                        <input type="number" maxLength="10" className="form-control" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
                      </div>
                    </div>

                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Role</label>
                        <select className="form-control" name="role" value={formData.role} onChange={handleChange}>
                          <option value="">Select Role</option>
                          {roles.map((role) => (
                            <option key={role.roleId} value={role.role}>{role.role}</option>
                          ))}
                        </select>

                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" className="form-control" name="companyName" value={formData.companyName} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-md-4">
                  <div className="form-group">
                        <label>Status</label>
                        <select className="form-control" name="status" value={formData.status} onChange={handleChange}>
                          <option value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      </div>
                  </div>
                  <div className="row justify-content-end">
                    <div className="col-md-4 text-right">
                      <button type="submit" className="btn btn-dark">Register</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>

  );
};
