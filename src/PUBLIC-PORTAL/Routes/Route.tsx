import { Routes, Route } from 'react-router-dom';
import PageNotFound from '../../ADMIN-PORTAL/Pages/Dashboard/PageNotFound';
import PublicLayout from '../Layout/Layout';
import ContactUs from '../Pages/ContactUs';
import Downloads from '../Pages/Downloads';
import Rules from '../Pages/Rules';
import ManagingCommittee from '../Pages/ManagingCommittee';
import AboutUs from '../Pages/AboutUs';
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from '../Pages/Home';


export default function PublicRoutes() {
  return (
    <Routes>


      <Route path='/' element={<PublicLayout />} >
      <Route index element={<Home />} />
        <Route path='/downloads' element={<Downloads />} />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/managing-committee' element={<ManagingCommittee />} />
        <Route path='/rules' element={<Rules />} />
        <Route path='/contact-us' element={<ContactUs />} />
      </Route>
      {/* Catch-All Route for 404 */}
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}