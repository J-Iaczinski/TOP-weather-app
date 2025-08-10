const API_KEY_UNSPLASH = '5Ob5jOnGrpWiS0nqK22ThkfqSijkofUEdZLEMZcGsEM';

async function getImage(location) {
   const API_KEY_UNSPLASH = '5Ob5jOnGrpWiS0nqK22ThkfqSijkofUEdZLEMZcGsEM';

   const API_URL = 'https://api.unsplash.com/photos/random?query=';

   try {
      const response = await fetch(
         `${API_URL}${location}&client_id=${API_KEY_UNSPLASH}`
      );

      const data_img = response.json();
      console.log(response);
      return data_img;
   } catch (error) {
      alert(error.message);
   }
}

async function showImg(location) {
   const imgData = await getImage(location);

   if (imgData && imgData.urls) {
      const imageUrl = imgData.urls.full;

      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
         document.body.style.transition =
            'background-image 1s ease-in-out, opacity 0.5s ease-in-out';
         document.body.style.backgroundImage = `url(${imageUrl})`;
      };
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

   if (!weatherData) {
      return;
   }

   //Changing the DOM with weatherData

   //Change the hidden effect to show city details
   const hidden = document.querySelector('.city-ok');
   hidden.style.opacity = 0;

   hidden.removeAttribute('hidden');

   hidden.style.transition = 'opacity 2s ease';
   requestAnimationFrame(() => {
      hidden.style.opacity = 1;
   });

   //changing the city and date
   const cityName = document.querySelector('.cityName');
   cityName.innerHTML = `${weatherData.resolvedAddress}`;

   const date = document.querySelector('.date');
   const dateFormated = new Date(weatherData.days[0].datetime);

   const format = dateFormated.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      year: 'numeric',
   });

   const formatado = format.replace(/\./g, '');

   date.innerHTML = `${formatado}`;
}

function formHandler() {
   const form = document.querySelector('form');
   const input = document.querySelector('#location');

   form.addEventListener('submit', (e) => {
      e.preventDefault();
      showWeather(input.value);
      showImg(input.value);
   });
}

formHandler();
