import logo from './assets/lendlord.png'
import './App.css';

async function App() {
  async function bob() {
    const response = await fetch("http://localhost:3000/hello");
    console.log(response);
  }
  await bob();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width={'200px'} alt={'logo'} />
      </header>
    </div>
  );
}

export default App;
