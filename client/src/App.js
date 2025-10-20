import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/authentication/Register';
import Login from './pages/authentication/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/PrivateRoute';
import AdminPrivateRoute from './components/routes/AdminPrivateRoute';
// import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import SearchPage from './pages/SearchPage';
import ProductDetails from './pages/ProductDetails';
import CategoryProductPage from './pages/CategoryProductPage';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/admin/AdminOrders';
import SendOtpPage from './pages/authentication/SendOtpPage';
import ResetPassword from './pages/authentication/ResetPassword';
import AdminProfile from './pages/admin/AdminProfile';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

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
