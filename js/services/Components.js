export class Components {
    #interestList;
    #updateUI;
    #updateMap;

    constructor(list, loadPoints, displayPoints) {
        this.#interestList = list;
        this.#updateUI = loadPoints;
        this.#updateMap = displayPoints;
    }

    // create delete button
    createDeleteButton(pointToDelete){
        const btn = document.createElement("button");
        btn.classList.add("delete-btn");

        btn.textContent = "delete";

        btn.addEventListener("click", ()=>{
            // filter out point 
            if (confirm("Estàs segur que vols eliminar el punt d interès?")) {
                const updatedList = this.#interestList.filter(point => point !== pointToDelete);
    
                // updateUI, this load function 
                if (this.#updateUI) {
                    this.#updateUI(updatedList);
                    this.#updateMap(updatedList);
                }
            };
        });

        return btn;
    }

    // create espai
    createEspaiDiv(point) {
        const div = document.createElement("div");
        div.classList.add("interest-item", "espai");

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("item-info");

        const title = document.createElement("h2");
        const p = document.createElement("p");
        const delBtn = this.createDeleteButton(point);

        // set information
        title.textContent = point.nom;
        p.textContent = `Tipus: ${point.tipus}`;

        // append
        infoDiv.appendChild(title);
        infoDiv.appendChild(p);
        
        console.log(div);
        div.appendChild(infoDiv);
        div.appendChild(delBtn);
        return div;
    }

    // create atracció
    createAtraccioDiv(point) {
        const div = document.createElement("div");
        div.classList.add("interest-item", "atraccio");

        const infoDiv = document.createElement("div");
        infoDiv.classList.add("item-info");

        const title = document.createElement("h2");
        const p = document.createElement("p");
        const delBtn = this.createDeleteButton(point);

        // set information
        title.textContent = point.nom;
        p.textContent = `Tipus: ${point.tipus} | Horaris: ${point.getHoraris()} | Preu: ${point.getPreu()}${point.getMoneda()} (No IVA) |
                        Majors de ${point.edatMinima}`;

        // append
        infoDiv.appendChild(title);
        infoDiv.appendChild(p);

        div.appendChild(infoDiv);
        div.appendChild(delBtn);
        return div;
    }


    // create museu
    // create museu
    createMuseuDiv(point) {
        console.log("hello component");
        console.log(point);

        // main wrapper (flex container)
        const mainDiv = document.createElement("div");
        mainDiv.classList.add("interest-item", "museu");

        // 2. The info wrapper (takes up remaining space)
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("item-info");

        // 3. The text elements
        const title = document.createElement("h2");
        const p = document.createElement("p");
        const desc = document.createElement("p");
        
        console.log(desc);

        title.textContent = point.nom;
        p.textContent = `${point.ciutat} | Tipus: ${point.tipus} | Horaris: ${point.getHoraris()} | Preu: ${point.getPreu()}${point.getMoneda()} (No IVA)`;
        desc.textContent = `Descripció: ${point.getDescripcio()}`;

        // Append text TO THE INFO DIV
        infoDiv.appendChild(title);
        infoDiv.appendChild(p);
        infoDiv.appendChild(desc);

        // 4. Create button
        const delBtn = this.createDeleteButton(point);

        // 5. Append info wrapper AND button TO THE MAIN DIV
        mainDiv.appendChild(infoDiv);
        mainDiv.appendChild(delBtn);

        return mainDiv;
    }

    createPopup(point){
        const popupHTML = document.createElement("div");
        popupHTML.classList.add("item-info");

        const h2 = document.createElement("h2");
        h2.classList.add("item-name");

        const ad = document.createElement("p");
        ad.classList.add("item-type");

        const rating = document.createElement("p");
        rating.classList.add("item-rating");      

        h2.textContent = point.nom;
        ad.textContent = point.direccio;
        rating.textContent = `Puntuació: ${point.puntuacio}`;

        popupHTML.appendChild(h2);
        popupHTML.appendChild(ad);
        popupHTML.appendChild(rating);

        console.log(popupHTML);

        return popupHTML;
    }

    extractTypeSet(set) {
        // 1. Select the correct HTML element using its ID from your structure
        const selectTipus = document.getElementById("typeFilter");

        // 2. Clear any existing options (in case the user drops a new CSV file later)
        selectTipus.textContent = "";

        // 3. Create the mandatory "Tots" default option using createElement
        const opcioTots = document.createElement("option");
        opcioTots.value = "Tots";
        opcioTots.textContent = "Tots";
        selectTipus.appendChild(opcioTots);

        // 4. Iterate over the Set and create an <option> for each unique type
        set.forEach(tipus => {
            // Avoid duplicating "Tots" if you happened to add it to the Set earlier
            if (tipus !== "Tots") {
                const opcio = document.createElement("option");
                opcio.value = tipus;
                opcio.textContent = tipus;
                selectTipus.appendChild(opcio);
            }
        });
    }

    createFlag(flag) {
        const spanPais = document.querySelector(".info-pais");

        const imgFlag = document.createElement("img");
        imgFlag.src = flag;
        imgFlag.style.width = "30px"; // Just a bit of styling so it fits
            
        spanPais.innerHTML = ""; // Clear just in case
        spanPais.appendChild(imgFlag);
    }

    createWeather(weather) {
        const spanLloc = document.querySelector(".info-lloc");  
        spanLloc.textContent = `Temperature: ${weather.temperature}ºC - Wind speed: ${weather.windspeed}km/h`;
    }
}