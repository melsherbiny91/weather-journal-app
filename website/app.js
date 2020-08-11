/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=8f4fe3c38cc1f2050250d176a53321e7';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// add event to generate button
document.getElementById('generate').addEventListener('click', performAction);

//* Main function to get weather
function performAction(e) {
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getWeather(baseURL, zipCode, apiKey)
    .then(function (userData) {
      postData('/add', { date: newDate, temp: userData.main.temp, feelings })
    }).then(function (postData) {
      updateUI()
    })
}

// GET weather from Web API
const getWeather = async (baseURL, newZip, apiKey) => {
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("getWeather::error", error);
  }
}

// call server to add data to projectData
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      feelings: data.feelings
    })
  })

  try {
    const postData = await req.json();
    return postData;
  }
  catch (error) {
    console.log("postData::error",error);
  }
}

// Update UI HTML content
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const projectDataServer = await request.json()
    document.getElementById('date').innerHTML = projectDataServer.date;
    document.getElementById('temp').innerHTML = projectDataServer.temp;
    document.getElementById('content').innerHTML = projectDataServer.feelings;
  }
  catch (error) {
    console.log("updateUI::error", error);
  }
};
