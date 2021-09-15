import './App.css';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button'
import { makeStyles, Table } from '@material-ui/core';
import GamepadOutlinedIcon from '@material-ui/icons/GamepadOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import getAllGames from './data/fauna-queries';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  },
}));

export default function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link className="App-link" to="/">Welcome Page</Link>
              </li>
              <li>
                <Link className="App-link" to="/home">Home</Link>
              </li>
              <li>
                <Link className="App-link" to="/add">Add</Link>
              </li>
            </ul>
          </nav> 
        </header>
        <div className="App-wrapper">
          <Switch>
            <Route exact path="/">
              <h2>Welcome</h2>
            </Route>
            <Route path="/home">
              <Main />
            </Route>
            <Route path="/add">
              <Add />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

function Main() {
  const classes = useStyles();
  const [games, setGames] = useState([]);

  useEffect(() => {
    getAllGames.then(res => {
      /*Object.values(res).values;*/
      let val = [];
      for (const [key, value] of Object.entries(res)){
        val.push(JSON.stringify(value["data"]))
      }
      console.log(val)
      setGames(val);
    })
  }, []);

  return (
    <div className="Home">
      <header className="Home-header">
        <h2>Home</h2>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={ classes.button }
          startIcon={<GamepadOutlinedIcon />}
        >
          <Link to="/add">
            Add Game
          </Link>
        </Button>
        {/* Make table for Games */}
        <Table>
          <tr>
            <th>Title</th>
            <th>Developer</th>
            <th>Last Updated</th>
            <th>Version</th>
          </tr>
          {games && games.map(game => (
            <tr>
              <td>{JSON.parse(game).title}</td>
              <td>{JSON.parse(game).developer}</td>
              <td>{JSON.parse(game).updated}</td>
              <td>{JSON.parse(game).version}</td>
            </tr>
          ))}
        </Table>
        <Switch>
          <Route path="/add">
            <Add />
          </Route>
          <Route path="/edit">
            <Edit />
          </Route>
        </Switch>
      </header>
    </div>
  );  
}

function Edit() {
  const classes = useStyles();

  return (
    <div className="Edit">
      <header className="Edit-header">
        <h2>Edit</h2>
        {/* Form for Edit */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={ classes.button }
          startIcon={<SaveOutlinedIcon />}
        >
          <Link to="/home">
            Save Edit
          </Link>
        </Button>
        <Switch>
          <Route path="/home">
            <Main />
          </Route>
        </Switch>
      </header>
    </div>
  );  
}

function Add() {
  const classes = useStyles();

  return (
    <div className="Add">
      <header className="Add-header">
        <h2>Add</h2>
        {/* Form for Add */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={ classes.button }
          startIcon={<SaveOutlinedIcon />}
        >
          <Link to="/home">
            Save Game
          </Link>
        </Button>
        <Switch>
          <Route path="/home">
            <Main />
          </Route>
        </Switch>
      </header>
    </div>
  );  
}