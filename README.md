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
9. PokeAPI
10. Leaflet
11. Geolocation

## Features
### Current Features 
Customizable Parameters Implemented:
1. Type of pokemon : controls the number of different types of pokemon even including recent generation pokemon. However, this is subjected to the availability of the data of PokeAPI
2. Number of Pokemon Spawned : controls the number of pokemon to be spawned within the vicinity of the player
3. Countdown Timer: controls the total time allocated for the gameplay
4. Player to pokemon distance : controls the distance allowed for a player to initiate an action against the pokemon. 

<h4><center>Game Title </center></h4>

![Alt text](/README-images/Homepage.jpg?raw=true "Game Title Page")

* Game Title Page serves as an appropriate presentation of a Pokemon game and allows
players to be immersed in the Pokemon world.
* Blinking animation on the press the pokeball to begin to make the title page more refined.
* Background music implemented to contribute to overall game feel that will happen upon player mouse movement or touch action.

<h4><center>Game Instructions</center></h4>

![Alt text](/README-images/Instructions.jpg?raw=true "Instructions Page")
* Instructions Page have been implemented with animations to incorporate a realistic game feel despite having the game hosted on the browser page
* Players will be greeted by the well-known professor Oak and the three original starter pokemon and the instructions will be displayed in a typewriter fashion to give players a feeling of interaction with professor Oak.
* Players are able to skip the instructions if they wish to and they are able to start the game immediately
* Start button has been animated to be displayed after all the rules have been explained to contribute to the realistic game feel and players will be able to commence the game after that.
* Background music implemented to contribute to overall game feel that will happen upon player mouse movement or touch action.

#### Gameplay Application
* Usage of a single page application for the  gameplay to allow users to have the ability to interact with a working navigation menu as they play the game.

<h4><center>Game Navigation Menu</center></h4>

![Alt text](/README-images/game-menu.jpg?raw=true "Game Navigation Menu")

* Game navigation menu implemented for players to be able to move freely to other areas to check their statistics and the pokemon that they have captured.

<h4><center>Map Visualisation</center></h4>

![Alt text](/README-images/Map-Image.jpg?raw=true "Map Display")
* At all times players will be able to view their location with the unique marker and their location will be tracked using the watch feature of leaflet. 
* Random pokemon markers are spanwed everywhere within the vicinity of the player and they are clickable markers that will display the pokemon's information when clicked.

<h4><center>Catching Mechanism</center></h4>

![Alt text](/README-images/catch-example.jpg?raw=true "Catching Example")
* Players will interact with two buttons constantly with the option to catch the pokemon if the pokemon is detected through the detector.
* Functional dialog-box will display the message and update to players throughout the game to give players an interactive feel.

<h4><center>Pokemon Captured Display</center></h4>

![Alt text](/README-images/pokemon-box.jpg?raw=true "Player Pokemon")
* Players are able to have a visual look of the pokemon that they have captured through the sprites.

<h4><center>Player Statistics Display</center></h4>

![Alt text](/README-images/player-statistics.jpg?raw=true "Player Statistics")
* Players will their stats updated and they can view how many pokemon are left as well as how many they have caught. The stats will be updated accordingly upon each player's action.


### Possible Features to Consider For Improvement
* Implementation of other types of pokeballs for each with varying probability to catch a pokemon
* Allow random pokemon to spawn randomly but at locations whereby the player will not be in any dangerous areas
* Implementation of berry system which can increase the probability of a user to catch a pokemon
* Allow for multiplayer experience whereby players can use their pokemon for battle with other players

## Testing
Automated Testing was not used for this project. All testing was done manually with different personal devices along with the using the browser in-built inspector function.

### Personal Platforms
Browsers considered: Google Chrome, Mozilla Firefox
Mobile Platform: Pocophone F1
Tablet Platform: IPad


