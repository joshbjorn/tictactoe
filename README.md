README.md 

Okay, now on to the real stuff (sort of). This game separated into 3 modules: gameBoard, which  contains all the functionality of the board i.e checking to see if the game is won by a player, rendering/reseting the board etc. scoreboard, which tracks the score and declares a winner. And buttons, which trigger the events to get the game rolling.

The game begins with the play button, which creates two new players from the Player() factory function - one representing naughts and the other, crosses. These new naughts and crosses objects have a name, setMarker and score property. These are all used accordingly within the gameboard and scoreboard modules to track the flow of the game and determine a winner. 