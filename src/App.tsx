import React, { useState } from 'react';
import './App.css';

import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';

function App() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);

  const buttonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true)
    axios
      .get('https://dadjoke-flask-api.herokuapp.com/dadjoke')
      .then(({data}) => {
        setJoke(data.joke)
        setLoading(false)
      }) 
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <div>
        <p>{joke}</p>
        <LoadingButton loading={loading} variant="outlined" onClick={event => buttonClickHandler(event)}>
          Dad Joke
        </LoadingButton>      
      </div>
    </div>
  );
}

export default App;
