import React from 'react';
import './header.scss'
import Container from "../container/Container";
import {logOut} from "../../api/api";
import {Link} from "react-router-dom";

const Header = ({user, setUser}) => {

    return (
        <div className='header'>
            <Container>
                <div className='nav'>
                    <Link to={'/profile'}>
                        <button className='logo'>
                            <h2>Attractor-test</h2>
                        </button>
                    </Link>
                    <button className='logo' onClick={() => logOut(() => setUser(null))}>
                        sign out
                    </button>
                </div>
            </Container>
        </div>
    );
};

export default Header;