import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Policy from './pages/Policy.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Register from './pages/authentication/Register.jsx';
import Login from './pages/authentication/Login.jsx';
import Dashboard from './pages/user/Dashboard.jsx';
import PrivateRoute from './components/routes/PrivateRoute.jsx';
import AdminPrivateRoute from './components/routes/AdminPrivateRoute.jsx';
// import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory.jsx';
import CreateProduct from './pages/admin/CreateProduct.jsx';
import Users from './pages/admin/Users.jsx';
import Orders from './pages/user/Orders.jsx';
import Profile from './pages/user/Profile.jsx';
import Products from './pages/admin/Products.jsx';
import UpdateProduct from './pages/admin/UpdateProduct.jsx';
import SearchPage from './pages/SearchPage.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import CategoryProductPage from './pages/CategoryProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';
import SendOtpPage from './pages/authentication/SendOtpPage.jsx';
import ResetPassword from './pages/authentication/ResetPassword.jsx';
import AdminProfile from './pages/admin/AdminProfile.jsx';
import Success from './pages/Success.jsx';
import Cancel from './pages/Cancel.jsx';

function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/category/:slug' element={<CategoryProductPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders' element={<Orders />} />
          <Route path='user/profile' element={<Profile />} />
        </Route>
        <Route path='/dashboard' element={<AdminPrivateRoute />} > 
          <Route path='admin/profile' element={<AdminProfile />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct/>} />
          <Route path='admin/update-product/:slug' element={<UpdateProduct/>} />
          <Route path='admin/products' element={<Products/>} />
          <Route path='admin/users' element={<Users />} />
          <Route path='admin/orders' element={<AdminOrders />} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<SendOtpPage />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/checkout-success' element={<Success />} />
        <Route path='/checkout-failure' element={<Cancel />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
