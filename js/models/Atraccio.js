import { PuntInteres } from "./PuntInteres.js";
import { IVA } from "../utils/consts.js";

export class Atraccio extends PuntInteres {
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

    get edatMinima() {
        return this.#edatMinima;
    }

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

    // Calculates the price applying IVA if the country code is registered
    #calculatePreu() {
        const preu = parseFloat(this.#preu);
        if (preu === 0) return "Entrada gratuïta";

        const ivaRate = IVA[this.codi];
        if (ivaRate !== undefined) {
            return `${(preu * (1 + ivaRate)).toFixed(2)}${this.#moneda} (IVA)`;
        }
        return `${preu.toFixed(2)}${this.#moneda} (no IVA)`;
    }

    preuIva() {
        return this.#calculatePreu();
    }

    esApteTotPublic() {
        return this.#edatMinima < 18;
    }
}
