import React, { useEffect, useState } from 'react'
import { Footer } from './component/Footer'
import NavBar from './component/NavBar'
import User from './component/User'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { About } from './component/About';
import Album from './component/Album';
import Photo from './component/Photo';


const App = () => {

    const [userData, setUserData] = useState([]);
    const [search, setSearch] = useState("");
    const [filterUser, setFilterUser] = useState([])

    const getUserData = async () => {
      try {
          const url = 'https://jsonplaceholder.typicode.com/users'
          const res = await fetch(url);
          const data = await res.json();
          //console.log(data);
          setUserData(data);
      } catch (error) {
          console.log(`Error : ${error}`);
      }
    }

    useEffect(() => {
        getUserData();
    }, [])

    useEffect(() => {
      setFilterUser(
        userData.filter(user => {
          return user.name.toLowerCase().includes(search.toLowerCase())
        })
      )
    }, [search, userData])

    const deleteUser = (id) => {
      const updatedUser = userData.filter(user => {
        return user.id !== id;
      }) 
      setUserData(updatedUser);
    }

    return (
      <>
        <Router>
          <NavBar/>
          <Switch>
            <Route exact path="/">
                <User filterUser={filterUser} setSearch={setSearch} deleteUser={deleteUser}/>
            </Route>
            <Route exact path="/about">
                <About />
            </Route>
            <Route path="/user/:id" exact component={Album} />
            <Route path="/user/album/:id" exact component={Photo} />
          </Switch>
          <Footer/>
        </Router>
      </>
    )
}

export default App
