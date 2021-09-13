import React from 'react';
import "./container";
import {
    Button,
    TextField,
} from '@material-ui/core'


 const Input = ({handleInput, setUserInput, userInput}) => {
     return (
     <div>
            <TextField 
              className="input"
              onChange={e => setUserInput(e.target.value)}
              variant="outlined"
              label="Answer"/>

            <br></br>

            <Button 
              className="submit"
              onClick={() => handleInput()}
              variant="outlined"
              color="primary"
              >Submit Answer
            </Button>
    </div>
     )
 }

export default Input