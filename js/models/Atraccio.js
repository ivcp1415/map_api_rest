import { PuntInteres } from "./PuntInteres.js";

export class Atraccio extends PuntInteres {
    // 1. Make fields private using # so they don't collide with getters/setters
    #horaris;
    #preu;
    #edatMinima;
    #moneda;

    constructor(id, pais, codi, ciutat, nom, direccio, 
                tipus, latitud, longitud, puntuacio, 
                horaris, preu, edatMinima, moneda) {
                    
        super(id, pais, codi, ciutat, nom, direccio, 
                tipus, latitud, longitud, puntuacio);
                
        this.#horaris = horaris;
        this.#preu = preu;
        this.#edatMinima = edatMinima;
        this.#moneda = moneda;
    }

    // 2. Point getters to the private # variables
    get edatMinima() {
        return this.#edatMinima;
    }

    // 3. Remove the word "set" from the function name
    set edatMinima(edat) {
        this.#edatMinima = edat;
    }

    set preu(nouPreu) {
        this.#preu = nouPreu;
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

    preuIva() {
        
    }

    esApteTotPublic() {
        // Fix: Use the getter (this.edatMinima) instead of calling an undefined edat() function
        const edat = this.edatMinima; 
        return edat <= 18;
    }
}