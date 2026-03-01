export class PuntInteres {
    #id
    pais
    codi
    ciutat
    nom
    direccio
    tipus
    latitud
    longitud
    puntuacio
    // i understand this is a sort of constant thats modified when constructor is called
    static totalPuntsInteres = 0

    constructor(id, pais, codi, ciutat, nom, direccio, 
                tipus, latitud, longitud, puntuacio) {
        this.#id = id;
        this.pais = pais;
        this.codi = codi;
        this.ciutat = ciutat;
        this.nom = nom;
        this.direccio = direccio;
        this.tipus = tipus;
        this.latitud = latitud;
        this.longitud = longitud;
        this.puntuacio = puntuacio;
        PuntInteres.totalPuntsInteres++;
    }

    // getters
    get id() {
        return this.#id;
    }

    get codi() {
        return this.codi;
    }

    get ciutat() {
        return this.ciutat;
    }

    // setters
    set setId(id) {
        this.#id = id;
    }

    set setCodi(codi) {
        this.codi = codi;
    }

    set setCiutat(ciutat){
        this.ciutat = ciutat;
    }
    
    // method
    static obtenirTotalElements() {
        return PuntInteres.totalPuntsInteres;
    }
}