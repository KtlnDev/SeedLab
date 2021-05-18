import React from 'react';
import './welcome-page.scss'

export default function WelcomePage(){
    return(
        <div className="welcome-page">
            <div className="left-image"></div>
            <div className="right-side">
                <h1 className="h1">Bine ai venit la SeedLab</h1>
                <label className="label">An innovative way to create your own production of tasty vegetables and beautiful plants. With SeedLab you benefit from the remote monitoring and control of your small greenhouse.</label>
                <div className="footer-buttons">
                    <a className="btn" href="/login">LOGARE</a>
                    <a className="btn" href="/register">ÎNREGISTRARE</a>
                </div>
                <label className="credits">Powered by Cătălin-Mihai Banu</label>
            </div>
        </div>
    )
}