import './App.css';
import {InputWithIcon} from './components/Form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Convert <b><code>ETH_Private_Key</code></b> 👉 <b><code>Stark_Key</code></b>.
        </p>
        <InputWithIcon/>
        <a
          className="App-link"
          href="https://github.com/strayder-io/stark-key-dydx"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github • Open Source Code
        </a>
      </header>
    </div>
  );
}

export default App;
