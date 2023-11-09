import logo from './assets/lendlord.png'
import './App.css';
import React, { useState, useEffect } from 'react';
import Network from "./Network";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const bob = async () => {
    try {
      const res = await Network.get('/getAllUsers');
      setUsers(res)
      console.log(res);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setLoading(true);
    bob()
    setLoading(false);
    console.log(users)
  }, [])
  return (
    users ?
      <div className="App">
        <header className="App-header">
          <img src={logo} width={'200px'} alt={'logo'} />
        </header>
        {users.map((user) => (
          <div>
            {user.firstName}
          </div>
        ))
        }
      </div>
      : !loading ?
        <div></div>
        :
        <div>not found</div>
  );
}

export default App;
