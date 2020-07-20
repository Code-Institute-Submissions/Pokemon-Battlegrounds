$(function(){
    function initializeMapWithUserPosition(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                let user_position = [position.coords.latitude,position.coords.longitude]
                let displayMap =L.map('pokemon-map').setView(user_position,15);
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
            }).addTo(displayMap);
               let playerMarker = L.marker(user_position).addTo(displayMap);
            })
        }else{
            alert('Geolocation service has failed, unable to retrieve your location')
            }
        }

        function updateUserPosition(){
            function foundLocation(e){
                if(playerMarker){
                    displayMap.removeLayer(playerMarker);
                }
                playerMarker = L.marker(e.latitude,e.longitude);
                playerMarker.addTo(displayMap);
            }

            function ErrorLocation(){
                alert('Error in retrieving your location')
            }

            displayMap.on('locationfound',foundLocation);
            displayMap.on('locationerror',ErrorLocation);

            displayMap.locate({
                watch: true,
                setView:true,
                maxZoom: 20,
                enableHighAccuracy: true
            }
            )
        }

    initializeMapWithUserPosition()
    updateUserPosition()
 
})
