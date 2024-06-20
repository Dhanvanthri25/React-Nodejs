import React, { useEffect } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { autoLogout } from './Auth/Auth';
import Login from './Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Register } from './Components/Admin/RegisterForm/Register';
import { UserList } from './Components/Admin/UserList/UserList';
import { RoleForm } from './Components/Admin/Role/RoleForm';
import { Permittype } from './Components/Admin/PermitType/Permittype';
import Description from './Components/Admin/Description/Description';
import { CheckList } from './Components/Admin/Checklist/CheckList';
import SideMenu from './Components/Common/SideMenu/SideMenu';
import Profile from './Components/Profile/Profile';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogout());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/SideMenu" element={<SideMenu />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/RoleForm" element={<RoleForm />} />
          <Route path="/Permittype" element={<Permittype />} />
          <Route path="/Description" element={<Description />} />
          <Route path="/CheckList" element={<CheckList />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
