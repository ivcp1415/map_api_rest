export class Mapa{
    #map
    #latInit
    #longInit
    #markers = [] 
    
    constructor() {
        this.#map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.#map);
    }

    // getters
    get latInit(){
        return this.#latInit;
    } 

    get longInit() {
        return this.#longInit;
    }

    // set view in geolocation point
    setMap(lat, long, alt) {
        this.#map.setView([lat, long], alt);
    }

    // print point
    addMarker(lat, long, popupHTML) {
        const marker = L.marker([lat, long]).addTo(this.#map)
                                .bindPopup(popupHTML)
                                .openPopup();
        this.#markers.push(marker);
    }

    // delete point
    deleteMarkers() {
        this.#markers.forEach(marker=>{
            this.#map.removeLayer(marker);
        })
        this.#markers = [];
    }

}