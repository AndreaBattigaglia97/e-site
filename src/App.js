import './App.css';
import { useState } from 'react';
import { MdOutlineFileDownload } from "react-icons/md";
import SplashCursor from './SplashCursor'
import TextType from './TextType';


function App() {

  const [enableSplashCursor, setEnableSplashCursor] = useState(true);
  const defaultPhrases = ["Hi, I'm Ernesto.", "Hi, I'm a screenwriter.", "Hi, I'm Ernesto.", "Hi, I'm a screenwriter.", "Hi, I'm Ernesto.", "Hi, I'm a screenwriter.", "Hi, I'm Ernesto.", "Hi, I'm a screenwriter.", "Hi, I'm Ernesto.", "Hi, I'm a screenwriter.", "Hi, I'm Ernesto.", "Hi, I'm a screenwriter.","Hi, I'm Ernesto.", "Hi, I'm a screenwriter.", "You still here?", "What are you waiting for?", "There is only one button to click.", "Go ahead, click it.", "You know you want to.", "It's not going to bite.", "It's just a download button.", "For my presentation.", "You can always delete it later.", "But you might find it interesting.", "Just saying.", "Ok, I'll stop now."];
  // eslint-disable-next-line no-unused-vars
  const [phrases, setPhrase] = useState(defaultPhrases);

  return (
    <div className="App">
      <header className="App-header">
        <div className='logo'>
          <h1>e</h1>
          <p className='animation'>.</p>
        </div>

        <TextType 
          text={phrases}
          typingSpeed={90}
          pauseDuration={2000}
          showCursor={true}
          cursorCharacter="|"
        />

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
