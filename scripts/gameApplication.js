$(function() {
    function hideAllPages(){
        let pages =$('.appPage');
        for (let p of pages){
            $(p).removeClass('show');
            $(p).addClass('hidden')
        }
    }

    $(".nav-link").click(function(){
        let pageNumber = $(this).data('section');
        hideAllPages();
        $(`#page-${pageNumber}`).addClass('show');
        $(`#page-${pageNumber}`).removeClass('hidden');
    });

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

    function getRandomInt(min,max,exclude) {
        let result =Math.floor(Math.random() *(max-min) + min);
        if( result >= exclude){
            result++;
        }
        return result;
    }

    let randomPokemonId = [];
    while (randomPokemonId.length < 100) {
        let number = getRandomInt(1,386,0);
        if (randomPokemonId.indexOf(number) === -1) {
            randomPokemonId.push(number)
        }
     }
     
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

    
    function initializeMapWithUserPosition() {
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

                async function InitializePokemon() {
                    const allPromises = []
                    for (let i of randomPokemonId) {
                        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
                        allPromises.push(await fetch(url).then((response) => {
                            return response.json();
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
                let pokemonMarkers=[];
                let getResults=[];
                let playerPokemon=[];
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

                console.log(pokemonMarkers)
                function getValidPokemon(){
                    let playerMarkerPosition = playerMarker.getLatLng();
                    $("#detect-pokemon").click(function(){
                        pokemonMarkers.forEach((element,index)=>{
                            let pokemonLat = element._latlng.lat
                            let pokemonLng = element._latlng.lng
                            if(playerMarkerPosition.distanceTo([pokemonLat,pokemonLng])<=200){
                                console.log(playerMarkerPosition.distanceTo([pokemonLat,pokemonLng]));
                                getResults.push(element);
                                pokemonMarkers.splice(index,1);
                            }
                        })
                        if(getResults.length===0){
                            $('#log-box').html(`<h3 style="font-family:Pokemon GB,sans-serif;font-weight:bold;">You are out of luck ! There are no pokemon nearby!</h3>`)
                        }else{
                            $('#log-box').html(`<h3 style="font-family:Pokemon GB,sans-serif;font-weight:bold;">There are ${getResults.length} pokemons nearby!</h3>`)
                        }
                    })
                }
                        
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
                    }
                    else{
                        $('#log-box').html(`<h3 style="font-family:Pokemon GB,sans-serif;font-weight:bold;">${getResults[0].pokemon.name} has escaped! It is now gone forever!</h3>`)
                        getResults[0].remove();
                        getResults.shift();
                    }
                }

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
                        }else{
                            $('#log-box').html(`<h3 style="font-family:Pokemon GB,sans-serif;font-weight:bold;">ERROR: No Pokemon To Catch!</h3>`)
                        }
                    })
                }

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
                console.log(getResults);
                console.log(pokemonMarkers);
            })
        } else {
            alert('Geolocation service has failed, unable to retrieve your location')
        }
    }
    initializeMapWithUserPosition()
})
