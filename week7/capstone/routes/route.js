const express = require('express');
const route = express.Router();
const { v4: uuidv4 } = require('uuid');

// Data
const players = [
    {
        firstName: "Tom",
        lastName: "Brady",
        type: true,
        topScore: 100000,
        team: "Bucs",
        _id: uuidv4()
    },
    {
        firstName: "Patrick",
        lastName: "Mahomes",
        type: true,
        topScore: 950000,
        team: "Chiefs",
        _id: uuidv4()
    },
    {
        firstName: "Russell",
        lastName: "Wilson",
        type: true,
        topScore: 200000,
        team: "Seahawks",
        _id: uuidv4()
    },
    {
        firstName: "Deshaun",
        lastName: "Watson",
        type: true,
        topScore: 900000,
        team: "Texans",
        _id: uuidv4()
    }
]

route
  .get('/', (req, res, next) => {
    res.status(200).send(players);
  }) 

  .get('/:playerId', (req, res, next) => {
    const playerId = req.params.playerId;
    const findPlayer = players.find((player) => player._id === playerId);
    if (!findPlayer) {
      const error = new Error("Not found");
      res.status(500)
      return next(error);
    }
    res.status(200).send(findPlayer);
  }) 

  .get('search/_id', (req, res, next) => {
    const playerId = req.query._id;
    const filteredPlayer = players.filter((player) => player._id === playerId);
    if (!filteredPlayer) {
      const error = new Error("Not found");
      res.status(500)
      return next(error);
    }
    res.status(200).send(filteredPlayer);
  })

  .get('/search/type', (req, res, next) => {
    const type = req.query.type;
    console.log(type);

    if (!type) {
      const error = new Error("Valid type not found");
      res.status(500)
      return next(error);
    }
    const filteredPlayer = players.filter(player => player.type === type);
    res.status(200).send(filteredPlayer);
  }) 

  .post('/', (req, res, next) => {
    const newPlayer = req.body;
    newPlayer._id = uuidv4();
    players.push(newPlayer);
    res.status(201).send(newPlayer);
  }) 

.put('/:playerId', (req, res, next) => {
  const playerId = req.params.playerId;
  const playerIndex = players.findIndex((player) => player._id === playerId);
  Object.assign(players[playerIndex], req.body);
  res.status(201).send("Player Status has been updated");
})

  .delete('/:playerId', (req, res, next) => {
    const playerId = req.params.playerId;
    const playerIndex = players.findIndex((player) => player._id === playerId);
    players.splice(playerIndex, 1);

    res.send("Player has been deleted");
  });

module.exports = route;