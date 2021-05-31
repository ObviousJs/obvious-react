import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useBroadcast, useObviousState, useSocket, useUnicast } from './obvious-react';

function App() {
  const [logoClass, setLogoClass] = React.useState('App-logo rotate');
  const inputRef = React.useRef(null);

  const socket = useSocket();
  const [text, setText] = useObviousState<string>('text.a.b.c', { initialValue: 'Hello Obvious' });
  useBroadcast('change-rotate', (rotate: boolean) => {
    if (rotate) {
      setLogoClass('App-logo rotate');
    } else {
      setLogoClass('App-logo');
    }
  });
  useUnicast('get-input-dom', () => {
    return inputRef && inputRef.current;
  });

  const handleOnChange: React.EventHandler<any> = (e) => {
    setText(e.target.value);
  }

  const handleOnHide = () => {
    socket.broadcast('setReactAreaVisible', false)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={`http://localhost:3000${logo}`} className={logoClass} alt="logo" />
        <div>
            <div>Edit the text showed in vue area: </div>
            <input ref={inputRef} onChange={handleOnChange} value={text}></input>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={handleOnHide}>Hide React App</button>
        </div>
      </header>
    </div>
  );
}

export default App;
