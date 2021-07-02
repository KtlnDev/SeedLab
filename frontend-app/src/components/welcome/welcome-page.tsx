import React from 'react';
import './welcome-page.scss'

export default function WelcomePage(){
    return(
        <div className="welcome-page">
            <div className="left-image"></div>
            <div className="right-side">
                <h1 className="h1">Bine ai venit la SeedLab</h1>
                <label className="label">SeedLab este o platformă online care pune la dispoziție toate instrumentele necesare unei producții de legume delicioase și de plante sănătoase. Prin intermediul acestei platforme benecifiezi de:</label>
                <ul  className="label">
                    <li>Monitorizare și control 24/24h</li>
                    <li>Interfață grafică modernă și intuitivă</li>
                    <li>Suport tehnic gratuit</li>
                </ul>
                <div className="footer-buttons">
                    <a className="btn" href="/login">LOGARE</a>
                    <a className="btn" href="/register">ÎNREGISTRARE</a>
                </div>
                <label className="credits">Powered by Cătălin-Mihai Banu</label>
            </div>
        </div>
    )
}