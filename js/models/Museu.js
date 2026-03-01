import { PuntInteres } from "./PuntInteres.js";

export class Museu extends PuntInteres { 
    #horaris;
    #preu;
    #moneda;
    #descripcio;

    // Receive ALL parameters needed for the parent AND the child
    constructor(id, pais, codi, ciutat, nom, direccio, 
                tipus, latitud, longitud, puntuacio, 
                horaris, preu, moneda, descripcio) {
                    
        // Pass the parent parameters to super()
        super(id, pais, codi, ciutat, nom, direccio, 
                tipus, latitud, longitud, puntuacio);
                
        // Assign the child-specific properties
        this.#horaris = horaris;
        this.#preu = preu;
        this.#moneda = moneda;
        this.#descripcio = descripcio;
    }

    getHoraris() {
        return this.#horaris;
    }

    getPreu() {
        return this.#preu;
    }

    getMoneda(){
        return this.#moneda;
    }

    getDescripcio(){
        return this.#descripcio;
    }

    preuIva() {
        
    }
}