export class LlistaPuntsInteres {
    // this is attribute list with set
    #points = [];
    #types = new Set();

    constructor() {
        this.#types.add("Tots");
    }

    get points() {
        return this.#points;
    }

    // Delete all points
    deleteAll() {
        this.#points = [];
    }

    filterByType(points, loadPoints, displayPoints) {
        // display none set list to null
        const selectedType = document.getElementById("typeFilter").value;
        const list = []

        // load points
        //loadPoints(list);
        // displayPoints
        //displayPoints(list);


        console.log("The selected type is:", selectedType); 
        // 2. then get new list by filtering the ORIGINAL list
        //If "Tots" is selected, it returns true for everything.
        // Otherwise, it filters by the specific type selected.
        const filteredList = points.filter(point => 
            selectedType === "Tots" || point.tipus === selectedType
        );

        console.log("this is filtered list");
        console.log(filteredList);
        // load points 
        loadPoints(filteredList);
        displayPoints(filteredList);
    }

    filterByName(points, loadPoints, displayPoints) {
        // display none set list to null
        const searchText = document.getElementById("nameFilter").value;
        const list = []

        // load points
        //loadPoints(list);
        // displayPoints
        //displayPoints(list);


        console.log("The selected type is:", searchText); 
        // 2. then get new list by filtering the ORIGINAL list
        //If "Tots" is selected, it returns true for everything.
        // Otherwise, it filters by the specific type selected.
        const filteredList = points.filter(point => {
            // Check if the point's name (lowercased) contains the search text (lowercased)
            // Note: If searchText is "", .includes() automatically returns true and shows everything!
            return point.nom.toLowerCase().includes(searchText);
        });

        console.log("this is filtered list");
        console.log(filteredList);
        // load points 
        loadPoints(filteredList);
        displayPoints(filteredList);
    }

    filterByAsc(points, loadPoints, displayPoints) {
        // display none set list to null
        const order = document.getElementById("sortOrder").value;

        // create copy
        const sortedList = points.slice();

        sortedList.sort((a,b) => {
            // check if name is greater than in case of "asc" or "desc"
            if (order === "asc") {
                // Ordena de forma alfabètica (Ascendent)
                if (a.nom > b.nom) return 1;
                if (a.nom < b.nom) return -1;
                return 0; // Return 0 if they are exactly the same
            } else {
                // Ordena de forma alfabètica (Descendent)
                if (a.nom > b.nom) return -1;
                if (a.nom < b.nom) return 1;
                return 0;
            }
        });

        // load points 
        loadPoints(sortedList);
        displayPoints(sortedList);
    }

}

export const interestList = new LlistaPuntsInteres();