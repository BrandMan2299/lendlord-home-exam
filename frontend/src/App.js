import logo from './assets/lendlord.png'
import './App.css';
import React, { useState, useEffect } from 'react';
import Network from "./Network";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, InputGroup, Form, Dropdown, SplitButton } from 'react-bootstrap';
import PopUp from './PopupModal';
import Edit from './Edit';
import Delete from './Delete';

const formatDate = (stringDate) => {
  const date = new Date(stringDate);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
  return formattedDate;
}

function App() {
  const [render, setRender] = useState(1);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();
  const [sortKey, setSortKey] = useState('firstName');
  const [sortDir, setSortDir] = useState('asc');
  const [search, setSearch] = useState({ key: 'firstName', value: '' });

  const handleSort = (key, direction) => {
    if (key === sortKey) {
      sortDir === direction ? direction = 'desc' : direction = 'asc';
    }
    setSortKey(key);
    setSortDir(direction);
  }

  const submit = () => {
    setRender(render - 1);
  }

  const searchKey = (eventKey) => { setSearch({ ...search, key: eventKey }) }
  const searchValue = (e) => { setSearch({ ...search, value: e.target.value }) }

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await Network.get(`/getAllUsers?key=${sortKey}&direction=${sortDir}&searchKey=${search.key}&searchValue=${search.value}`);
        setUsers(res)
        setLoading(false);
      }
      catch (error) {
        console.log(error);
      }
    })();
  }, [render, sortKey, sortDir])
  return (
    users ?
      <div className="App">
        <header className="App-header">
          <img src={logo} width={'200px'} alt={'logo'} />
        </header>
        <PopUp render={render} setRender={setRender} />
        <InputGroup>
          <SplitButton
            variant="outline-secondary"
            title="Search"
            id="input-group-dropdown-1"
            onSelect={searchKey}
            onClick={submit}
          >
            <Dropdown.Item eventKey='firstName'> First Name</Dropdown.Item>
            <Dropdown.Item eventKey='lastName'> Last Name</Dropdown.Item>
            <Dropdown.Item eventKey='email'> Email</Dropdown.Item>
            <Dropdown.Item eventKey='role'> Role </Dropdown.Item>
            <Dropdown.Item eventKey='_id'> Id </Dropdown.Item>
          </SplitButton>
          <Form.Control aria-label="Text input with dropdown button" onChange={searchValue} />
        </InputGroup>
        <div>
          <Table striped bordered hover>
            <thead className='table-light'>
              <tr>
                <td className="front-row" onClick={() => handleSort('firstName', 'asc')}> First Name</td>
                <td className="front-row" onClick={() => handleSort('lastName', 'asc')}> Last Name</td>
                <td className="front-row" onClick={() => handleSort('email', 'asc')}> Email</td>
                <td className="front-row" onClick={() => handleSort('dateStarted', 'asc')}> Date started</td>
                <td className="front-row" onClick={() => handleSort('salary', 'asc')}> Salary </td>
                <td className="front-row" onClick={() => handleSort('manager', 'asc')}> Manager </td>
                <td className="front-row" onClick={() => handleSort('role', 'asc')}> Role </td>
                <td className="front-row" onClick={() => handleSort('createdAT', 'asc')}> Created at </td>
                <td className="front-row" onClick={() => handleSort('updatedAt', 'asc')}> Updated last at </td>
                <td style={{ fontWeight: "bold" }}> Actions </td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  {
                    Object.keys(user).map(key => (
                      (key === "dateStarted" || key === 'createdAT' || key === 'updatedAt') ? (
                        <td key={user._id + key} className="body-data">
                          {formatDate(user[key])}
                        </td>)
                        : (key !== "_id") ? (
                          <td key={user._id + key} className="body-data">
                            {user[key]}
                          </td>)
                          : null
                    ))
                  }
                  <td>
                    <Edit user={user} render={render} setRender={setRender} formatDate={formatDate}>Edit</Edit>
                    <Delete _id={user._id}>Delete</Delete>
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
