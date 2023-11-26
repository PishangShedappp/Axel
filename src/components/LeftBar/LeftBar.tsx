import React from "react";
import { IoBookmarksOutline } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
import './LeftBar.css';

function LeftBar() {
    return (
        <div className="leftnav-main">
            <div className="leftnav-bar">
                <div className="leftnav-button-top">
                    <button><IoBookmarksOutline size={16}/></button>
                    <button><GoDownload size={16}/></button>
                </div>
            </div>
        </div>
    )
}

export default LeftBar;