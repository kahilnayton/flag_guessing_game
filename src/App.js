import CountryGame from './CountryGame';
import worldImg from './world_img.jpg'
import './App.css';

function App() {
  return (
    <div className="flag-app">
      <header
        className="title-header"
        style={{backgroundImage: `url(${worldImg})`}}
      >
        <h1 className="title-text">Guess The Flag</h1>
      </header>
      <CountryGame/>

    </div>
  );
}

export default App;
