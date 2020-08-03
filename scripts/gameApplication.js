$(function() {
    // Implements Functionality for Single Page Application
    // Function used to hide the other pages
    function hideAllPages(){
        let pages =$('.appPage');
        for (let p of pages){
            $(p).removeClass('show');
            $(p).addClass('hidden')
        }
    }
    // Functionality for game window buttons
    $(".nav-link").click(function(){
        let pageNumber = $(this).data('section');
        hideAllPages();
        $(`#page-${pageNumber}`).addClass('show');
        $(`#page-${pageNumber}`).removeClass('hidden');
    });
 


    // Function to generate random latitude and longitude for the markers on the map
    function generateRandomLatLng(displayMap) {
        let bounds = displayMap.getBounds();
        let southWest = bounds.getSouthWest();
        let northEast = bounds.getNorthEast();
        let lngSpan = northEast.lng - southWest.lng;
        let latSpan = northEast.lat - southWest.lat;

        let getRandomLng = Math.random() * lngSpan + southWest.lng;
        let getRandomLat = Math.random() * latSpan + southWest.lat;

        return [getRandomLat, getRandomLng];
    }
    // Function used to randomly generate the pokemon ID
    function getRandomInt(min,max,exclude) {
        let result =Math.floor(Math.random() *(max-min) + min);
        if( result >= exclude){
            result++;
        }
        return result;
    }

    /*
      pokemonTypeNumber allows the user to configure the range of type of pokemons to be spawned.Since there are many generations for pokemon, this variable will help to 
      control the number of types that would be spawned based on their IDs.
      
      numberOfPokemon controls the total amount of pokemon that will be spawned on the map.*/

    // This function will cause random pokemon IDs to be generated and will be stored in the randomPokemonId 
    let randomPokemonId = [];
    const pokemonTypeNumber = 386;
    const numberOfPokemon = 100;
    while (randomPokemonId.length < numberOfPokemon) {
        let number = getRandomInt(1,pokemonTypeNumber,0);
        if (randomPokemonId.indexOf(number) === -1) {
            randomPokemonId.push(number)
        }
     }
     
     // initializes the countdown timer and displays the countdown on the html
     const StartingMinutes = 30;
     let time = StartingMinutes * 60;
    function initializeCountdownTimer(){
        const remainingMinutes = Math.floor(time/60);
        let remainingSeconds = time % 60;
        if(remainingSeconds <10){
            remainingSeconds ='0'+remainingSeconds;
        }
        $('#time-display').html(`${remainingMinutes} : ${remainingSeconds}`)
        time--;
        time = time<0 ? 0:time;
    }
    setInterval(initializeCountdownTimer,1000);

    // Initializes the gameover overlay to be displayed at the end of the game
    function gameOver(){
        $('.overlay').hide()
        setInterval(function(){
            $('.overlay').show();
            $('#pokemon-map').hide();
        },1801000);
    }
    
    // Main function of the game 
    function initializeMapWithUserPosition() {
        // Displays the position of the Player on the map using geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let user_position = [position.coords.latitude, position.coords.longitude]
                let displayMap = L.map('pokemon-map').setView(user_position, 15);
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
                }).addTo(displayMap);

                let playerMarker = L.marker(user_position)
                playerMarker.addTo(displayMap);
                // Setting up the live tracking of the player using the watch functionality of leaflet
                displayMap.locate({
                    watch: true,
                    setView: true,
                    minZoom:13
                }).on("locationfound", (e) => {
                    if (!playerMarker) {
                        playerMarker = L.marker(e.latlng).addTo(displayMap)
                    } else {
                        playerMarker.setLatLng(e.latlng)
                    }
                })
                /*Asynchronous Function used to get data from PokeAPI through axios and mapped to the variable pokemon. The pokemon will be generated based on the IDs contain
                  from the randomPokemonId array.
                */
                async function InitializePokemon() {
                    const allPromises = []
                    for (let i of randomPokemonId) {
                        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
                        allPromises.push(await axios.get(url).then((response) => {
                            return response.data;
                        }));
                    }

                    Promise.all(allPromises).then((searchResults) => {
                        const pokemon = searchResults.map((data) => ({
                            name: data.name,
                            id: data.id,
                            image: data.sprites['front_default'],
                            type: data.types.map((type) => type.type.name).join(', '),
                            abilities: data.abilities.map((ability) => ability.ability.name).join(', ')
                        }));
                        createPokemonMarkers(pokemon)
                    });
                };
                /* 
                pokemonMarkers will contain the markers of pokemon that are generated based on the dictionary data from pokemon.
                getResults will contain the filtered data of markers that are within proximity to the player.
                playerPokemon will contain the pokemon information of pokemon that are caught by the player.
                cheatPokemon will contain the cheat pokemon marker information that is created.

                pokemonCaughtNumber will be the variable to contain the number of pokemon that is caught by the player to be displayed on the my stats page of the game.
                pokemonLeftNumber will be the variable to contain the number of pokemon left on the map that will be updated regularly upon player's actions.
                 */
                let pokemonMarkers=[];
                let getResults=[];
                let playerPokemon=[];
                let cheatPokemon=[];
                let pokemonCaughtNumber = 0;
                let pokemonLeftNumber = 100;
                // Function used to create the markers based on the data from the pokemon variable
                function createPokemonMarkers(pokemon){
                    pokemon.forEach((element)=>{
                        let position = generateRandomLatLng(displayMap)
                        let pokemonIcon = L.icon({
                            iconUrl: `https://pokeres.bastionbot.org/images/pokemon/${element.id}.png`,
                            iconSize: [40, 60],
                            iconAnchor: [22, 94],
                            popupAnchor: [12,90]
                        }) 
                        let m = L.marker(position,{ icon: pokemonIcon }).bindPopup(`<div class="pokemon-details bg-dark" style="display:flex;flex-direction:row;" >
                        <div class="pokemon-image col-sm-6">
                        <img src='https://pokeres.bastionbot.org/images/pokemon/${element.id}.png' style="display:flex;justify-content:center;width:100%;height:80%;max-width:100%;">
                        </div>
                        <div class="text-details text-light col-sm-6" style="display:flex;flex-direction:column;">
                            <h5>Name: ${element.name}</h5>
                            <h5>ID: ${element.id}</h5>
                            <h5>Type: ${element.type}</h5>
                            <h5>Abilities: ${element.abilities}</h5>
                        </div>
                    </div>`);
                    m.pokemon = element;
                    m.addTo(displayMap);
                    pokemonMarkers.push(m);
                    });
                }
                // Implementing the function of the cheat button to allow the cheat pokemon to be spawned. NOTE: This is strictly used to test the catching mechanism of the game and will be disabled upon usage.
                $('#cheat-spawn').click(function(){
                    let spawn_position = user_position
                    let cheatPokemonIcon = L.icon({
                        iconUrl: `https://pokeres.bastionbot.org/images/pokemon/1.png`,
                        iconSize: [40, 60],
                        iconAnchor: [22, 94],
                        popupAnchor: [12,90]
                    })
                    let cheatMarker = L.marker(spawn_position,{ icon: cheatPokemonIcon }).bindPopup(`<div class="pokemon-details bg-dark" style="display:flex;flex-direction:row;" >
                    <div class="pokemon-image col-sm-6">
                    <img src='https://pokeres.bastionbot.org/images/pokemon/1.png' style="display:flex;justify-content:center;width:100%;height:80%;max-width:100%;">
                    </div>
                    <div class="text-details text-light col-sm-6" style="display:flex;flex-direction:column;">
                        <h5>Name: Bulbasaur</h5>
                        <h5>ID: 1</h5>
                        <h5>Type: Grass, Poison</h5>
                        <h5>Abilities: Overgrow</h5>
                    </div>
                </div>`);
                    cheatMarker.addTo(displayMap);
                    cheatPokemon.push(cheatMarker)
                    // pokemonLeftNumber is updated to inform players of the correct count of the markers and to prevent any misleadings.
                    pokemonLeftNumber += 1;
                    $('.pokemon-left').html(pokemonLeftNumber);
                    $("#cheat-spawn").attr("disabled", true);
                })
                // Used to check on the console to ensure that Pokemon Marker Data have indeed been updated into the pokemonMarkers array
                console.log(pokemonMarkers)


                /*
                Function used to validate and get the relevant pokemon that are within the expected proximity from the player to the pokemon. The relevant pokemon will have their data
                transferred to the getResults array.The detector will then check based on the getResults or the cheatPokemon array length and update accordingly whether any pokemon is within
                the player's vicinity.

                Variable playerToPokemonDistance can be configured to adjust the acceptable distance for the player to the pokemon.For the actual gameplay, the value of this would be set to small 
                so that the player will have to actively go to the pokemon location to catch them, but for testing purposes the value has been set to 200 . */ 
                const playerToPokemonDistance = 200;
                function getValidPokemon(){
                    let playerMarkerPosition = playerMarker.getLatLng();
                    $("#detect-pokemon").click(function(){
                        pokemonMarkers.forEach((element,index)=>{
                            let pokemonLat = element._latlng.lat
                            let pokemonLng = element._latlng.lng
                            if(playerMarkerPosition.distanceTo([pokemonLat,pokemonLng])<=playerToPokemonDistance){
                                console.log(playerMarkerPosition.distanceTo([pokemonLat,pokemonLng]));
                                getResults.push(element);
                                pokemonMarkers.splice(index,1);
                            }
                        })
                        if(getResults.length===0 && cheatPokemon.length ===0){
                            $('#log-box').html(`<h3 style="font-family:Pokemon GB,sans-serif;font-weight:bold;">You are out of luck ! There are no pokemon nearby!</h3>`)
                        }else if(cheatPokemon.length>=1){
                            $('#log-box').html(`<h3 style="font-family:Pokemon GB,sans-serif;font-weight:bold;">There are ${cheatPokemon.length} pokemons nearby!</h3>`)
                        }else{
                            $('#log-box').html(`<h3 style="font-family:Pokemon GB,sans-serif;font-weight:bold;">There are ${getResults.length} pokemons nearby!</h3>`)
                        }

                    })
                }
                
                /*Catching function has been set to a 50/50 chance for players to be able to catch the pokemon. If it is a success, a success message will be displayed along with 
                  the details of the pokemon caught. The pokemon data will be transferred to the playerPokemon array for the pokemon to be displayed onto the my Pokemon page. */ 
                function probabilityToCatch(){
                    if(Math.random() <0.5){
                        $('#log-box').html(`<div class="pokemon-catch-success" style="display:flex;justify-content:center;flex-direction:column;">
                                            <h3 style="font-family:Pokemon GB,sans-serif;font-weight:bold;">Success! You have caught ${getResults[0].pokemon.name}!</h3>
                                            <div class="pokemon-image-caught" style="display:flex;justify-content:center;">
                                            <img style="width:50%;height:30vh;" src="https://pokeres.bastionbot.org/images/pokemon/${getResults[0].pokemon.id}.png">
                                            </div>
                                            </div>`);
                        playerPokemon = playerPokemon.concat(getResults);
                        console.log(playerPokemon);
                        displayPlayerPokemon();
                        getResults[0].remove();
                        getResults.shift();
                        pokemonCaughtNumber+=1;
                        pokemonLeftNumber-=1;
                        $('.pokemon-caught').html(pokemonCaughtNumber);
                        $('.pokemon-left').html(pokemonLeftNumber);
                    }
                    else{
                        $('#log-box').html(`<h3 style="font-family:Pokemon GB,sans-serif;font-weight:bold;">${getResults[0].pokemon.name} has escaped! It is now gone forever!</h3>`)
                        getResults[0].remove();
                        getResults.shift();
                        pokemonLeftNumber -=1;
                        $('.pokemon-left').html(pokemonLeftNumber);
                    }
                }
                // Cheating Probability strictly used for testing of catching functionality and to check upon catching of the pokemon, the message on the dialog box is correct.
                /* FURTHER NOTE: Cheat pokemons will not be added to the player pokemon box and will not be updated as pokemon caught. This is to ensure fairness of the game and
                   to allow for fair gameplay of the game.
                */
                function CheatProbability(){
                       $('#log-box').html(`<div class="pokemon-catch-success" style="display:flex;justify-content:center;flex-direction:column;">
                                            <h3 style="font-family:Pokemon GB,sans-serif;font-weight:bold;">Success! You have caught Bulbasaur!</h3>
                                            <div class="pokemon-image-caught" style="display:flex;justify-content:center;">
                                            <img style="width:50%;height:30vh;" src="https://pokeres.bastionbot.org/images/pokemon/1.png">
                                            </div>
                                            </div>`);
                        pokemonLeftNumber-=1;
                        $('.pokemon-left').html(pokemonLeftNumber);
                        cheatPokemon[0].remove();
                        cheatPokemon=[];
                }
                /* Function used to catch the pokemon. In the event that there are multiple pokemons within the vicinity of the player that is picked up by the detector,
                   only the first pokemon in the getResults array will be considered and the rest will be then populated back into PokemonMarkers to ensure updated reading from
                   the detector. 
                   
                   Additionally, the function is also used to test for catching of the cheat Pokemon to check that the catching mechanism is running properly.*/
                function catchPokemon(){
                    $('#catch-pokemon').click(function(){
                        $('#log-box').html(`<h3 style="font-family:Pokemon GB,sans-serif;font-weight:bold;">Catching in Progress......</h3>`)
                        if(getResults.length > 1){
                            pokemonMarkers = pokemonMarkers.concat(getResults.slice(1,getResults.length));
                            getResults.length = 1;
                            setTimeout(probabilityToCatch,3000);
                            console.log(getResults);
                        }else if(getResults.length === 1){
                            setTimeout(probabilityToCatch,3000);
                            console.log(getResults);
                        }else if(cheatPokemon.length ===1){
                            setTimeout(CheatProbability,3000);
                        }else{
                            $('#log-box').html(`<h3 style="font-family:Pokemon GB,sans-serif;font-weight:bold;">ERROR: No Pokemon To Catch!</h3>`)
                        }
                    })
                }
                // Function used to display the pokemon sprite on the My Pokemon Page 
                function displayPlayerPokemon(){
                    playerPokemon.forEach((element)=>{
                        $('.pokemon-area').append(`
                        <img src="${element.pokemon.image}">
                        `)
                    })
                    playerPokemon = [];
                }


                InitializePokemon();
                getValidPokemon();
                catchPokemon();
                gameOver();
                console.log(getResults);
                console.log(pokemonMarkers);
            })
        } else {
            alert('Geolocation service has failed, unable to retrieve your location')
        }
    }
    initializeMapWithUserPosition()
})
