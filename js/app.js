import {Mapa} from "./services/Mapa.js";
import { LATITUDE, LONGITUDE, EXCEL} from "./utils/consts.js";
import { Geolocator } from "./services/Geolocator.js";
import { CSVReader } from "./services/CSVReader.js"
import { Components } from "./services/Components.js";
import { typeSet } from "./utils/consts.js";
import { LlistaPuntsInteres } from "./services/LlistaPuntsInteres.js";
import { APIRestCountry } from "./services/APIRestCountry.js";
import { APIRestWeather } from "./services/APIWeatherRest.js";

const dropZone = document.querySelector(".dropZone");


const interestClass = new LlistaPuntsInteres();
const map = new Mapa();
let interestList = [];
// maybe do it statically
const csvReader = new CSVReader();
const deleteAllBtn = document.querySelector(".clear-list");
const listDiv = document.querySelector(".container-punt-interes");
const counter = document.querySelector(".numTotal");
const typeFilterSelect = document.getElementById("typeFilter");
const nameFilter = document.getElementById("nameFilter");
const orderFilter = document.getElementById("sortOrder");

console.log("init")
// promise, await 
// it doesn't use promises 
// but it can, if we apply 
const initPosition = async () => {
    // init geolocalizer
    const geolocator = new Geolocator();
    try {
        const position = await geolocator.getCurrentPosition();
        const lat = position["latitude"];
        const long = position["longitude"];
        console.log(lat);
        console.log("Function working");
        map.addMarker(lat, long, "My position");
    } catch(e) {
        console.log("Error");
        map.addMarker(LATITUDE, LONGITUDE, "Default position");
    }
}

initPosition();


console.log("final");

//map.addMarker(41.4, 2.1, "lloc d'or");

map.setMap(51.4, 2.1, 5);  

// display list
const displayPoints = (points) => {
    console.log("inside display");
    console.log(points);
    // delete all points
    map.deleteMarkers();    

    // iterate over points and add them with some map function
    for (let point of points) {
        // create popup
        // pass interestList and loadPoints function to delete element and update
        const comp = new Components(interestList, loadPoints, displayPoints);

        // get component popup for poitn
        const popup = comp.createPopup(point);

        // add the point
        map.addMarker(point.latitud, point.longitud, popup);
    }
} 

/*
*   Loads and display api rest fetched data
*   
*/
const loadAPI = async (code, lat, long) => {
    console.log("variables", code, lat, long);

    try {
        // displayApi 1
        const weatherFetch = new APIRestWeather();
        const weather = await weatherFetch.getWeather(lat, long);

        // display country
        const countryFetch = new APIRestCountry();
        const country = await countryFetch.getInfoCountry(code);

        const comp = new Components(interestList, loadPoints, displayPoints);
        comp.createFlag(country);
        comp.createWeather(weather);
    } catch (error) {
        throw Error(error);     
    }

}

const pokeApi = async (id) => {
        try {
            if(!id) {
                console.log("No id found")
            }

            url = `https://pokeapi.co/api/v2/pokemon/2`
            // fetch result
            const result = await fetch(url);

            if (!result.ok) {
                // return error
                throw new Error("Error fetching url");
            }

            const data = await result.json();
            console.log("pokemon", data);

            return data.name;
        } catch (error) {
            // throw error 
            throw Error(error);
        }
}

const pokemon = await pokeApi(2);
console.log(pokemon);


const loadPoints = (points) => {
    // get div
    console.log("listDiv" + listDiv);
    console.log(listDiv);
    listDiv.textContent = "";

    if (points.length == 0) {
        listDiv.textContent = "No hi ha informació per mostrar";
    }
    
    if (!points) listDiv.textContent = "No hi ha informació per mostrar";
    // iterate over and create components
    const comp = new Components(points, loadPoints, displayPoints);

    for (let point of points) {
        // create component object to load components

        const type = point.tipus;

        let componentType;
        // get component popup for point based on type
        switch(type.toLowerCase()) {
            case "museu":
                console.log(comp.createMuseuDiv(point));
                componentType = comp.createMuseuDiv(point);
                break;
            case "espai":
                componentType = comp.createEspaiDiv(point);
                break;
            case "atraccio":
                componentType = comp.createAtraccioDiv(point);
                break;
        }

        if (!componentType) {
            console.log(`Component for this point not found. Skipping ${point}`);
            continue;
        }

        listDiv.appendChild(componentType);
    }  
    
    // update number of elements
    counter.textContent = `Número total: ${points.length}`;
} 

dropZone.addEventListener("dragover", (event)=>{
    // tell browser not to do anything
    event.preventDefault();

    console.log("file detected");
});

dropZone.addEventListener("drop", async (event)=>{
    // tell browser not to do anything
    event.preventDefault();
    console.log("file is dropped");

    // process csv
    try {
        interestList = await csvReader.processCSV(event);
        const comp = new Components(interestList, loadPoints, displayPoints);

        const tipusUnics = new Set(interestList.map(point => point.tipus));
        comp.extractTypeSet(tipusUnics);

        console.log("hola before laod" + interestList);
        console.log("interestList[0]", interestList[0]);
        console.log(interestList[0].codi)
        // call apirest load
        loadAPI(interestList[0].codi, interestList[0].latitud, interestList[0].longitud);

        // load filter poitns
        loadPoints(interestList);

        // display points
        displayPoints(interestList);
    } catch (error) {
        console.log("Error " + error);
    }

});

deleteAllBtn.addEventListener("click", () =>{
    // delete all
    interestList = [];
    displayPoints(interestList);
    map.deleteMarkers();
    listDiv.textContent = "No hi ha informació per mostrar";
    // update number of elements
    counter.textContent = `Número total: ${interestList.length}`;
});


function applyFilters() {
    
}

typeFilterSelect.addEventListener("change", ()=>{
    interestClass.filterByType(interestList, loadPoints, displayPoints);
});

nameFilter.addEventListener("input", () =>{
    interestClass.filterByName(interestList, loadPoints, displayPoints);
})

orderFilter.addEventListener("change", () =>{
    interestClass.filterByAsc(interestList, loadPoints, displayPoints);
})



