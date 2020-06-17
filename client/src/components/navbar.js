import React, { useContext } from 'react'
import { NavLink,useHistory  } from 'react-router-dom'
import { Context } from '../context/context'



export const Navbar = () => {
    const hestory= useHistory()
    const auth= useContext(Context)
    const logoutHandler =(event)=>{
        event.preventDefault();
        console.log("auth:",auth)
        auth.logout()
        hestory.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-3">
                <a href="/" className="brand-logo">Сокращение ссылок</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/links'>Ссылки</NavLink></li>
                    <li><NavLink to='/create'>Сократить ссылку</NavLink></li>
                    <li><a href='/' onClick={logoutHandler}>Выйти </a></li>
                 </ul>
            </div>
        </nav>

    )
}