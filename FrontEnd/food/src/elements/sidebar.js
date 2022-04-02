import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';

export default class Sidebar extends Component {
    render() {
        return (
            <div id="wrapper">
                <ul className="sidebar navbar-nav">
                    <li className="nav-item active">
                        <Link to={'/dashboard'} className="nav-link"><i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>&nbsp;Dashboard</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/profile'} className="nav-link"><PersonIcon/>
                            <span>&nbsp;My Profile</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/add'} className="nav-link"><AddIcon/>
                            <span>&nbsp;Add Food</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/inbox'} className="nav-link"><MailIcon/>
                            <span>&nbsp;Inbox</span></Link>
                    </li>
                </ul>
            </div>
        );
    }
}
