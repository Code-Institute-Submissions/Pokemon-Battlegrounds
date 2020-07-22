$(function () {
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
                    setView: true
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
                        catchPokemon(pokemon)
                    });
                };
                pokemonMarkers=[];
                function createPokemonMarkers(pokemon){
                    pokemon.forEach((element)=>{
                        let position = generateRandomLatLng(displayMap)
                        let pokemonIcon = L.icon({
                            iconUrl: `https://pokeres.bastionbot.org/images/pokemon/${element.id}.png`,
                            iconSize: [40, 60],
                            iconAnchor: [22, 94],
                            popupAnchor: [12,90]
                        })
                        pokemonMarkers.push(L.marker(position,{ icon: pokemonIcon }).bindPopup(`<div class="pokemon-details bg-dark" style="display:flex;flex-direction:row;" >
                                                                                <div class="pokemon-image col-sm-6">
                                                                                <img src='https://pokeres.bastionbot.org/images/pokemon/${element.id}.png' style="display:flex;justify-content:center;width:100%;height:80%;max-width:100%;">
                                                                                </div>
                                                                                <div class="text-details text-light col-sm-6" style="display:flex;flex-direction:column;">
                                                                                    <h5>Name: ${element.name}</h5>
                                                                                    <h5>ID: ${element.id}</h5>
                                                                                    <h5>Type: ${element.type}</h5>
                                                                                    <h5>Abilities: ${element.abilities}</h5>
                                                                                </div>
                                                                            </div>`).addTo(displayMap));
                    });
                }
                function catchPokemon(pokemon){
                    let playerPos = playerMarker.getLatLng();
                    pokemon.forEach((element)=>{
                       $('#catch-pokemon').click(function(){
                           for(let i of pokemonMarkers){
                               let pokemonMarker = i.getLatLng();
                               if(playerPos.distanceTo(pokemonMarker)<=30){
                                   $('#log-box').html(`You have tossed a pokeball to ${element.name}`)
                                   setTimeout(function(){
                                       if(Math.random() <0.5){
                                            $('#log-box').html(`<div class="pokemon-catch-success" style="display:flex;justify-content:center;">
                                                                <h1 style="font-family:Pokemon GB,sans-serif;font-weight:bold;">Success! You have caught ${element.name}!</h1>
                                                                <div class="pokemon-image-caught" style="diplay:flex;justify-content:center;">
                                                                <img style="width:50%;height:10vh;" src="https://pokeres.bastionbot.org/images/pokemon/${element.id}.png">
                                                                </div>
                                                               </div>`)
                                            i.remove();
                                            console.log(i);
                                       }
                                       else{
                                           $(`#log-box').html('<h1 style="font-family:Pokemon GB,sans-serif;font-weight:bold;">${element.name} has escaped! It is now gone forever! </h1>`)
                                       }
                                   },6000)

                               }else{
                                   $('#log-box').html('<h1>There are no pokemon at your location!</h1>')
                               }

                           }
                       })
                    })
                }
                InitializePokemon();
            })
        } else {
            alert('Geolocation service has failed, unable to retrieve your location')
        }
    }
    initializeMapWithUserPosition()
})
