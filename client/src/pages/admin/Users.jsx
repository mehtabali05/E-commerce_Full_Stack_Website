import React from 'react'
import Layout from '../../components/Layout/Layout.jsx'
import AdminMenu from '../../components/Layout/AdminMenu.jsx'

const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-2">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-8">
            <div className="card w-75 p-2">
              <h1>All Users</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users
