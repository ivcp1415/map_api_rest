import { PuntInteres } from "./PuntInteres.js";

export class Espai extends PuntInteres {
    constructor(id, pais, codi, ciutat, nom, direccio, 
                tipus, latitud, longitud, puntuacio){
        super(id, pais, codi, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio)
    }
}