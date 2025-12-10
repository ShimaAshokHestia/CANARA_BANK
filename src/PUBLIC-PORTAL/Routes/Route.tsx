import { Routes, Route } from 'react-router-dom';
import PageNotFound from '../../ADMIN-PORTAL/Pages/Dashboard/PageNotFound';
import PublicNavbar from '../Layout/Navbar';

export default function PublicRoutes() {
  return (
    <Routes>
      
       <Route path='/' element={<PublicNavbar />} />
      {/* Catch-All Route for 404 */}
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}