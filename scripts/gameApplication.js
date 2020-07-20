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

               let playerMarker = L.marker(user_position)
               playerMarker.addTo(displayMap);

               this.displayMap.locate({
                   watch: true,
                   setView:true,
                   maxZoom: 20
               }).on("locationfound", function(e){
                   if(!playerMarker){
                       playerMarker = new L.marker(e.latlng)
                       playerMarker.addTo(displayMap)
                   }else{
                       playerMarker.setLatLng(e.latlng);
                   }
               })
            


            })
        }else{
            alert('Geolocation service has failed, unable to retrieve your location')
            }
        }
    


    initializeMapWithUserPosition()
 
})
