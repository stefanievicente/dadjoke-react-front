import React, { useState } from 'react';
import './App.css';

import axios from 'axios';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

function App() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const buttonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true)
    axios
      .get('https://dadjoke-flask-api.herokuapp.com/dadjoke')
      .then(({data}) => {
        throw err
        setJoke(data.joke);
        setLoading(false); 
      }) 
      .catch(err => {
        console.log(err);
        setJoke('Something went wrong :( Try again!')
        setErr(true);
        setLoading(false); 
      })
  }

  return (
    <div className="App">
      <Box className="Box">
        <Paper elevation={6} className="Paper"> 
          <Typography variant="h4" className="Title">Dad Joke</Typography>
          <Typography variant="body1" className={`Joke ${err ? "Error" : ""}`} >{joke}</Typography>
          <LoadingButton loading={loading} 
            variant="outlined" 
            style={{
              margin: '15px'
            }}
            onClick={event => buttonClickHandler(event)}>
              Make me laugh
          </LoadingButton>  
        </Paper>    
      </Box>
    </div>
  );
}

export default App;
