import React, { useEffect, useRef, useState } from 'react';
import axiosService from '../../Axios/Axios';
import { FaChevronLeft, FaChevronRight, FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './PermitType.css';
import ReactPaginate from 'react-paginate';
import SideMenu from '../../Common/SideMenu/SideMenu';

export const Permittype = () => {

  const [permittype, setPermittype] = useState('');
  const [permitcode, setPermitcode] = useState('');
  const [permit, setPermit] = useState([]);
  const modalRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const permitData = {
        permittypeName: permittype,
        permitCode: permitcode
      };
      const response = await axiosService.addPermitType(permitData);
      console.log('Permit Added Successfully:', response);
      setPermittype('');
      setPermitcode('');


      Swal.fire({
        icon: 'success',
        title: 'Permit Added Successfully!',
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      console.error('Error Adding permitype', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add permit. Please try again later.',
      });
    }
  };


  const getAllpermit = async () => {
    try {
      const allpermitlist = await axiosService.getallPermittype();
      console.log("AllPermitdata", allpermitlist.data);
      setPermit(allpermitlist.data);
      
      
      
      setTotalCount(allpermitlist.data.length)

    } catch (error) {
      console.error('Error While Fetching AllPermits', error);
    }
  };


  const getPermitbyid = async (userId) => {
    try {
      const permitbyid = await axiosService.getPermitbyId(userId);
      console.log("permitbyId", permitbyid.data);
      setSelectedUser(permitbyid.data);
      openModal();
    } catch (error) {
      console.error("Error while fetching permittypename by id", error);
    };
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
      await axiosService.updatepermit(selectedUser._id, selectedUser);
      closeModal();
      Swal.fire({
        icon: 'success',
        title: 'Permit Details Updated Successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Error updating permit details");
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
        await axiosService.deletepermit(userId);
        setUser(user.filter(user => user._id !== userId));
        Swal.fire(
          'Deleted!',
          'Permit has been deleted Successfully.',
          'success'
        );
      }
    } catch (error) {
      console.error("Error deleting user");
    }
  };



  useEffect(() => {
    getAllpermit();
  }, [])


  useEffect(() => {
    setPageCount(Math.ceil(permit.length / perPage));
  }, [permit, perPage]);


  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handlePageSizeChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };


  const offset = currentPage * perPage;
  const currentPageData = permit.slice(offset, offset + perPage);



  return (
    <>
      <SideMenu />
      <div className="d-flex justify-content-center  ">
        <div className="card" style={{ width: '50rem' }}>
          <div className="card-body">
            <h5 className="card-title">Permit Type Form</h5>
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="permittypeName" className="form-label">Permit Type Name</label>
                    <input type="text"
                      className="form-control"
                      id="permittypeName"
                      placeholder="Enter permit type name"
                      onChange={(e) => setPermittype(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="permitCode" className="form-label">Permit Code</label>
                    <input type="text"
                      className="form-control"
                      id="permitCode"
                      placeholder="Enter permit code"
                      onChange={(e) => setPermitcode(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>



              <div className='row justify-content-end'>
                <div className='col-md-2 text-right'>
                  <button type="submit" className="btn btn-dark ">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>



      <div className='d-flex justify-content-center pt-5 '>
        <div className="card wid">
          <div className="card-body">
            <h3>PermitLists</h3>
            <div className="page-size-selector col-lg-3">
              <label htmlFor="pageSize">Per Page:</label>
              <select id="pageSize" className="form-select" onChange={handlePageSizeChange} value={perPage}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
            <div className="table-responsive">
              <table className='table tab;e-dark table-bordered'>
                <thead className='text-center'>
                  <tr>
                    <th>Permittype Name</th>
                    <th>Permittype Code</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {currentPageData.map((permit, index) => (
                    <tr key={index}>
                      <td>{permit.permittypeName}</td>
                      <td>{permit.permitCode}</td>
                      <td>
                        <button type='button' className='btn btn-primary'>
                          <FaEdit
                            onClick={() => getPermitbyid(permit._id)}
                          />
                        </button>
                      </td>
                      <td>
                        <button type='button' className='btn btn-danger'>
                          <FaTrash
                            onClick={() => handleDelete(permit._id)}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={2}
                  pageClassName={"pagination__box"}
                />
              </div>
              <div className="total-count">
                  Total Count:<span className='tex'> {totalCount}</span>
                </div>
            </div>
          </div>
        </div>
      </div>



      <div ref={modalRef} className="modal" style={{ display: "none" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Edit Permit Details</h3>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label><span className='clrs'>Permit Name</span></label>
                    <input
                      type="text"
                      name="permittypeName"
                      className="form-control"
                      placeholder="PermittypeName"
                      value={selectedUser ? selectedUser.permittypeName : ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label><span className='clrs'>permit Code</span></label>
                    <textarea
                      name="permitCode"
                      className="form-control"
                      placeholder="PermitCode"
                      value={selectedUser ? selectedUser.permitCode : ""}
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
