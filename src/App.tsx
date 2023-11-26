import './App.css'
import { useLocation } from 'react-router-dom';
import TitleBar from './components/TitleBar/TitleBar.tsx';
import InputBar from './components/InputBar/InputBar.tsx';
import LeftBar from './components/LeftBar/LeftBar.tsx';

function App() {
  return (
    <>
      <TitleBar />
      <InputBar />
      <LeftBar />
    </>
  )
}

export default App
