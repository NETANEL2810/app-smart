import React from 'react'
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Home from './pages/home';
import LoginAdmin from './admin/loginAdmin';
import HeaderAdmin from './admin/headerAdmin';
import UsersAdminList from './admin/users/usersAdminList';
import CompaniesAdminList from './admin/companies/companiesAdminList';
import DevicesAdminList from './admin/devices/devicesAdminList';
import AuthAdminComp from './admin/authAdminComp';
import AddDeviceForm from './admin/devices/addDeviceForm';
import EditDeviceForm from './admin/devices/editDeviceForm';
import AddCompanyForm from './admin/companies/addCompanyForm';
import EditCompanyForm from './admin/companies/editCompanyForm';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* diffine the hader of the admin routes */}
        <Route path="/admin/*" element={<HeaderAdmin />} />
      </Routes>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<LoginAdmin/>} />

        <Route path="/admin/users" element={<UsersAdminList/>} />
        <Route path="/admin/companies" element={<CompaniesAdminList/>} />
        <Route path="/admin/companies/add" element={<AddCompanyForm/>} />
        <Route path="/admin/companies/edit/:id" element={<EditCompanyForm/>} />
        <Route path="/admin/devices" element={<DevicesAdminList/>} />
        <Route path="/admin/devices/add" element={<AddDeviceForm/>} />
        <Route path="/admin/devices/edit/:id" element={<EditDeviceForm/>} />
        <Route path="/*" element={<h2>Page 404, not found</h2>} />
      </Routes>
      <Routes>
        {/* each dirctory of admin must auth */}
        <Route path="/admin/:dir/*" element={<AuthAdminComp/>} />
      </Routes>

    </BrowserRouter>
  )
}
