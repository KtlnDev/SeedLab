import React, { useState } from 'react';
import './dashboard-page.scss';
import ItemView from '../item-view/item-view';
import TemperatureIcon from '../../images/icons/temperature.png';
import HumidityIcon from '../../images/icons/humidity.png';
import SoilMoistureIcon from '../../images/icons/soilMoisture.png';
import LightIcon from '../../images/icons/light.png';
import WaterLevelIcon from '../../images/icons/waterLevel.png';
import FanIcon from '../../images/icons/fan.png';
import PumpIcon from '../../images/icons/pump.png';
import LightBulbIcon from '../../images/icons/lightbulb.png';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import {AreaChart, XAxis, YAxis, CartesianGrid, Area,Tooltip} from 'recharts';
import axios from 'axios';

const temperatureData = [
    {
      "name": "00:00",
      "Temperatură": 20,
      "amt": 2400
    },
    {
      "name": "03:00",
      "Temperatură": 23,
      "amt": 2210
    },
    {
      "name": "06:00",
      "Temperatură": 21,
      "amt": 2290
    },
    {
      "name": "09:00",
      "Temperatură": 22,
      "amt": 2000
    },
    {
      "name": "12:00",
      "Temperatură": 18,
      "amt": 2181
    },
    {
      "name": "15:00",
      "Temperatură": 27,
      "amt": 2500
    },
    {
      "name": "18:00",
      "Temperatură": 28,
      "amt": 2100
    },
    {
      "name": "21:00",
      "Temperatură": 24,
      "amt": 2100
    }
  ]

  const otherMeasurementsData = [
    {
      "name": "00:00",
      "Umiditatea aerului": 70,
      "Umiditatea solului": 95,
      "Intensitatea luminii": 30,
      "amt": 2400
    },
    {
      "name": "03:00",
      "Umiditatea aerului": 60,
      "Umiditatea solului": 85,
      "Intensitatea luminii": 30,
      "amt": 2210
    },
    {
      "name": "06:00",
      "Umiditatea aerului": 40,
      "Umiditatea solului": 70,
      "Intensitatea luminii": 40,
      "amt": 2290
    },
    {
      "name": "09:00",
      "Umiditatea aerului": 45,
      "Umiditatea solului": 60,
      "Intensitatea luminii": 70,
      "amt": 2000
    },
    {
      "name": "12:00",      
      "Umiditatea aerului": 55,
      "Umiditatea solului": 50,
      "Intensitatea luminii": 80,
      "amt": 2181
    },
    {
      "name": "15:00",
      "Umiditatea aerului": 50,
      "Umiditatea solului": 30,
      "Intensitatea luminii": 80,
      "amt": 2500
    },
    {
      "name": "18:00",
      "Umiditatea aerului": 45,
      "Umiditatea solului": 60,
      "Intensitatea luminii": 80,
      "amt": 2100
    },
    {
      "name": "21:00",
      "Umiditatea aerului": 43,
      "Umiditatea solului": 70,
      "Intensitatea luminii": 50,
      "amt": 2100
    }
  ]
  
function Dashboard(props){
    const [temperature, setTemperature] = useState('--');
    const [humidity, setHumidity] = useState('--');
    const [soilMoisture, setSoilMoisture] = useState('--');
    const [light, setLight] = useState('--');

    const [coolerStatus, setCoolerStatus] = useState();
    const [pumpStatus, setPumpStatus] = useState();
    const [lightStatus, setLightStatus] = useState();
    const [waterLevel, setWaterLevel] = useState('--');

    const [desiredTemperature, setDesiredTemperature] = useState();
    const [desiredHumidity, setDesiredHumidity] = useState();
    const [commandLight, setCommandLight] = useState();

    async function getSensorValueFromArduino(){
      try{
        setInterval( async () => {
          const dataFromArduino = await axios.get("http://192.168.1.4:80");
        }, 3000)
      }
      catch(e){
        setTemperature('--');
        setHumidity('--');
        setSoilMoisture('--');
        setLight('--');
      }
    };

    return(
        <div className="dashboard">
            <div className="left-side-dashboard">
              <div className="chart-side">
                <AreaChart data={temperatureData} width={1200} height={200} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                          <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#E1B07E" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#E1B07E" stopOpacity={0}/>
                          </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="Temperatură" stroke="#E1B07E" fillOpacity={1} fill="url(#colorTemperature)" />
                  </AreaChart>
                  <AreaChart data={otherMeasurementsData} width={1200} height={280} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                          <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7389AE" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#7389AE" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorSoilMoisture" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#32CBFF" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#32CBFF" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorLight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FFE1A8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#FFE1A8" stopOpacity={0}/>
                          </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="Umiditatea aerului" stroke="#7389AE" fillOpacity={1} fill="url(#colorHumidity)" />
                      <Area type="monotone" dataKey="Umiditatea solului" stroke="#32CBFF" fillOpacity={1} fill="url(#colorSoilMoisture)" />
                      <Area type="monotone" dataKey="Intensitatea luminii" stroke="#FFE1A8" fillOpacity={1} fill="url(#colorLight)" />
                  </AreaChart>
              </div>
              <div className="actuator-side">
                <div className="set-parameters-container">
                  <form className="form-params">
                    <div className="numeric-input">
                      <TextField id="standard-number" label="Temperatura" type="number"  variant="outlined"/>
                       <TextField id="standard-number" label="Umiditate sol" type="number" variant="outlined"/>
                    </div>
                    <div className="light-container">
                      <label>Starea luminii</label>
                        <ButtonGroup disableElevation variant="contained">
                          <Button className="btn-on">Pornită</Button>
                          <Button className="btn-off">Oprită</Button>
                        </ButtonGroup>
                    </div>
                    <Button className="set-params-btn" color="primary" variant="contained" type="submit">Setează</Button>
                  </form>
                </div>
                <div className="actuator-status">
                  <div className="cooler-status">
                    <label className="label-actuator">Ventilator</label>
                    <img className="icon-actuator" src={FanIcon}></img>
                    <label className="label-status-actuator">Pornit</label>                  
                  </div>
                  <div className="pump-status">
                    <label className="label-actuator">Pompă de apă</label>
                    <img className="icon-actuator" src={PumpIcon}></img>
                    <label className="label-status-actuator">Pornită</label>                  
                  </div>
                  <div className="light-status">
                    <label className="label-actuator">Lumină</label>
                    <img className="icon-actuator" src={LightBulbIcon}></img>
                    <label className="label-status-actuator">Pornită</label>                  
                  </div>
                  <div className="water-level">
                    <label className="label-actuator">Nivel apă</label>
                    <label className="label-water-level">{waterLevel}%</label> 
                  </div>
                </div>
              </div>
            </div>
            <div className="right-side-dashboard">
                <ItemView className="itemView" name="Temperatură" value={temperature} unit="°C" icon={TemperatureIcon} extraInfo="Cooler Status: ON"/>
                <ItemView className="itemView" name="Umiditate aer" value={humidity} unit="%" icon={HumidityIcon} extraInfo="Cooler Status: ON"/>
                <ItemView className="itemView" name="Umiditate sol" value={soilMoisture} unit="%" icon={SoilMoistureIcon} extraInfo="Pump Status: ON"/>
                <ItemView className="itemView" name="Lumină" value={light} unit="%" icon={LightIcon} extraInfo="Light Status: ON"/>
            </div>
        </div>
    )
};

export default Dashboard;