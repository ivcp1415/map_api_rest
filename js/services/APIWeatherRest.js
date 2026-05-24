import { URLS } from "../utils/consts.js";

export class APIRestWeather {

    constructor() {

    }

    async getWeather(latitude, longitude) {
        try {
            if(!latitude || !longitude) {
                return { status: "False", msg: "No coordinates provided"};
            }

            const url = `${URLS.WEATHER}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            // fetch result
            const result = await fetch(url);

            if (!result.ok) {
                // return error
                throw new Error("Error fetching url");
            }

            const data = await result.json();
            console.log("weather", data);

            return data.current_weather;
        } catch (error) {
            // throw error 
            throw Error(error);
        }
    }
}