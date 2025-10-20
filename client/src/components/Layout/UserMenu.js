import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
        <div className="text-center px-3">
            <div className="list-group">
                <h4 className='bg-dark p-3 text-white text-center mb-3'>User Dashboard</h4>
                <NavLink to={"/dashboard/user/profile"} className="list-group-item list-group-item-action">Profile</NavLink>
                <NavLink to={"/dashboard/user/orders"} className="list-group-item list-group-item-action">Orders</NavLink>
            </div>
        </div>
    </>
  )
}

export default UserMenu
