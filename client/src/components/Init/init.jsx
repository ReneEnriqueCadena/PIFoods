import React from "react";
import { Link } from 'react-router-dom'
import './init.css'

export default function Init(){


    return (

        <div className="first">
            <h1 className="i1">Welcome to your recipe app</h1>
            <br></br>
            <Link to='/home' className="i2">
                <button className="i3">

                  Get Into  
                </button>
            </Link>
        </div>
    )
}