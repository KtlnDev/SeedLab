import React from 'react'
import './dashboard-page.scss'
import ItemView from '../item-view/item-view';
import NavigationBar from '../navigation-bar/navigation-bar'

export default function Dashboard(){
    return(
        <div className="dashboard">
            <NavigationBar firstName="Catalin" lastName="Banu"/>
            <div className="card">
                <ItemView name="Temperature" value="asta e valoare"/>
                <ItemView name="Humidity" value="asta edasdas"/>
            </div>
        </div>
    )
}