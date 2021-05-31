import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useBroadcast, useObviousState, useUnicast, ObviousApp } from 'obvious-react';

function App() {
  const [logoClass, setLogoClass] = React.useState('App-logo rotate');
  const inputRef = React.useRef(null);

  const [text, setText] = useObviousState<string>('text', { initialValue: 'Hello Obvious' });
  const [isVueAppVisible, setIsVueAppVisible] = useObviousState<boolean>('isVueAppVisible', { initialValue: true })
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
  
  return (
    <div style={{ display: 'flex' }}>
      <div className="App" style={{ flex: 1 }}>
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
          { !isVueAppVisible ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={() => setIsVueAppVisible(true)}>Show Vue App</button>
            </div>
          ) : null}
        </header>
      </div>
      { isVueAppVisible ? (
        <ObviousApp name="vue-app" style={{ flex: 1 }} />
      ) : null }
    </div>
  );
}

export default App;
