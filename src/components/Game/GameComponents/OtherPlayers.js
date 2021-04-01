import {React} from "react";
import Card from "./Card";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    
    opponentHand: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      width: '100px',
      margin: 'auto',
      justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: '20px',
    },

  }));
const OtherPlayers = (props) => {
    // Especting a array of players in props, array is of objects containing username and array of cards in hand
    const classes = useStyles();
    return(
        <Box className = {classes.root}>
        {
        props.players.length > 0 &&
            props.players.map((m)=>{
                return(
            <Box className = {classes.opponentHand}>
                <div className = {classes.text}>{m.username}</div>
                <div><Card color = "purple" value = "UNO" size = "small"/></div>
                {/* Card is a placeholder for when we get a back of card finalized */}
                <div className = {classes.text}>{m.hand.length} card(s) in hand</div>
            </Box>)
            })
        }
        </Box>
    )
}

export default OtherPlayers