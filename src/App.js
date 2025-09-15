import './App.css';
import { useState } from 'react';
import { MdOutlineFileDownload } from "react-icons/md";
import SplashCursor from './SplashCursor'


function App() {

  const [enableSplashCursor, setEnableSplashCursor] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <div className='logo'>
          <h1>e</h1>
          <p className='animation'>.</p>
        </div>

        <a
          className="App-link"
          href={process.env.PUBLIC_URL + "/GIUNTINI'S DOG & PONY SHOW.pdf"}
          download
          rel="noopener noreferrer"
          onMouseEnter={() => setEnableSplashCursor(false)}
          onMouseLeave={() => setEnableSplashCursor(true)}
        >
          <span>DOWNLOAD MY PRES</span>
          <MdOutlineFileDownload />
        </a>
      </header>
      <div className={`animation-wrapper ${enableSplashCursor ? '' : 'hidden'}`}>
        <SplashCursor />
      </div>
    </div>
  );
}

export default App;
