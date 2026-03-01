export class Geolocator {
    constructor() {

    }

    // resolve through promise
    async getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(function(position){
                console.log("this is position");
                console.log(position);
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
                // resolve
                resolve({"latitude": lat, "longitude": long});
            }, function() {
                console.log("error");
                reject("Error");
            })
        });
    }
    

}

