# Pokemon Battlegrounds - An interactive Pokemon Game
## Second Project: Interactive Front-End Project

Pokemon Battlegrounds is a web-based game that uses a retro gameboy interface for a nostalgic user experience. Targeted at avid pokemon fans and gamers, the website aims to attract players with its unique gameplay which allows players to be able to capture various pokemon. The web-based game will consist of a starting page, an instructions page and the game application page which is implemented in a single page application style.

## Disclaimer
Pokemon Battlegrounds uses an external API to generate the various pokemons around the map and is not affliated with the Pokemon Company by many means. The copyright that I placed at the starting screen is used to give a more professional look for a game and is by no means an official copyright. In addition, Pokemon Battlegrounds was not intended to be a replica of the widely popular Pokemon GO, but is more of an inspired version of it.
## Strategy 
### Player's Perspective
* For every player, they would like to have a fun and interactive experience that would keep them engaged throughout the duration of the gameplay.

* Since the game is Pokemon-themed, players would have the expectations to have a level of interaction with Pokemon such as having the ability to catch them.

### Game Creator's Perspective
* The game will be able to generate revenue by having space for potential investors who plan to place advertisements.

* Allow every player to have a memorable experience with the game and possibly grow their interest on Pokemon and games.


## UX 
My objective for the game visual design was to follow the outlook of retro gameboy pokemon games such as Pokemon Emerald, Firered and Leafgreen that will give a nostalgic outlook for avid Pokemon fans. For new players who have just stumbled across Pokemon, I hope that the retro design will be a starting point for them in the pokemon universe just as it was for many pokemon fans. 

### Skeleton Structure:
 - Game Title Page
 - Instructions Page
 - Single Page Application:
    1. Map 
    2. Player's Pokemon 
    3. Player's Statistics

### Gameflow Design: 

Upon initializing the website, players will be greeted with the game title page whereby they can proceed with the instructions of the game by clicking on the button located at the centre of the pokeball. At the instructions page, players will be met with professor Oak and the three original starter pokemons and the rules of the game will be explained in a typewriter fashion. At any point of time, players will have the option to skip the instructions by clicking on the Skip Instructions button or to hear finish the explanation. After the rules of the game have been explained, the start game button will appear and players will be asked whether they want to proceed with the actual gameplay.

Once a player has initialized the game, the timer of 30 minutes will start to countdown and this will serve as the pressurizing factor as they have a task to catch as many pokemon as they can within the span of 30 minutes. Using a catch button as well as  a detector button, players will have to use the detector which will detect for pokemon within their vicinity with the assistance of the visual map showing where the pokemon are. If the pokemon is detected it will be displayed in a dialog box which wil show the number of pokemon that has been detected. Afterwards, if the player wishes to capture the pokemon, the player will click on the catch button which would give them a 50% chance of capturing the pokemon. If the pokemon is successfully captured, the pokemon will be removed from the map and will be displayed as a sprite in the player's 'my Pokemon' area, however, if the pokemon is not captured, the player will be informed that the pokemon has escaped.In addition, the player's game statistics will be shown in the 'my stats' area and will accurately inform the player of the number of pokemon that were caught and the total number of pokemon still present within the game. 


After 30 minutes have passed, an overlay will be shown that will indicate to the player that the time is up and the statistics of the player will be displayed along with the option to repeat the game. If the player wishes to play the game again, the player will be redirected to the game title page in the event they wish for further clarification of instructions.

#### Multiple Pokemon detected

In the event that multiple pokemons are detected through the detector, when the player clicks on the catch button, only one pokemon will be caught at a time. The player will need to click on the detector again to get an updated count on the number of pokemons within the player's vicinity before clicking on the catch button to capture the remaining pokemon.



## Technologies Used
1. HTML
2. CSS
3. Bootstrap (4.5)
4. Javascript
5. Typewriter JS
6. Axios
7. OnlineWebFonts(Pokemon GB Font)
8. JQuery

## Features
### Current Features 
1. 



### Features Left to Implement



## Testing

### Bugs


## Deployment


## Credits
### Content and Media


### Acknowledgements

