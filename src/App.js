import './i18n';
import './App.css';
import { useTranslation } from 'react-i18next';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Bio from './components/Bio';
import NetflixShelf from './components/NetflixShelf';
import Awards from './components/Awards';
import Contact from './components/Contact';
import films from './data/films';
import shorts from './data/shorts';
import branded from './data/branded';

function App() {
  const { t } = useTranslation();

  return (
    <div className="App">
      <Nav />
      <Hero />
      <main>
        <section id="bio">
          <Bio />
        </section>
        <section id="lavori">
          <NetflixShelf
            label={t('sections.label1')}
            items={films}
            accentColor="var(--accent-film)"
          />
          <NetflixShelf
            label={t('sections.label2')}
            items={shorts}
            accentColor="var(--accent-short)"
          />
          <NetflixShelf
            label={t('sections.label3')}
            items={branded}
            accentColor="var(--accent-branded)"
          />
        </section>
        <section id="premi">
          <Awards />
        </section>
        <section id="contatti">
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default App;
