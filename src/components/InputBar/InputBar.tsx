import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import { SlOptionsVertical } from "react-icons/sl";
import './InputBar.css';

function InputBar() {
    return (
        <div className="inputbar-main">
            <div className="browser-bar">
                <div className="navigations-button">
                    <button><FaAngleLeft size={18}/></button>
                    <button><FaAngleRight size={18}/></button>
                    <button><TbReload size={20}/></button>
                </div>
                <div className="address-bar">
                    <input type="text" placeholder="Search or enter address"/>
                </div>
                <div className="options-button">
                    <button><SlOptionsVertical size={18}/></button>
                </div>
            </div>
        </div>
    )
}

export default InputBar;