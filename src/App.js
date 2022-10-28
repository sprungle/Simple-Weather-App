// IMPORTANT! the HTML input type datetime-local only functions fully 
// in Google Chrome or Edge. 
// Hours must be submitted in full, e.g. 12:00 or 13:00.

import './App.css';
import {useState} from 'react';
const URL = 'https://api.open-meteo.com/v1/forecast?latitude=59.3328&longitude=18.0645&hourly=temperature_2m&current_weather=true'

function App() {
  
  const [userInput, setUserInput] = useState('');
  const [time, setTime] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [current, setCurrent] = useState(0);

  async function updateForecast(e){
    e.preventDefault();
    try{
      const address = URL;
      const response = await fetch(address);

      if(response.ok){
        const json = await response.json();
        
        setTime(json.hourly.time);     
        const position = time.indexOf(userInput);
        setTemperature(json.hourly.temperature_2m[position]);
        console.log (userInput);
        console.log (temperature);
        setCurrent(json.current_weather.temperature);

      } else {
        alert('Error retrieving temperature');
        console.log(response);
      }
    } catch(err){
      alert("Enter only full hours, for example 12:00, 13:00");
    }
  } 

  return (
    <div className="App">
      <h1>Weather in Stockholm</h1>
      <p>Check forecast for any day and hour within next six days. 
        <br></br>
         Enter only full hours, for example 12:00 or 13:00 </p>
      <form onSubmit={updateForecast}>
        <div>
          <label>Date
          <input
            style={{ margin: 20 }}
            type="datetime-local" 
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
          />
</label>
          <button style={{ marginTop: 20 }}> Go </button>

          <h4>Forecast temperature:
            <output> {temperature} °C</output>
          </h4>
        </div>
        <p>Temperature right now: {current} °C</p>
      </form>
      <footer>App runs best on Googcle Chrome or Edge.</footer>
    </div> 
  );
}
export default App;
