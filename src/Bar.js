import React from 'react';
import "./Bar.css";

export default function Bar() {
    return (
        <div className="Bar">
            <div className="name-section">
                <h1>Ashwin Iyer</h1>
            </div>
            <div className="links-section">
                <a href='/'><h2>Home</h2></a>
                <a href='/Projects'><h2>Projects</h2></a>
                <a href='/About'><h2>About</h2></a>
            </div>
        </div>
    );
}
