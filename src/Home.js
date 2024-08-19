import React, { Component } from 'react';
import './Home.css';
import NEU from './Images/NEU.webp';
import LazyLoad from 'react-lazyload';
import Links from './Links';
import projects from './projects.json';

const removeAlpha = (color) => {
    // Remove the last two characters (alpha value) from the color string
    return color.slice(0, -2);
};

class Home extends Component {
    
    componentDidMount() {
        // Preload the NEU image
        const img = new Image();
        img.src = NEU;
    }

    render() {
        return (
            <div className="Home">
                <div className="Container">
                    <div className="basic">
                        <h1>Ashwin Iyer</h1>
                        <h2>Freshman at Northeastern University</h2>
                        <p>I am currently a freshman at Northeastern University in Boston, Massachusetts, and I am interested in computer science.
                        I am currently learning Python, Java, and JavaScript. <a href='/about'>Learn more about me!</a></p>
                    </div>
                    <div className="Info">
                        <Links />
                        <div className="Working">
                            <h2>Currently Working on</h2>
                            <p>Personal Projects</p>
                        </div>
                        <div className="College">
                            <LazyLoad once>
                                <img src={NEU} id={'person'} alt="Northeastern" />
                            </LazyLoad>
                        </div>
                    </div>
                    <div>
                        <h2 id="WorkingOn">Projects</h2>
                        <div className="Projects">
                            {projects.slice(0, 4).map((project) => {
                                return (
                                    <div className="Project" style={{ backgroundColor: project.color, border: "2px solid " + removeAlpha(project.color) }}>
                                        <h2><a href={project.link} target='_blank' rel="noreferrer" style={{ color: removeAlpha(project.color) }}>{project.name}</a></h2>
                                        <p>{project.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <h3><a className="SeeAllText" href="/Projects">See All</a></h3>
                    </div>
                </div>

            </div>
        );
    }
}

export default Home;
