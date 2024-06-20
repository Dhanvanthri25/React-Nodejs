import React, { useState, useEffect, useRef } from 'react';
import axiosService from '../../Axios/Axios';
import './RoleForm.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import SideMenu from '../../Common/SideMenu/SideMenu';

export const RoleForm = () => {

    const [user, setUser] = useState([]);
    const [role , setRole] = useState('');
    const [roleDescription, setRoleDescription] = useState('');
    const [roles, setRoles] = useState([]);
    const modalRef = useRef(null);
    const [selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const rolesData = await axiosService.getRoles();
            console.log(rolesData.roles)
            setRoles(rolesData.roles);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
          const roleData = {
              role: role,
              roleDescription: roleDescription
          };
          const response = await axiosService.addRole(roleData);
          console.log('Role added successfully:', response);
          setRole('');
          setRoleDescription('');
          fetchRoles(); 
  
          Swal.fire({
            icon: 'success',
            title: 'Role Created Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
  
      } catch (error) {
          console.error('Error adding role:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to add role. Please try again later.',
          });
      }
  };
  

    const handleEdit = async (userId) => {
        try {
          const user = await axiosService.getRolebyid(userId);
          console.log(user.role)
          setSelectedUser(user.role);
          openModal();
        } catch (error) {
          console.error("Error Fetching User Details");
        }
      };

      const openModal = () => {
        modalRef.current.style.display = "block";
      };
    
      const closeModal = () => {
        modalRef.current.style.display = "none";
      };


      const handleInputChange = (e) => {
        setSelectedUser({
          ...selectedUser,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSaveChanges = async () => {
        try {
          await axiosService.updateRoleById(selectedUser._id, selectedUser);
          closeModal();
          Swal.fire({
            icon: 'success',
            title: 'User Updated Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error) {
          console.error("Error updating user details");
        }
      };


      const handleDelete = async (userId) => {
        try {
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          });
    
          if (result.isConfirmed) {
            await axiosService.deleteRoleById(userId);
            setUser(user.filter(user => user._id !== userId));
            Swal.fire(
              'Deleted!',
              'Role has been deleted Successfully.',
              'success'
            );
          }
        } catch (error) {
          console.error("Error deleting user");
        }
      };

    return (
        <>
        <SideMenu/>

        <div className='d-flex justify-content-center pt-5  '>
                <div className="card ">
                    <div className="card-body">
                        <form onSubmit={handleFormSubmit}>
                            <div className='row'>
                                <h3>Add Role</h3>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label htmlFor="roleName">Role Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="role"
                                            placeholder="Enter role name"
                                            
                                            onChange={(e) => setRole(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='row justify-content-end'>
                                <div className='col-md-2 text-right'>
                                    <button type="submit" className="btn btn-dark ">Submit</button>
                                </div>
                            </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center pt-5 '>
                <div className="card ">
                    <div className="card-body">
                        <h3>Roles</h3>
                        <div className="table-responsive">
                            <table className="table  table-bordered">
                                <thead>
                                    <tr>
                                      <th>Role Id</th>
                                        <th>Role Name</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map((role, index) => (
                                        <tr key={index}>
                                            <td>{role.roleId}</td>
                                            <td>{role.role}</td>
                                            <td>
                                                <button type='button' className='btn btn-primary'>
                                                    <FaEdit onClick={() => handleEdit(role._id)}/>
                                                </button>
                                                </td>
                                                <td>
                                                <button type='button' className='btn btn-danger'>
                                                    <FaTrash onClick={() => handleDelete(role._id)} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
            </div>

            <div ref={modalRef} className="modal" style={{ display: "none" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Edit Role Details</h3>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label><span className='clrs'>Role Name</span></label>
                    <input
                      type="text"
                      name="role"
                      className="form-control"
                      placeholder="Role"
                      value={selectedUser ? selectedUser.role : ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>


            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveChanges}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
   

        </>
    );
};
