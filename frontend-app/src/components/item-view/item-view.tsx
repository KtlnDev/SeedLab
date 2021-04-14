import React from 'react';
import './item-view.scss'

export default function ItemView(props){
    return(
        <div className="item-view">
            <label>{props.name}</label><br>
            </br>
            <label>{props.value}</label>
        </div>
    )
}