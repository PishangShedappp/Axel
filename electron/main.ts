import { app, BrowserWindow, ipcMain } from 'electron'
const windowStateKeeper = require("electron-window-state");
const firstRun = require("electron-first-run")
import path from 'node:path'
const ipc = ipcMain;

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
require('@electron/remote/main').initialize()

function createWindow() {
  // Create the browser window
  let mainWindowState = windowStateKeeper({})

  win = new BrowserWindow({
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height,
    frame: false,
    minHeight: 600,
    minWidth: 800,
    title: 'Axel',
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  require('@electron/remote/main').enable(win.webContents);
  mainWindowState.manage(win)

  const isFirstRun = firstRun()
  if (isFirstRun === true) {
    win.maximize()
  }
  win.setTitle("Axel");

  ipc.on('minimizeApp', () => {
    win?.minimize()
  })

  ipc.on('maximizeRestoreApp', () => {
    if (win?.isMaximized()) {
      win.restore()
    } else {
      win?.maximize()
    }
  })

  ipc.on('closeApp', () => {
    app.quit()
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
