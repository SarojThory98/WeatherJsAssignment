import { formValidate, threeDaysForecast } from './module.js';
const API_KEY = `76229fb6fc46c6bff2c28e15a2a099d4`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
form.addEventListener(
  "submit",
  (e) => {
    weatherData(search.value);
    e.preventDefault();
  }
)
const weatherData = async (cityName) => {
  if(!formValidate()){
    return false;
  }
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
  await fetch(url).then(
    (response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    }
  ).then(result => {
    const updatedTimestamp = threeDaysForecast(result.list[0].dt);
    let htmlContent = "";

    result.list.forEach(element => {
      if (element.dt <= updatedTimestamp) {
        htmlContent += `
            <tr>
              <td>${element.dt_txt}</td>
            <td>${element.main.temp}</td>
              <td>${element.main.humidity}</td>
              <td>${element.weather[0].description}</td>
              <td><img src="http://openweathermap.org/img/wn/${element.weather[0].icon}.png"></td>
              <td>${element.wind.speed}</td>
            </tr>
        `
      }
    })
    document.querySelector('.weatherData').innerHTML = `<div class="col">
   <p>City name: ${result.city.name}</p>
   <p>Country name: ${result.city.country}</p>
   <table class="table table-striped">
   <thead>
     <tr>
       <th scope="col">Date/Time</th>
       <th scope="col">Temperature(°C)</th>
       <th scope="col">Humidity</th>
       <th scope="col">Sky condition</th>
       <th scope="col">Icon</th>
       <th scope="col">Wind speed</th>
     </tr>
   </thead>
   <tbody>
   ${htmlContent}
   </tbody>
   </table>
</div`
  })
    .catch(error => {
      document.querySelector('.weatherData').innerHTML = `<p>No result found</p>`;
      console.log('API Error:', error.message);
    });
}