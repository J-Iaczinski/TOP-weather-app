const API_KEY = "9DU9PB7XPQ9S3V8FRLED5TWGU";
const API_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const UNIT = "unitGroup=metric";

async function getWeather(location) {
  try {
    const response = await fetch(
      `${API_URL}/${location}/today?${UNIT}&key=${API_KEY}&contentType=json`
    );

    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
    alert("Could not Find this City");
  }
}

getWeather("florianopolis");
