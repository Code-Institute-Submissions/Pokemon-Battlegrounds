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

    function getRandomInt(highest) {
        return Math.floor(Math.random() * Math.floor(highest))
    }

    let PokemonNumber = 386;
    let randomPokemonId = [];

    while (randomPokemonId.length < 50) {
        let number = getRandomInt(PokemonNumber);
        if (randomPokemonId.indexOf(number) === -1) {
            randomPokemonId.push(number)
        }
    }


    function initializeMapWithUserPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
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
                // async function getPokemons(){
                //     for(let i=1; i<=PokemonNumber; i++){
                //         const url = `https://pokeapi.co/api/v2/pokemon/${i}`
                //         await fetch(url).then((response)=>{
                //             return response.json();
                //         })
                //         .then((data)=>{
                //             console.log(data);

                //         })
                //     }
                // }
            
                async function getPokemon() {
                    const allPromises = []
                    for (let i = 1; i <= PokemonNumber; i++) {
                        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
                        allPromises.push(fetch(url).then((response) => {
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
                        console.log(pokemon)
                    });
                };

                function createPokemonMarkers() {
                    for (i = 0; i < 50; i++) {
                        let position = generateRandomLatLng(displayMap)
                        let pokemonIcon = L.icon({
                            iconUrl: `https://pokeres.bastionbot.org/images/pokemon/${randomPokemonId[i]}.png`,
                            iconSize: [40, 60],
                            iconAnchor: [22, 94]
                        })
                        L.marker(position, { icon: pokemonIcon }).addTo(displayMap);
                    }
                }
                createPokemonMarkers()
                getPokemon();
            })
        } else {
            alert('Geolocation service has failed, unable to retrieve your location')
        }
    }

    initializeMapWithUserPosition()

})
