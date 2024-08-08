import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [memes, setMemes] = useState([]);
  const [currentMeme, setCurrentMeme] = useState(0);

  const url = "https://api.imgflip.com/get_memes";

  useEffect(() => {
    const fetchMemes = async () => {
      const response = await axios.get(url);
      setMemes(response.data.data.memes);
    };
    fetchMemes();
  }, []);

const nextMeme = () => {
  setCurrentMeme((index) => {
    if(index >= memes.length - 1) {
      return 0;
    } else {
      return index + 1;
    }
  });
};

const prevMeme = () => {
  setCurrentMeme((index) => {
    if(index === 0) {
      return memes.length - 1;
    } else {
      return index - 1;
    }
  });
};

const randomMeme = () => {
  setCurrentMeme(Math.floor(Math.random() * memes.length));
};

  return (
    <div className="App">
      <h1>Meme generator</h1>
      <div className="container">
        <p>{currentMeme}</p>
        <h2>{memes[currentMeme]?.name}</h2>
        <img
          src={memes[currentMeme]?.url}
          alt={memes[currentMeme]?.name}
          className="image"
        />
      </div>
      <button onClick={prevMeme}>Prev</button>
      <button onClick={nextMeme}>Next</button>
      <button onClick={randomMeme}>Random</button>
    </div>
  );
}

export default App;
