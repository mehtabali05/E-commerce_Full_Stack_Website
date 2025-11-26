import React from 'react'
import Layout from '../../components/Layout/Layout.jsx'
import UserMenu from '../../components/Layout/UserMenu.jsx';
import { useAuth } from '../../contextAPI/auth.jsx';
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - E-commerce"}>
      <div className="container-fluid m-3 p-2">
        <div className="row">
          <div className="col-3">
            <UserMenu />
          </div>
          <div className="col-9">
            <div className="card w-75 p-2">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
