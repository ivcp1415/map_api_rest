const getIva = (preu, pais) => {

    if (preu == 0) return "Entrada gratuita";

    if (!IVA[pais]) return preu;

    return preu * IVA[pais];
}