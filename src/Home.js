import React from 'react';
import './Home.css';
import NEU from './Images/NEU.png';
import Projects from './Projects';
import Links from './Links';
const ProjectsList = [
    {
        name: 'Cookle',
        description: 'Food guessing game similar to Wordle',
        link: 'https://ninjaqkk.github.io/cookle/',
        color: '#8a2be240'

    },
    {
        name: 'Robotics Code',
        description: 'Code for my robotics team, 7110A',
        link: 'https://github.com/Ashwin-Iyer1/7110A_Code',
        color: '#FF659940'
    },
    {
        name: 'SkyblockSniper',
        description: 'Skyblock AH sniper for Hypixel Skyblock using Coflnet API',
        link: 'https://github.com/Ashwin-Iyer1/SkyblockSniper',
        color: '#FF000040'
    },
    {
        name: 'TikTok Video Creator',
        description: 'Merging of videos with video splicing',
        link: 'https://github.com/Ashwin-Iyer1/TikTok-Video-Creator',
        color: '#FF8E0040'
    },
]
const removeAlpha = (color) => {
    // Remove the last two characters (alpha value) from the color string
    return color.slice(0, -2);
};


export default function Home() {
    return (
        <div className="Home">
        <div className="Container">
            <div className="basic">
                <h1>Ashwin Iyer</h1>
                <h2>Senior at Carroll Senior High School</h2>
                <p>I am currently a senior at Carroll High School and I am interested in computer science. 
                    I am currently learning Python, Java, and JavaScript. <a href='/about'>Read More</a></p>
            </div>
            <div className="Info">
                <Links />
                <div className="Working">
                    <h2>Currently Working on</h2>
                    <p>Personal Projects</p>
                </div>
                <div className="College">
                    <img src={NEU} id={'person'} alt="NEU"></img>
                </div>
            </div>
            <div>
            <h2 id="WorkingOn">Projects</h2>
        <div className="Projects">
            
                {ProjectsList.map((project) => {
                    return (
                        <div className="Project" style={{backgroundColor: project.color, border: "2px solid " + removeAlpha(project.color)}}>
                            <h2><a href={project.link} target='_blank' style={{color:removeAlpha(project.color)}}>{project.name}</a></h2>
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
