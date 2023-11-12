import logo from './assets/lendlord.png'
import './App.css';
import React, { useState, useEffect } from 'react';
import Network from "./Network";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';
import PopUp from './PopupModal';


const formatDate = (stringDate) => {
  const date = new Date(stringDate);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  return formattedDate;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await Network.get('/getAllUsers');
        setUsers(res)
        setLoading(false);
      }
      catch (error) {
        console.log(error);
      }
    })();
  }, [])
  return (
    users ?
      <div className="App">
        <header className="App-header">
          <img src={logo} width={'200px'} alt={'logo'} />
        </header>
        <PopUp />
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td> First Name</td>
                <td> Last Name</td>
                <td> Email</td>
                <td> Date started</td>
                <td> Salary </td>
                <td> Manager </td>
                <td> Role </td>
                <td> Actions </td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  {
                    Object.keys(user).map(key => (
                      (key == "dateStarted") ? (
                        <td key={user._id + key} className="body-data">
                          {formatDate(user.dateStarted)}
                        </td>)
                        : (key != "_id") ? (
                          <td key={user._id + key} className="body-data">
                            {user[key]}
                          </td>)
                          : null
                    ))
                  }
                  <td>
                    <Button variant="primary" value={user._id}>Edit</Button>
                    <Button variant="danger" value={user._id}>Delete</Button>
                  </td>
                </tr>
              ))
              }
            </tbody>
          </Table>
        </div>
      </div>
      : !loading ?
        <div>loading</div>
        :
        <div>not found</div>
  );
}

export default App;
