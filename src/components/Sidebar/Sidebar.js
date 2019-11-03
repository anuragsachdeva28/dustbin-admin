import React, { Component } from 'react';
import Icon from './Icon/Icon';
import './Sidebar.css';
import Logo from '../../../src/x.png';
import Pic from '../../../src/man.png';
import Dexpert from '../../images/dexpert.svg';
import LogOut from '../../images/images.png';
import Monitors from '../../images/monitors.svg';
import AdminUser from '../../images/admin_user.svg';

import { Link, NavLink } from 'react-router-dom';

class Sidebar extends Component {

    render() {
        return (
            <div className="sidebar">
                <div>
                    <Link to={"/"} > <img className="logo" src={Logo} alt="logo" /></Link>
                </div>
                <div>
                    <NavLink to={"/wards/"} activeClassName={"sidebarActive"}>
                        <div className={"sidebar-div"}><div className={"sidebar-div-inner"}> <img className="icons-side" src={Dexpert} title="Dustbins" /></div></div>
                    </NavLink>
                    <NavLink to={"/supervisors/wards/"} activeClassName={"sidebarActive"}>
                        <div className={"sidebar-div"}><div className={"sidebar-div-inner"}><img className="icons-side" src={Monitors} title="Supervisors" /></div></div>
                    </NavLink>
                </div>

                <div className={"logout"}>
                    <Link to={"/"} > <img onClick={()=>localStorage.removeItem('token')} className="pic" src={LogOut} alt="logo" title="Logout" /></Link>
                </div>
            </div>
        )
    }
}
export default Sidebar;