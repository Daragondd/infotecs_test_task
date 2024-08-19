import './App.css';
import React from 'react'
import Table from './components/Table'
import { useEffect, useState } from "react";


function App() {

  const API = `https://dummyjson.com/users`;

  const [users, setUsers] = useState([])

  const fetchUsers = async (url) => {
    try{
      const res = await fetch(url);
      const data = await res.json();
      if(data.users.length > 0) {
        setUsers(data.users);
      }
      console.log(data.users);
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchUsers(API);
  }, [])

  //Поиск по всей таблице
  const [search, setSearch] = useState('');


  const filtredUsers = users.filter(users => {
    return ((users.firstName.toLowerCase().includes(search.toLowerCase())) ||
    (users.lastName.toLowerCase().includes(search.toLowerCase())) ||
    (users.age.toString().includes(search)) ||
    (users.gender.toLowerCase().includes(search.toLowerCase())) ||
    (users.address.city.toLowerCase().includes(search.toLowerCase())) ||
    (users.address.address.toLowerCase().includes(search.toLowerCase())) ||
    (users.phone.toLowerCase().includes(search.toLowerCase())))
  })
  

  return (
    <div className="App">
      <input  type="text" placeholder="Search" onChange={(event) => setSearch(event.target.value)}></input>
      <Table users = {filtredUsers}/>    
      
    </div>
  );
}

export default App;