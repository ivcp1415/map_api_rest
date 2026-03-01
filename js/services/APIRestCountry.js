export class APIRestCountry {

    constructor() {

    }

    async getInfoCountry(code) {
        try {
            if(!code) {
                return { status: "False", msg: "No code provided"};
            }

            const url =`https://restcountries.com/v3.1/alpha/${code}`;
            // fetch result
            const result = await fetch(url);

            if (!result.ok) {
                // return error
                throw new Error("Error fetching url");
            }

            const data = await result.json();
            console.log("country", data);

            return data[0].flags.png;
        } catch (error) {
            // throw error 
            throw Error(e);
        }
    }
}