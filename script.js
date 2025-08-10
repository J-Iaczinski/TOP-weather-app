const API_KEY_UNSPLASH = '5Ob5jOnGrpWiS0nqK22ThkfqSijkofUEdZLEMZcGsEM';

//This get the background image from location
//`https://api.unsplash.com/search/photos?query=${city}&per_page=1&client_id=${apiKey}`

async function getImage(location) {
   const API_KEY_UNSPLASH = '5Ob5jOnGrpWiS0nqK22ThkfqSijkofUEdZLEMZcGsEM';

   const API_URL = 'https://api.unsplash.com/photos/random?query=';

   try {
      const response = await fetch(
         `${API_URL}${location}&client_id=${API_KEY_UNSPLASH}`
      );

      const data = response.json();
      console.log(data);
      return data;
   } catch (error) {
      alert(error.message);
   }
}

async function showImg(location) {
   const imgData = await getImage(location);

   if (getImage) {
      const imageUrl = imgData.urls.full;
      document.body.style.backgroundImage = `url(${imageUrl})`;
   }
}

// This get the information about the city
async function getWeather(location) {
   const API_KEY = '9DU9PB7XPQ9S3V8FRLED5TWGU';

   const API_URL =
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

   const UNIT = 'unitGroup=metric';

   try {
      const response = await fetch(
         `${API_URL}/${location}/next5days?${UNIT}&key=${API_KEY}&contentType=json`
      );

      if (!response.ok) {
         if (!response.ok) {
            if (response.status === 404)
               throw new Error('Cidade não encontrada');
            if (response.status === 401) throw new Error('API Key inválida');
            throw new Error(`Erro ${response.status}: Problema na API`);
         }
      }
      const data = await response.json();
      console.log(data);
      return data;
   } catch (err) {
      alert(err.message);
   }
}

async function showWeather(location) {
   const weatherData = await getWeather(location);
}

function formHandler() {
   const form = document.querySelector('form');
   const input = document.querySelector('#location');

   form.addEventListener('submit', (e) => {
      e.preventDefault();
      showImg(input.value);
   });
}

formHandler();
