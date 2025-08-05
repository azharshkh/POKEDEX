import { useEffect, useState } from 'react';
import './index.css'
import'./App.css'

const arrowSound = new Audio('/arrow.mp3');
const okSound = new Audio('/ok.mp3');
arrowSound.volume = 0.5;
okSound.volume = 0.5;



function App() {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [tempNumber, setTempNumber] = useState(1);
  const [tempActive, setTempActive] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const[spriteToggle, setSpriteToggle] = useState(false);

  useEffect(() => {
    let interval;
    if (pokemon?.sprites?.front_default && pokemon?.sprites?.back_default) {
      interval = setInterval(() => {
        setSpriteToggle(prev => !prev);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [pokemon]);

useEffect(() => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${currentNumber}`)
    .then(res => res.json())
    .then(setPokemon)
    .catch(() => setPokemon(null));
}, [currentNumber]);


 const updateTempNumber = (delta) => {

   arrowSound.currentTime = 0;
  arrowSound.play();

  let newTemp = tempActive ? tempNumber + delta : currentNumber + delta;
  newTemp = Math.min(1025, Math.max(1, newTemp));
  setTempNumber(newTemp);
  setTempActive(true);

  clearTimeout(window.revertTimeout);
  updateDisplayColor(true);

  window.revertTimeout = setTimeout(() => {
    setTempActive(false);
    updateDisplayColor(false);
  }, 7000);
};


 const handleOK = () => {
  if (tempActive) {

    okSound.currentTime = 0;
    okSound.play();

    clearTimeout(window.revertTimeout);
    setCurrentNumber(tempNumber); // triggers fetch
    setTempActive(false);
    updateDisplayColor(false);
  }
};

 const updateDisplayColor = (highlight) => {
  const el = document.querySelector('.number-display');
  if (el) el.style.color = highlight ? 'yellow' : 'white';
};


 return (
  <div
    className="crop-frame"
    style={{
      position: 'relative',
      width: '380px',
      height: '660px',
      overflow: 'hidden',
      background: 'black',
    }}
  >
    {/* Background image */}
    <img
      src="/img.webp"
      alt="Pokedex"
      style={{
        position: 'absolute',
        top: '-50px',
        left: '-320px',
        width: '1024px',
        height: '768px',
      }}
    />

    {/* Pokémon screen display */}
    <div
      className="screen"
      style={{
        position: 'absolute',
        top: '1px',
        left: '380px',
        width: '280px',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        paddingTop: '10px',
        boxSizing: 'border-box',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
            overflow: 'visible', 
        zIndex: 2,
      }}
    >
      <div
        className="poke-name"
        style={{
          fontSize: '22px',
          fontWeight: 'bold',
          marginTop: '150px',
          marginLeft: '-650px',
          color: 'white',
        }}
      >
        {pokemon ? pokemon.name.toUpperCase() : ''}
      </div>
      <div
        className="poke-type"
        style={{
          fontSize: '18px',
          marginTop: '10px',
          marginLeft: '-650px',
          color: 'white',
        }}
      >
        {pokemon
          ? pokemon.types.map((t) => t.type.name.toUpperCase()).join(', ')
          : ''}
      </div>
      <img
        className="poke-image"
        src={
          spriteToggle
            ? pokemon?.sprites?.back_default
            : pokemon?.sprites?.front_default
        }
        alt=""
        style={{
          width: '220px',
          height: '220px',
         // maxWidth: '100%',
         // objectFit: 'contain',
          imageRendering: 'pixelated',
       //  marginTop: '10px',
          marginLeft: '-650px',
          marginBottom: '20px',
        }}
      />
    </div>

    {/* Number display */}
    <div
      className="number-display"
      style={{
        position: 'absolute',
        top: '558px',
        left: '99px',
        width: '140px',
        height: '70px',
        backgroundColor: 'transparent',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'monospace',
        fontSize: '50px',
        borderRadius: '4px',
        zIndex: 2,
      }}
    >
      {(tempActive ? tempNumber : currentNumber).toString().padStart(3, '0')}
    </div>

    {/* Buttons */}
    <button
      className="btn ok-button"
      onClick={handleOK}
      style={{
        position: 'absolute',
        top: '506px',
        left: '40px',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        zIndex: 3,
      }}
    />
    <button
      className="btn up-button"
      onClick={() => updateTempNumber(10)}
      style={{
        position: 'absolute',
        top: '520px',
        left: '295px',
        width: '35px',
        height: '35px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        zIndex: 3,
      }}
    />
    <button
      className="btn down-button"
      onClick={() => updateTempNumber(-10)}
      style={{
        position: 'absolute',
        top: '580px',
        left: '295px',
        width: '35px',
        height: '35px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        zIndex: 3,
      }}
    />
    <button
      className="btn left-button"
      onClick={() => updateTempNumber(-1)}
      style={{
        position: 'absolute',
        top: '550px',
        left: '260px',
        width: '35px',
        height: '35px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        zIndex: 3,
      }}
    />
    <button
      className="btn right-button"
      onClick={() => updateTempNumber(1)}
      style={{
        position: 'absolute',
        top: '550px',
        left: '330px',
        width: '35px',
        height: '35px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        zIndex: 3,
      }}
    />
  </div>
);

}

export default App;