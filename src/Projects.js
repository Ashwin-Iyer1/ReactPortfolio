import React from 'react';
import Bar from './Bar.js';
import "./Project.css"
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
    {
        name: '7110A Website',
        description: 'Website for team 7110A',
        link: 'https://github.com/Ashwin-Iyer1/7110A-Website',
        color: '#FFFF0040'
    },
    {
        name: 'Students Drive Safe',
        description: 'Site for the testing of a LLM model on reckless driving',
        link: 'https://github.com/Ashwin-Iyer1/studentsdrivesafe',
        color: '#008E0040'
    },
    {
        name: 'Home Ready Pro',
        description: 'Submissions to HackUTD for loan prediction using ChatGPT API',
        link: 'https://github.com/Ashwin-Iyer1/homereadypro',
        color: '#00C0C040'
    },
    {
        name: 'tiktodv4',
        description: 'Website automation for TikTok views',
        link: 'https://github.com/Ashwin-Iyer1/tiktodv4',
        color: '#40009840'
    },
    {
        name: 'Chess Bot',
        description: 'A chess bot for sites usin OpenCV and Stockfish',
        link: 'https://github.com/Ashwin-Iyer1/Chess-Bot-using-OpenCV',
        color: '#8E008E40'
    }

]
const removeAlpha = (color) => {
    // Remove the last two characters (alpha value) from the color string
    return color.slice(0, -2);
};

function Projects(){
    return (
        <div className="Project1">
            <Bar />
            <div className="BG" />
            <h2 id="WorkingOnP">Projects</h2>
        <div className="Projects">
                {ProjectsList.map((project) => {
                    return (
                        <div className="Project" style={{backgroundColor: project.color, border: "2px solid " + removeAlpha(project.color)}}>
                            <h2><a href={project.link} target='_blank' style={{color:removeAlpha(project.color)}}>{project.name}</a></h2>
                            <p>{project.description}</p>
                            
                        </div>
                    )
                })}
        </div></div>
    );
}

export default Projects;