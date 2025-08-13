const API_KEY_UNSPLASH = '5Ob5jOnGrpWiS0nqK22ThkfqSijkofUEdZLEMZcGsEM';

async function getImage(location) {
   const API_KEY_UNSPLASH = '5Ob5jOnGrpWiS0nqK22ThkfqSijkofUEdZLEMZcGsEM';

   const API_URL = 'https://api.unsplash.com/photos/random?query=';

   try {
      const response = await fetch(
         `${API_URL}${location}&client_id=${API_KEY_UNSPLASH}`
      );

      const data_img = response.json();
      return data_img;
   } catch (error) {
      alert(error.message);
   }
}

async function showImg(location) {
   const imgData = await getImage(location);
   console.log(imgData);

   if (imgData && imgData.urls) {
      const imageUrl = imgData.urls.full;

      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
         document.body.style.transition =
            'background-image 0.5s ease-in-out, opacity 0.3s ease-in-out';
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
         `${API_URL}/${location}/next3days?${UNIT}&key=${API_KEY}&contentType=json`
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
   const iconLocation = document.querySelector('.city-card span');
   iconFade(iconLocation);
   updateTextFade(cityName, weatherData.resolvedAddress);

   const date = document.querySelector('.date');

   const [ano, mes, dia] = weatherData.days[0].datetime.split('-');
   const dateFormated = new Date(ano, mes - 1, dia);

   const format = dateFormated.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      year: 'numeric',
   });

   function capitalize(str) {
      return str.replace(/\b\w/g, (char) => char.toUpperCase());
   }
   const formatado = capitalize(format.replace(/\./g, ''));

   updateTextFade(date, formatado);

   //Changing the Icon
   const icon = document.querySelector('.icon img');
   icon.src = `images/${weatherData.currentConditions.icon}.svg`;
   iconFade(icon);

   //Changing the Temperature and Status
   const temperature = document.querySelector('.temperature');
   updateTextFadeCelsius(temperature, weatherData.currentConditions.temp);

   const conditionStatus = document.querySelector('.status');
   updateTextFade(conditionStatus, weatherData.currentConditions.conditions);

   //Changin wind and humidty
   const wind = document.querySelector('#wind');
   updateTextFade(wind, weatherData.currentConditions.windspeed);

   const humidty = document.querySelector('#humidity');
   updateTextFade(humidty, weatherData.currentConditions.humidity);

   //Timeline Forecast 3 day

   const forecastCards = document.querySelectorAll('.forecast-content');

   forecastCards.forEach((card, index) => {
      // ICONS
      const icon = card.querySelector('img');

      const newSrc = `images/${weatherData.days[index + 1].icon}.svg`;
      forescastFade(icon, newSrc);

      //Dia
      const forecastDate = card.querySelector('.forecast-date');

      const [ano, mes, dia] = weatherData.days[index + 1].datetime.split('-');
      const dateFormated = new Date(ano, mes - 1, dia);

      const format = dateFormated.toLocaleDateString(undefined, {
         day: '2-digit',
         month: 'long',
      });

      function capitalize(str) {
         return str.replace(/\b\w/g, (char) => char.toUpperCase());
      }
      const formatado = capitalize(format.replace(/\./g, ''));

      updateTextFade(forecastDate, formatado);

      //temperature
      const temp = card.querySelector('.forecast-txt');

      const src = weatherData.days[index + 1].temp;

      updateTextFadeCelsius(temp, src);
   });
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

function forescastFade(icon, newSrc) {
   icon.classList.add('smooth-fade');
   icon.style.opacity = '0';

   setTimeout(() => {
      icon.src = newSrc;
      icon.style.opacity = '1';
   }, 300);
}

function iconFade(icon) {
   icon.classList.add('smooth-fade');
   icon.style.opacity = 0;

   setTimeout(() => {
      icon.style.opacity = 1;
   }, 300);
}

function updateTextFade(text, newText) {
   text.classList.add('smooth-fade');
   text.style.opacity = 0;

   setTimeout(() => {
      text.innerHTML = newText;

      text.style.opacity = 1;
   }, 300);
}

function updateTextFadeCelsius(text, newText) {
   text.classList.add('smooth-fade');
   text.style.opacity = 0;

   setTimeout(() => {
      text.innerHTML = Math.round(newText) + ' °C';

      text.style.opacity = 1;
   }, 300);
}

formHandler();
