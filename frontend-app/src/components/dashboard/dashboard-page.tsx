import React from 'react'
import './dashboard-page.scss'
import ItemView from '../item-view/item-view';
import NavigationBar from '../navigation-bar/navigation-bar'
import TemperatureIcon from '../../images/icons/temperature.png'
import HumidityIcon from '../../images/icons/humidity.png'
import SoilMoistureIcon from '../../images/icons/soilMoisture.png'
import LightIcon from '../../images/icons/light.png'
import WaterLevelIcon from '../../images/icons/waterLevel.png'

export default function Dashboard(){
    return(
        <div className="dashboard">
            <NavigationBar firstName="Catalin" lastName="Banu"/>
            <div className="content-page">
                <div className="card">
                    <div className="row">
                        <ItemView className="itemView" name="Temperature" value="23" unit="°C" icon={TemperatureIcon} extraInfo="Cooler Status: ON"/>
                        <ItemView className="itemView" name="Humidity" value="67" unit="%" icon={HumidityIcon} extraInfo="Cooler Status: ON"/>
                    </div>
                    <div className="row">
                        <ItemView className="itemView" name="Soil Moisture" value="24" unit="%" icon={SoilMoistureIcon} extraInfo="Pump Status: ON"/>
                        <ItemView className="itemView" name="Light" value="40" unit="%" icon={LightIcon} extraInfo="Light Status: ON"/>
                    </div>
                    <div className="last-row">
                        <ItemView className="itemView" name="Water Level" value="25" unit="%" icon={WaterLevelIcon}/>
                    </div>
                </div>
                <div className="configuration">
                    <div className="configuration-view"></div>
                </div>
            </div>
        </div>
    )
}