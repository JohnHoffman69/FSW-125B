import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Player from './Player'
import AddPlayer from './AddPlayer'
import './index.css'

function App() {
  const [player, setPlayer] = useState([]);

  const getPlayer = () => {
    axios.get('/players')
    .then(res => {
      setPlayer(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  const addPlayer = newPlayer => {
    axios.post('/players', newPlayer)
      .then(res => setPlayer(prevPlayer => [...prevPlayer, res.data]))
      .catch(err => console.log(err))
  }
  
  const deletePlayer = playerId => {
    axios.delete(`/players/${playerId}`)
      .then(res => {
        setPlayer(prevPlayer => prevPlayer.filter(player => player._id !== playerId))
      })
      .catch(err => console.log(err))
  }

  const editPlayer = (updates, playerId) => {
    axios.put(`/players/${playerId}`, updates)
      .then(res => {
        setPlayer(prevPlayer => prevPlayer.map(player => player._id !== playerId ? player : res.data))
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getPlayer();
  }, []);

  return (
    <div>
      <h1>NFL Player Database</h1>
      <img className='img1' src='https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80' alt='logo' />
      <h2>Find or add an NFL Player</h2>
      <AddPlayer
        submit={addPlayer}
        buttonText={"Post Player"}
      />
      <h2>List of NFL Player</h2>
      {player.map(player =>
        <Player {...player}
        deletePlayer={deletePlayer}
        editPlayer={editPlayer}
        key={player._id}
        />)}
    </div>
  );
}

export default App;
