import React from 'react';
import "./Bar.css";

export default function Bar() {
    return (
        <div className="Bar">
            <div className="name-section">
                <h1>Ashwin Iyer</h1>
            </div>
            <div className="links-section">
                <a href='/'><h3>Home</h3></a>
                <a href='/Projects'><h3>Projects</h3></a>
                <a href='/About'><h3>About</h3></a>
            </div>
        </div>
    );
}
