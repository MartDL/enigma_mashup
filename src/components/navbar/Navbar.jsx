import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const MainNavbar = styled.div`
    display: flex;
    width: 110vw;
    height: 100px;
    justify-content: center;
    align-items: center;
    background-color: #557a95;
    
    ul {
        display: flex;
        list-style: none;
    }

    a {
        text-decoration: none;
        margin: 0 40px;
        font-size: 2rem;
        text-transform: uppercase;
        color: #fff;
    }
`


const Navbar = () => {
    return (
        <MainNavbar>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/chart">Page1</NavLink></li>
                <li><NavLink to="">Page2</NavLink></li>
                <li><NavLink to="">Page3</NavLink></li>
            </ul>
        </MainNavbar>
    )
}

export default Navbar;
