import React, { useState, useEffect, useRef } from 'react';
import SideMenu from '../Common/SideMenu/SideMenu';
import './Dashboard.css';
import axiosService from '../Axios/Axios';
import { FaEye } from 'react-icons/fa'; 

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Active');
  const [modalData, setModalData] = useState([]);
  const [fetchClicked, setFetchClicked] = useState(false); 
  const modalRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const allUsers = await axiosService.getallUsers();
        setUserData(allUsers.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchData();
  }, []);

  const handleEyeIconClick = (companyName) => {
    setSelectedCompany(companyName);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setFetchClicked(false); 
  };

  const groupUsersByCompany = () => {
    return userData.reduce((acc, user) => {
      if (!acc[user.companyName]) {
        acc[user.companyName] = { active: 0, inactive: 0, users: [] };
      }
      if (user.status === 'Active') {
        acc[user.companyName].active++;
      } else {
        acc[user.companyName].inactive++;
      }
      acc[user.companyName].users.push(user);
      return acc;
    }, {});
  };

  const filterUsersByStatus = (status) => {
    return groupUsersByCompany()[selectedCompany].users.filter(user => user.status === status);
  };

  const fetchModalData = () => {
    const data = filterUsersByStatus(selectedStatus);
    setModalData(data);
    setFetchClicked(true);
  };

  return (
    <>
      <SideMenu />
      <div className="dashboard-container d-flex justify-content-center align-items-center padd">
        <div className="card p-3" style={{ width: '80%', maxWidth: '900px' }}>
          <div className="card-body">
            <h1 className="card-title mb-4"> Dashboard</h1>
            <div className="row">
              {Object.keys(groupUsersByCompany()).map((companyName, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-header">
                      <h5 className="card-title">{companyName}</h5>
                    </div>
                    <div className="card-body bg-dark text-white">
                      <p className="card-text">Active Users: {groupUsersByCompany()[companyName].active}</p>
                      <p className="card-text">Inactive Users: {groupUsersByCompany()[companyName].inactive}</p>

                      <div className='d-flex justify-content-end'>
                        <FaEye onClick={() => handleEyeIconClick(companyName)} />
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="modal" tabIndex="-1" role="dialog" ref={modalRef} style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details for <span className='fw-bold'> {selectedCompany}</span></h5>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-6">
                  <div className="form-group">
                  <label htmlFor="statusSelect">Select Status:</label>
                  <select className="form-control" id="statusSelect" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                  </div>
                  <div className="col-lg-6 pt-4">
                  <button className="btn btn-dark" onClick={fetchModalData}>Fetch</button>

                  </div>
                </div>

                {fetchClicked && modalData.length === 0 && (
                  <p>No <span className='fw-bold'> {selectedStatus === 'Active' ? 'Active' : 'Inactive'}</span> users in this company.</p>
                )}
                {modalData.length > 0 && (
                  <>
                    <h5>{selectedStatus} Users:</h5>
                    {modalData.map((user, idx) => (
                      <div key={idx} className="card ">
                        <div className="card-header">
                          <p><strong>Username:</strong> {user.username}</p>
                        </div>
                        <div className="card-body bg-dark text-white">
                          <p><strong>Email:</strong> {user.email}</p>
                          <p><strong>Status:</strong> {user.status}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-dark" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
