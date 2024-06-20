import React, { useState, useEffect, useRef } from 'react';
import axiosService from '../../Axios/Axios';
import Swal from 'sweetalert2';
import './Description.css';
import { FaChevronLeft, FaChevronRight, FaEdit, FaTrash } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import SideMenu from '../../Common/SideMenu/SideMenu';

const Description = () => {


    const [roles, setRoles] = useState([]);
    const [permits, setPermits] = useState([]);
    const [selectedPermitForm, setSelectedPermitForm] = useState('');
    const [selectedRoleForm, setSelectedRoleForm] = useState('');
    const [selectedPermitTable, setSelectedPermitTable] = useState('');
    const [selectedRoleTable, setSelectedRoleTable] = useState('');
    const [description, setDescription] = useState('');
    const [descriptions, setDescriptions] = useState([]);
    const [filteredDescriptions, setFilteredDescriptions] = useState([]);
    const modalRef = useRef(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);


    
    const fetchDescriptions = async () => {
        try {
            const descriptionsData = await axiosService.getalldescriptions();
            setDescriptions(descriptionsData.getalldes);
            setFilteredDescriptions(descriptionsData.getalldes);
            setTotalCount(descriptionsData.getalldes.length);
        } catch (error) {
            console.error('Error fetching descriptions:', error);
        }
    };

    const fetchRolesAndPermits = async () => {
        try {
            const rolesData = await axiosService.getRoles();
            const permitsData = await axiosService.getallPermittype();
            setRoles(rolesData.roles);
            setPermits(permitsData.data);
        } catch (error) {
            console.error('Error fetching roles and permits:', error);
        }
    };

    useEffect(() => {
        fetchDescriptions();
        fetchRolesAndPermits();
    }, []);

    useEffect(() => {
        setPageCount(Math.ceil(filteredDescriptions.length / perPage));
    }, [filteredDescriptions, perPage]);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handlePageSizeChange = (e) => {
        setPerPage(parseInt(e.target.value));
        setCurrentPage(0);
    };

    const handleEdit = async (userId) => {
        try {
            const user = await axiosService.getDesbyId(userId);
            setSelectedUser(user.getby_Id);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosService.addDescription({
                permittypeName: selectedPermitForm,
                role: selectedRoleForm,
                description: description
            });
            console.log("response", response);
            setSelectedPermitForm('');
            setSelectedRoleForm('');
            setDescription('');
            Swal.fire({
                icon: 'success',
                title: 'Description Added Successfully!',
                showConfirmButton: false,
                timer: 1500
            });
            fetchDescriptions();
        } catch (error) {
            console.error('Error adding description:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Add Description',
                text: 'Please try again later.'
            });
        }
    };

    const handleSaveChanges = async () => {
        try {
            await axiosService.updateDescription(selectedUser._id, selectedUser);
            closeModal();
            Swal.fire({
                icon: 'success',
                title: 'Description Updated Successfully!',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Error updating Description details");
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
                await axiosService.DeleteDescription(userId);
                setDescriptions(descriptions.filter(description => description._id !== userId));
                Swal.fire(
                    'Deleted!',
                    'Description has been deleted.',
                    'success'
                );
            }
        } catch (error) {
            console.error("Error deleting user");
        }
    };

    const handleInputChange = (e) => {
        setSelectedUser({
            ...selectedUser,
            [e.target.name]: e.target.value
        });
    };

    const handleFilter = () => {
        let filteredData = descriptions;
        if (selectedPermitTable !== '') {
            filteredData = filteredData.filter(description => description.permittypeName === selectedPermitTable);
        }
        console.log("filteredData" , filteredData)
        if (selectedRoleTable !== '') {
            filteredData = filteredData.filter(description => description.role === selectedRoleTable);
        }
        setFilteredDescriptions(filteredData);
        setCurrentPage(0);
        setTotalCount(filteredData.length);
    };

    return (
        <>
            <SideMenu />


            <div className='d-flex justify-content-center pt-5 '>
                <div className="card clss">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 col-10">
                                    <label htmlFor="permitname" className="form-label">Permit Name</label>
                                    <select
                                        className="form-select"
                                        id="permitname"
                                        value={selectedPermitForm}
                                        onChange={(e) => setSelectedPermitForm(e.target.value)}
                                    >
                                        <option value="">Select Permit</option>
                                        {permits && permits.map(permit => (
                                            <option key={permit.permittypeName} value={permit.permittypeName}>{permit.permittypeName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-lg-6 col-10">
                                    <label htmlFor="role" className="form-label">Role</label>
                                    <select
                                        className="form-select"
                                        id="role"
                                        value={selectedRoleForm}
                                        onChange={(e) => setSelectedRoleForm(e.target.value)}
                                    >
                                        <option value="">Select Role</option>
                                        {roles && roles.map(role => (
                                            <option key={role.roleId} value={role.role}>{role.role}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                            <div className='row justify-content-end'>
                                <div className='col-lg-3 col-5 text-right'>
                                    <button type="submit" className="btn btn-dark ">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-center pt-5'>
                <div className="card w-50">
                    <div className="card-body">
                        <h3>Description</h3>
                        <div className="page-size-selector col-lg-3">
                            <label htmlFor="pageSize">Per Page:</label>
                            <select id="pageSize" className="form-select" onChange={handlePageSizeChange} value={perPage}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-10">
                                <label htmlFor="permitFilter" className="form-label">Filter by Permit</label>
                                <select
                                    className="form-select"
                                    id="permitFilter"
                                    value={selectedPermitTable}
                                    onChange={(e) => setSelectedPermitTable(e.target.value)}
                                >
                                    <option value="">All</option>
                                    {permits && permits.map(permit => (
                                        <option key={permit.permittypeName} value={permit.permittypeName}>{permit.permittypeName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-4 col-10">
                                <label htmlFor="roleFilter" className="form-label">Filter by Role</label>
                                <select
                                    className="form-select"
                                    id="roleFilter"
                                    value={selectedRoleTable}
                                    onChange={(e) => setSelectedRoleTable(e.target.value)}
                                >
                                    <option value="">All</option>
                                    {roles && roles.map(role => (
                                        <option key={role.roleId} value={role.role}>{role.role}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-lg-2 col-5 pt-2">
                                <button className="btn btn-dark mt-4" onClick={handleFilter}>Filter</button>
                            </div>
                        </div>

                        <div className="table-responsive pt-4">
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th scope="col">Permit Name</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDescriptions.slice(currentPage * perPage, (currentPage + 1) * perPage).map(description => (
                                        <tr key={description.DescriptionId}>
                                            <td>{description.permittypeName}</td>
                                            <td>{description.role}</td>
                                            <td>{description.description}</td>
                                            <td>
                                                <button type='button' className='btn btn-primary'>
                                                    <FaEdit onClick={() => handleEdit(description._id)} />
                                                </button>
                                            </td>
                                            <td>
                                                <button type='button' className='btn btn-danger'>
                                                    <FaTrash onClick={() => handleDelete(description._id)} />
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
                            <h3 className="modal-title">Edit Description Details</h3>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label><span className='clrs'>Description</span></label>
                                        <textarea
                                            type="text"
                                            name="description"
                                            className="form-control"
                                            placeholder="Description"
                                            value={selectedUser ? selectedUser.description : ""}
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
}

export default Description;

