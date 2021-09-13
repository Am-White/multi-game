import React from 'react';
import { motion } from "framer-motion";
import {
    Button
} from '@material-ui/core'

 const EndButton = ({endGame, reset}) => {
   return (
         <Button variant="text">
              <motion.p
                className="endBtn"
                animate={{color: ["#000", "#ff2323", "#000"]}}
                transition={{ duration: 4, repeat: Infinity }}
                onClick={() => {endGame(); reset(); }}
                > End Game
              </motion.p>
            </Button>
   )
 }

export default EndButton