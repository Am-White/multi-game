import React from 'react';
import PlayCircleFilledWhiteTwoToneIcon from '@material-ui/icons/PlayCircleFilledWhiteTwoTone';
import PauseCircleFilledTwoToneIcon from '@material-ui/icons/PauseCircleFilledTwoTone';
// import onClick from './container';
import { green } from '@material-ui/core/colors';
import { motion} from "framer-motion"
import './container';



 const StartButton = ({startGame, toggle, isActive, setisActive}) => (

      <motion.button
            onClick={() => {startGame(); toggle();}}
            className={`startBtn btn-primary btn-primary-${
            isActive ? "active" : "inactive"
            }`}    
            whileHover={{ scale: 2 }}
            whileTap={{ scale: 2 }}
            > 
            {isActive ? 
            <PauseCircleFilledTwoToneIcon 
            fontSize="large"/>
            : 
            <PlayCircleFilledWhiteTwoToneIcon 
            fontSize="large" 
            style={{ color: green[500] }}/>}
        </motion.button>
 )

export default StartButton