### (1) Game Title Page
|   Areas to Check   	|                               Observations                               	| Passed Expectation (passed/failed) 	|
|:------------------:	|:------------------------------------------------------------------------:	|:----------------------------------:	|
| Background Music   	| Background music played upon mouse movement action                       	|               passed               	|
| Blinking Animation 	| Blinking instruction was seen for press the pokeball to begin            	|               passed               	|
| Pokeball Button    	| Clicking the centre of the pokeball will direct to the instructions page 	|               passed               	|

### (2) Instructions Page
|   Areas to Check   	|                               Observations                               	| Passed Expectation (passed/failed) 	|
|:------------------:	|:------------------------------------------------------------------------:	|:----------------------------------:	|
| Background Music   	| background music played upon mouse movement action                       	|               passed               	|
| Blinking Animation 	| blinking instruction was seen for press the pokeball to begin            	|               passed               	|
| Pokeball Button    	| clicking the centre of the pokeball will direct to the instructions page 	|               passed               	|

### (3) Game Application Page
|        Areas to Check       	|                                                                                                                 Observations                                                                                                                 	| Passed Expectation (passed/failed) 	|
|:---------------------------:	|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:	|:----------------------------------:	|
| Working Navigation Menu     	| Navigation Menu allows the player toggle to the correct window.                                                                                                                                                                              	|               passed               	|
| Map Display                 	| Map will center on the player location and pokemon markers are spawned at random locations.                                                                                                                                                  	|               passed               	|
| Map Tracking                	| Map will update the player location as the player moves                                                                                                                                                                                      	|               passed               	|
| Functional Pokemon Markers  	| Clicking on the pokemon marker will display information on the pokemon                                                                                                                                                                       	|               passed               	|
| Catching Mechanism          	| Using a button to fix a pokemon with a 100% catch rate probability at the player's location, the pokemon was able to be detected and captured and the text-box was updated accordingly and the correct information was displayed             	|               passed               	|
| Dialog-Box                  	| - Displays the correct error messages if catch was pressed before any pokemon detected. - Displays the correct message if the pokemon is not successfully captured.                                                                          	|               passed               	|
| Pokemon Box                 	| Pokemon sprite is shown in the pokemon box if the player manages to capture that pokemon.                                                                                                                                                    	|               passed               	|
| Player Statistics           	| - Player Statistics are updated accordingly if a player manages to capture a pokemon and the correct pokemon left number is displayed as well.  - Upon failure to capture a pokemon, the total number of pokemon left will also be deducted. 	|               passed               	|
| Game Over Overlay           	| Tested Game Over Overlay with a short countdown timer, the overlay was shown along with the player statistics and an option to start over the game                                                                                           	|               passed               	|
| Try Again Button            	| Try again button takes the player to the game title page again                                                                                                                                                                               	|               passed               	|



### Bugs
* If there are multiple pokemon of more than 3 that are detected within the vicinity of the player and the player initializes the catch button, the player will hit the detector again to find that the number is incorrect. The player will have to click on the detector button continuously until the correct number is shown and they will have to use the map as a visual guide.

* There might be a delay for the pokemon markers to appear on the leaflet map and players may not be able to see any pokemon appearing on the map initially

* GPS update on leaflet might take a long time to update  at times or not update at all as this is dependent  on the location of where the player is at the time which could affect the overall gameplay.


* Players might encounter all the pokemon markers clustering near the player and at other times pokemon markers are more spread apart within  the map, this can affect the overall feel of the gameplay.


## Deployment
* During the entire process of development, Google Chrome was used as the browser for viewing and checking of progress, while the coding process was done on Visual Studio Code

* For the checking of mobile responsiveness, the game was hosted on github pages to be viewed on the Pocophone F1 to check on a real device, while for other types of mobiles, it was viewed through the inspector function of google chrome.

* The whole game is deployed using Github pages and it utilizes the master branch of the repository. The game can be accessed [here](https://l0nelyhermit.github.io/Pokemon-Battlegrounds/).

* You may also prefer to fork the repository or clone the repository for your own viewing.




## Credits
### Content and Media


### Acknowledgements

