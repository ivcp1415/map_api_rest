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

    applyFilters(points, loadPoints, displayPoints) {
        const selectedType = document.getElementById("typeFilter").value;
        const searchText = document.getElementById("nameFilter").value.toLowerCase();
        const order = document.getElementById("sortOrder").value;

        const result = points
            .filter(point => selectedType === "Tots" || point.tipus === selectedType)
            .filter(point => point.nom.toLowerCase().includes(searchText))
            .sort((a, b) => {
                if (order === "asc") return a.nom.localeCompare(b.nom);
                if (order === "desc") return b.nom.localeCompare(a.nom);
                return 0;
            });

        loadPoints(result);
        displayPoints(result);
    }

}

export const interestList = new LlistaPuntsInteres();