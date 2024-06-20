import React, { useEffect, useRef, useState } from 'react'
import axiosService from '../../Axios/Axios';
import Swal from 'sweetalert2';
import "./UserList.css";
import { FaChevronLeft, FaChevronRight, FaDownload, FaEdit, FaTrash } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import SideMenu from '../../Common/SideMenu/SideMenu';

export const UserList = () => {


  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const modalRef = useRef(null);
  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCount, setFilteredCount] = useState(0);


  const getallusers = async () => {
    try {
      const response = await axiosService.getallUsers();
      console.log(response);
      setUser(response.users);
      setTotalCount(response.users.length); 

    } catch (error) {
      console.error("Error Fetching All User List")
    };
  };

  const getRoles = async () => {
    try {
      const response = await axiosService.getRoles();
      setRoles(response.roles);
    } catch (error) {
      console.error("Error Fetching Roles");
    }
  }
  useEffect(() => {
    getallusers();
    getRoles();
  }, [])

  useEffect(() => {
    setPageCount(Math.ceil(user.length / perPage));
  }, [user, perPage])


  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handlePageSizeChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };

  const offset = currentPage * perPage;
  const currentPageData = user.slice(offset, offset + perPage);

  const handleSearch = () => {

    const filteredUsers = user.filter((user) => {
      return (
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobileNumber.includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setUser(filteredUsers);
    setFilteredCount(filteredUsers.length);
  };


  const handlefilInputChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleExport = () => {
    const filteredData = user.map(user => {
      return {
        'User ID': user.userid,
        'Username': user.username,
        'Mobile Number': user.mobileNumber,
        'Email': user.email,
        'Role': user.role,
        'CompanyName': user.companyName,
        'Status': user.status
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'User Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'user_data.xlsx');
  };

  const handleEdit = async (userId) => {
    try {
      const user = await axiosService.getUserById(userId);
      console.log(user.user._id)
      console.log("user", user.user)
      console.log("userssss", user)
      setSelectedUser(user.user);
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
      await axiosService.updateUserById(selectedUser._id, selectedUser);
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
        await axiosService.deleteUserById(userId);
        setUser(user.filter(user => user._id !== userId));
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    } catch (error) {
      console.error("Error deleting user");
    }
  };

  return (
    <>
      <SideMenu />
      
      <div className='containerss'>
        <div className="card cd">
          <div className="card-body">
            <h3>User Management</h3>
            <div className='row'>
              <div className="col-lg-7">
                <div className="page-size-selector col-lg-3">
                  <label htmlFor="pageSize">Page Size:</label>
                  <select id="pageSize" className="form-select" onChange={handlePageSizeChange} value={perPage}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="search-container d-flex pt-3  ms-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handlefilInputChange}
                  />
                  <button className="btn btn-dark " onClick={handleSearch}>Search</button>
                </div>
              </div>
              <div className="col-lg-1 pt-3">
              <button className="btn btn-dark " onClick={handleExport}><FaDownload /> </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table  table-bordered ">
                <thead className="thead-dark">
                  <tr>
                    <th>User ID</th>
                    <th>UserName</th>
                    <th>MobileNumber</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>CompanyName</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map(user => (
                    <tr key={user._id}>
                      <td>{user.userid}</td>
                      <td>{user.username}</td>
                      <td>{user.mobileNumber}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{user.companyName}</td>
                      <td>{user.status}</td>
                      <td>
                        <button type='button' className='btn btn-primary'>
                          <FaEdit
                            onClick={() => handleEdit(user._id)}
                          />
                        </button>
                      </td>
                      <td>
                        <button type='button' className='btn btn-danger'>
                          <FaTrash
                            onClick={() => handleDelete(user._id)}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination-container">
              <ReactPaginate
                previousLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__prev-next"}
                nextLinkClassName={"pagination__prev-next"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                breakLabel={"..."}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageClassName={"pagination__box"}
              />


            </div>
            <div className="total-count">
              Total Count:<span className='tex'> {filteredCount || totalCount}</span>
            </div>
          </div>

        </div>

      </div>




      <div ref={modalRef} className="modal" style={{ display: "none" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Edit User</h3>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label><span className='clrs'>User Name</span></label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Username"
                      value={selectedUser ? selectedUser.username : ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label><span className='clrs'>Mobile Number</span></label>
                    <input
                      type="text"
                      name="mobileNumber"
                      className="form-control"
                      placeholder="Mobile Number"
                      value={selectedUser ? selectedUser.mobileNumber : ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label><span className='clrs'>Email</span></label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={selectedUser ? selectedUser.email : ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label><span className='clrs'>Role</span></label>
                    <select
                      name="role"
                      className="form-control"
                      value={selectedUser ? selectedUser.role : ""}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Role</option>
                      {roles.map(role => (
                        <option key={role.roleId} value={role.role}>{role.role}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label><span className='clrs'>CompanyName</span></label>
                    <input
                      type="text"
                      name="companyName"
                      className="form-control"
                      placeholder="CompanyName"
                      value={selectedUser ? selectedUser.companyName : ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label><span className='clrs'>Status</span></label>
                    <input
                      type="text"
                      name="status"
                      className="form-control"
                      placeholder="Status"
                      value={selectedUser ? selectedUser.status : ""}
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
  )
}
