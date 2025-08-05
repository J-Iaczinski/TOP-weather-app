import API_KEY from "./APIKeys.js";

const API_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

const UNIT = "unitGroup=metric";

async function getWeather(location) {
  try {
    const response = await fetch(
      `${API_URL}/${location}/today?${UNIT}&key=${API_KEY}&contentType=json`
    );

    const data = await response.json();
    console.log(data)
    return data;
  } catch (err) {
    alert("Could not Find this City");
  }
}

async function showWeather(location) {
  const weatherData = await getWeather(location)
  if(weatherData){
    console.log(`O clima em ${location} é ${weatherData.currentConditions.temp} ºC`)

    console.log('Infomações Adcionais: ', weatherData.description)
  }

}

showWeather('florianopolis')
