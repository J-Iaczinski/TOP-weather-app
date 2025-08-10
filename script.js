import API_KEY from './APIKeys.js';

const API_URL =
   'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

const UNIT = 'unitGroup=metric';

// This get the information about the city
async function getWeather(location) {
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
   if (!weatherData) return;

   const card = document.querySelector('.card');
   const timeline = document.querySelector('.timeline');

   // Limpa o conteúdo mas mantém a estrutura
   card.replaceChildren();
   timeline.replaceChildren();

   // CITY NAME
   const cityName = document.createElement('div');
   cityName.className = 'cityName';
   cityName.textContent = weatherData.resolvedAddress;
   card.append(cityName);

   // Cria o container .weatherIcon novamente
   const weatherIcon = document.createElement('div');
   weatherIcon.className = 'weatherIcon';
   card.append(weatherIcon);

   // ICON
   const iconSrc = weatherData.currentConditions.icon || 'default';
   const iconEl = document.createElement('img');
   iconEl.id = 'icon';
   iconEl.src = `images/${iconSrc}.png`;
   iconEl.onerror = () => (iconEl.src = 'images/default.png');
   iconEl.style.opacity = 0;

   const temp = document.createElement('p');
   temp.className = 'temp';
   temp.textContent = `${weatherData.currentConditions.temp}ºC`;

   weatherIcon.append(iconEl, temp);

   setTimeout(() => {
      iconEl.style.opacity = 1;
   }, 300);

   // TIMELINE
   weatherData.days.slice(1).forEach((day) => {
      const cardTimeline = document.createElement('div');
      cardTimeline.className = 'weatherTimeline';

      const img = document.createElement('img');
      img.src = `images/${day.icon || 'default'}.png`;
      img.onerror = () => {
         img.src = 'images/default.png';
      };

      const p = document.createElement('p');
      p.className = 'temp';
      p.textContent = day.temp;

      cardTimeline.append(img, p);
      timeline.append(cardTimeline);
   });
}

const btn = document.querySelector('.btn');
const input = document.getElementById('cityForm');

function formHandler(btn, input, callback) {
   btn.addEventListener('click', (e) => {
      e.preventDefault();
      const city = input.value.trim();
      if (city) {
         callback(city);
      } else {
         alert('Digite uma cidade valida');
      }
   });
}

formHandler(btn, input, showWeather);
