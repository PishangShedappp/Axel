import React, { useEffect, useState } from 'react';
import { useInterval } from '@mantine/hooks';
import { VscChromeMinimize, VscChromeRestore, VscChromeMaximize, VscChromeClose } from "react-icons/vsc";
import './TitleBar.css';
import AppIcon from '../../assets/react.svg';

const remote = window.require('@electron/remote')
const ipcRenderer = window.require("electron").ipcRenderer
const ipc = ipcRenderer

function TitleBar() {
    const [maximized, setMaximized] = useState(false);
    const win = remote.getCurrentWindow()

    const electronInterval = useInterval(() => {
        if (win.isMaximized() === true) {
            setMaximized(false)
        } else {
            setMaximized(true)
        }
    }, 200);

    useEffect(() => {
        electronInterval.start();
        return electronInterval.stop;
    })

    const minimizeHandler = () => {
        ipc.send('minimizeApp')
    }

    const restoreHandler = () => {
        ipc.send('maximizeRestoreApp')
    }

    const closeHandler = () => {
        ipc.send('closeApp')
    }

    return (
        <div className='title-bar'>
            <div className='menu-button-container'>
                <img src={AppIcon}/>
            </div>
            <div className="app-title-name-container">
                <p className="app-title-p">Axel</p>
            </div>
            <div className="window-controls-container">
                <button className="minimize-button titlebar-button" onClick={minimizeHandler}>
                    <VscChromeMinimize className='titlebar-icon' size={14}/>
                </button>
                <button className="maximize-restore-button titlebar-button" onClick={() => {restoreHandler()}}>
                    {!maximized ? <VscChromeRestore className='titlebar-icon' size={16}/> : <VscChromeMaximize className='titlebar-icon' size={16}/>}
                </button>
                <button className="close-button titlebar-button" onClick={closeHandler}>
                    <VscChromeClose className='titlebar-icon' size={14}/>
                </button>
            </div>
        </div>
    )
}

export default TitleBar