import React, { Component } from 'react';
import Icon from './Icon/Icon';
import './Sidebar.css';
import Logo from '../../../src/x.png';
import Pic from '../../../src/man.png';
import Dexpert from '../../images/dexpert.svg';
import Avatar from '../../images/avatar.svg';
import Monitors from '../../images/monitors.svg';
import AdminUser from '../../images/admin_user.svg';

import { Link, NavLink } from 'react-router-dom';

class Sidebar extends Component {

    render() {
        // let activeClassName = this.state.active ? " active" : "";
        return (
            <div className="sidebar">
                <Link to={"/profile/"} > <img className="logo" src={Logo} alt="logo" /></Link>
                <NavLink to={"/wards/"} activeClassName={"sidebarActive"}>
                    {/* <Icon
                    icon="fa-folder-open"
                    // onActive="fa-close"
                    // Activate={this.Activate} 
                    title="Dexperts"
                    // active={this.state.active}
                     /> */}
                    <div className={"sidebar-div"}><div className={"sidebar-div-inner"}> <img className="icons-side" src={Dexpert} /></div></div>
                </NavLink>
                <NavLink to={"/supervisors/wards/"} activeClassName={"sidebarActive"}>
                    {/* <Icon
                        icon="fa-user"
                        title="Employees"
                    // active={this.state.active}
                    /> */}
                    <div className={"sidebar-div"}><div className={"sidebar-div-inner"}><img className="icons-side" src={Monitors} /></div></div>
                </NavLink>
                <NavLink to={"/admins/"} activeClassName={"sidebarActive"}>
                    {/* <Icon
                        icon="fa-user-secret"
                        title="Admin"
                    // active={this.state.active}
                    /> */}
                    <div className={"sidebar-div"}><div className={"sidebar-div-inner"}><img className="icons-side" src={AdminUser} /></div></div>
                </NavLink>
                <Link to={"/profile/"} > <img className="pic" src={Avatar} alt="logo" title="Profile" /></Link>
            </div>
        )
    }
}
export default Sidebar;