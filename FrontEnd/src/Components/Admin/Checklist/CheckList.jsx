import React, { useState, useEffect, useRef } from 'react';
import axiosService from '../../Axios/Axios';
import Swal from 'sweetalert2';
import { FaChevronLeft, FaChevronRight, FaEdit, FaTrash } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import './CheckList.css'
import SideMenu from '../../Common/SideMenu/SideMenu';
export const CheckList = () => {
  const [permitCode, setPermitCode] = useState('');
  const [permitQCode, setPermitQCode] = useState('');
  const [question, setQuestion] = useState('');
  const [permitValues, setPermitValues] = useState([]);
  const [permitQuesValues, setPermitQuesValues] = useState([]);
  const [questions, setQuestions] = useState([]);
  const modalRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);


  useEffect(() => {
    fetchPermitValues();
  }, []);

  const fetchPermitValues = async () => {
    try {
      const permitValuesResponse = await axiosService.getallPermittype();
      setPermitValues(permitValuesResponse.data);
      setPermitQuesValues(permitValuesResponse.data);
    } catch (error) {
      console.error('Error fetching permit values:', error);
    }
  };

  const handlePermitTypeChange = (event) => {
    setPermitCode(event.target.value);
  };

  const handlePermitQueTypeChange = (event) => {
    setPermitQCode(event.target.value);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const fetchQuestions = async () => {
    try {
      if (!permitQCode) return; 
      const questionsResponse = await axiosService.getQuestions(permitQCode);
      setQuestions(questionsResponse.data);
      setTotalCount(questionsResponse.data.length);
      console.log("questionsResponse", questionsResponse);
      console.log("questionsResponse.data", questionsResponse.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        permitCode,
        question
      };
      await axiosService.AddQuestions(formData);
      Swal.fire({
        icon: 'success',
        title: 'Checklist Created Successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error submitting form data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add checklist. Please try again later.',
      });
    }
  };


  const handleEdit = async (userId) => {
    try {
      const user = await axiosService.getQuesbyId(userId);
      console.log("user", user.getby_Id);
      setSelectedUser(user.getby_Id);
      openModal();
    } catch (error) {
      console.error("Error Fetching Checklist Details");
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
      await axiosService.updateQuestion(selectedUser._id, selectedUser);
      closeModal();
      Swal.fire({
        icon: 'success',
        title: 'Checklist Question Updated Successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Error updating Questions details");
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
        await axiosService.DeleteQuestion(userId);
        setUser(user.filter(user => user._id !== userId));
        Swal.fire(
          'Deleted!',
          'Checklist Question  has been deleted Successfully.',
          'success'
        );
      }
    } catch (error) {
      console.error("Error deleting Checklist");
    }
  };



  useEffect(() => {
    setPageCount(Math.ceil(questions.length / perPage));
  }, [questions, perPage]);


  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handlePageSizeChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(0);
  };


  const offset = currentPage * perPage;
  const currentPageData = questions.slice(offset, offset + perPage);
  
  return (
    <>
      <SideMenu />
      <div className="d-flex justify-content-center ">
        <div className="card" style={{ width: '50rem' }}>
          <div className="card-body">
            <h5 className="card-title">Add CheckList Form</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="permit">Permit Type</label>
                    <select
                      className="form-control"
                      id="permit"
                      value={permitCode}
                      onChange={handlePermitTypeChange}
                      required
                    >
                      <option value="">Select Permit Type</option>
                      {permitValues.map((permit) => (
                        <option key={permit.permitCode} value={permit.permitCode}>
                          {permit.permittypeName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="question">Question</label>
                    <textarea
                      className="form-control"
                      id="question"
                      rows="3"
                      value={question}
                      onChange={handleQuestionChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row justify-content-end">
                <div className="col-md-2 text-right pt-3">
                  <button type="submit" className="btn btn-dark">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center pt-5 ">
        <div className="card w-50">
          <div className="card-body">
            <h3>CheckList</h3>

            <div className="row">
              <div className="col-lg-4">
              <div className="page-size-selector col-lg-8">
              <label htmlFor="pageSize">Per Page:</label>
              <select id="pageSize" className="form-select" onChange={handlePageSizeChange} value={perPage}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
            </div>
              </div>
              <div className="col-lg-4">
                <label htmlFor="permitSelect">Select Permit</label>
                <select
                  className="form-select"
                  id="permitSelect"
                  value={permitQCode}
                  onChange={handlePermitQueTypeChange}
                >
                  <option value="">Select Permit</option>
                  {permitQuesValues.map((permit) => (
                    <option key={permit.permitCode} value={permit.permitCode}>
                      {permit.permittypeName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-4">
                <button
                  className="btn btn-secondary mt-4"
                  onClick={fetchQuestions}
                  disabled={!permitQCode}
                >
                  Fetch Questions
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                {questions.length > 0 && (
                  <div className="table-responsive pt-4">
                    <table className="table table-bordered mt-3">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Question</th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPageData.map((question, index) => (
                          <tr key={question._id}>
                            <td>{index + 1}</td>
                            <td>{question.question}</td>
                            <td>
                              <button type='button' className='btn btn-primary'>
                                <FaEdit onClick={() => handleEdit(question._id)} />
                              </button>
                            </td>
                            <td>
                              <button type='button' className='btn btn-danger'>
                                <FaTrash onClick={() => handleDelete(question._id)} />
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
                )}
                {questions.length === 0 && permitQCode && (
                  <div>Click The Button to Fetch Questions</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>



      <div ref={modalRef} className="modal" style={{ display: "none" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Edit CheckList Questions</h3>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label><span className='clrs'>Questions</span></label>
                    <textarea
                      type="text"
                      name="question"
                      className="form-control"
                      placeholder="Question"
                      value={selectedUser ? selectedUser.question : ""}
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
