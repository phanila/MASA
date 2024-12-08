import {Request, Response} from 'express';

// Funkcja do pobrania i sparsowania dokumentu HTML
async function fetchHTML(url) {
    try {
        // Pobierz zawartość HTML jako tekst
        const response = await fetch(url);
        const htmlText = await response.text();

        // Zamień tekst HTML na dokument DOM
        const parser = new DOMParser();
        return parser.parseFromString(htmlText, "text/html");
    } catch (error) {
        console.error("Błąd podczas pobierania HTML:", error);
    }
}

// Wywołanie funkcji
fetchHTML("https://example.com");


export class UserController {

    static getWeather = async (req: Request, res: Response) => {
        const {lat} = req.lat;
        const {lon} = req.lon;

        type Weather = {
            clouds: number;
            visibility: number;
            humidity: number;
            moon: number;
            planet: string[];
            magnitude: number;
            sunrise: string;
            sunset: string;
        }
        let doc;
        let weather: Weather;

        fetchHTML("https://clearoutside.com/forecast/"+ lat + "/" + lon).then(doc => {
            doc = doc;
        });

        if (doc) {
            const clouds_span = doc.querySelector("Total Clouds").textContent;
            const clouds = clouds_span.textContent;
            weather.clouds = clouds.match("\d+/");

            const visibility_span = doc.querySelector("Visibility").textContent;
            const visibility = visibility_span.textContent;
            weather.visibility = visibility.match("\d+/");

            const humidity_span = doc.querySelector("Humidity").textContent;
            const humidity = humidity_span.textContent;
            weather.humidity = humidity.match("\d+/");

            const moon_span = doc.querySelector("moon_percentage").textContent;
            const moon = moon_span.textContent;
            weather.moon = moon.match("\d+/%");

            const magnitude_span = doc.querySelector("bortle").textContent;
            const magnitude = magnitude_span.textContent;
            weather.magnitude = magnitude.match("/Class (\d+)/")[1];

            const sunrise_span = doc.querySelector("daylight").textContent;
            const sunrise = sunrise_span.textContent;
            weather.sunrise = moon.match("\d+ /: \d+");

            const sunset_span = doc.querySelector("daylight").textContent;
            const sunset = sunset_span.textContent;
            weather.sunset = moon.match("\d+ /: \d+");

            return weather;



        }
    }

}