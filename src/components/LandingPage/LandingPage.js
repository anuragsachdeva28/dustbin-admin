import React from 'react';
import { Link } from 'react-router-dom';

import './LandingPage.css';
import Navbar from "../Navbar/Navbar";
import {Button} from "react-bootstrap";
import Dustbin from "../../images/trash.png";

const LandingPage = () => (
    <div className="">
        <Navbar/>
        <div className="land_page">
            <section className="heroSection land_main">
                <main className="content">
                    <h1 className="heading_land">A fully automated platform</h1>
                    <p className="subtitle">for smart dustbin management system</p>
                </main>
                <nav className="action">
                    <Link to={"/signin/"}>
                        <Button type="submit" variant="secondary" size="sm" className={`signin_btn`}>
                            <span>Login</span>
                        </Button>
                    </Link>
                </nav>
            </section>
            <div className="main_image">
                <img src={Dustbin}/>
            </div>

        </div>

    </div>

);

export default LandingPage;
