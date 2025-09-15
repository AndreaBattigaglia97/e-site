import './App.css';
import { useState, useEffect } from 'react';
import { MdOutlineFileDownload } from "react-icons/md";
// import SplashCursor from './SplashCursor'
import TextType from './TextType';


function App() {

  const [enableSplashCursor, setEnableSplashCursor] = useState(true);
  const [lang , setLang] = useState('it');
  const defaultPhrases = ["Hi, I'm Ernesto.", "Hi, I'm an author and screenwriter.", "Hi, I'm Ernesto.", "Hi, I'm an author and screenwriter.", "Hi, I'm Ernesto.", "Hi, I'm an author and screenwriter.", "Hi, I'm Ernesto.", "Hi, I'm an author and screenwriter.", "Hi, I'm Ernesto.", "Hi, I'm an author and screenwriter.", "Hi, I'm Ernesto.", "Hi, I'm an author and screenwriter.","Hi, I'm Ernesto.", "Hi, I'm an author and screenwriter.", "You still here?", "What are you waiting for?", "There is only one button to click.", "Go ahead, click it.", "You know you want to.", "It's not going to bite.", "It's just a download button.", "For my presentation.", "You can always delete it later.", "But you might find it interesting.", "Just saying.", "Ok, I'll stop now."];
  // eslint-disable-next-line no-unused-vars
  const [phrases, setPhrase] = useState(defaultPhrases);

  useEffect(() => {
    if (lang === 'it') {
      setPhrase(["Ciao, sono Ernesto.", "Sono un autore e sceneggiatore.", "Ciao, sono Ernesto.", "Sono un autore e sceneggiatore.", "Ciao, sono Ernesto.", "Sono un autore e sceneggiatore.", "Ciao, sono Ernesto.", "Sono un autore e sceneggiatore.", "Ciao, sono Ernesto.", "Sono un autore e sceneggiatore.", "Ciao, sono Ernesto.", "Sono un autore e sceneggiatore.","Ciao, sono Ernesto.", "Sono un autore e sceneggiatore.", "Ancora qui?", "Che aspetti?", "Guarda che il pulsante da cliccare è uno.", "Dai, su.", "Dai che ti va.", "Mica morde.", "È solo download.", "Davvero.", "Comunque lo puoi sempre cancellare.", "Magari trovi qualcosa che ti piace.", "Per dire.", "Va bene, basta."]);
    } else {
      setLang('en');
      setPhrase(defaultPhrases);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  return (
    <div className="App">
      <div className='language-switch'>
        <button className={lang === 'it' ? 'active' : ''} onClick={() => setLang('it')}>IT</button>
        <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
      </div>
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
          <span>{lang === 'it' ? 'VUOI LEGGERE QUALCOSA' : 'WANNA READ SOMETHING'}?</span>
          <MdOutlineFileDownload />
        </a>
      </header>
      <div className={`animation-wrapper ${enableSplashCursor ? '' : 'hidden'}`}>
        {/* <SplashCursor /> */}
      </div>
    </div>
  );
}

export default App;
