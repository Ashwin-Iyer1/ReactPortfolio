import React from 'react';
import Github from './Images/github.webp';
import Linkedin from './Images/linkedin.webp';
import Instagram from './Images/instagram-color.webp';
import Discord from './Images/Discord.webp';
export default function Links(){
    return(
    <div className="Links">
    <a href='https://github.com/Ashwin-Iyer1' target='_blank' rel="noreferrer" >
        <img src={Github} id={'person'} alt="Github Logo"></img>
    </a>
    <a href='https://www.linkedin.com/in/ashwin-iyer-949028263/' target='_blank' rel="noreferrer" >
        <img src={Linkedin} id={'person'} alt="Linkedin Logo"></img>
        </a>
    <a href='https://www.instagram.com/ashwin_i_/' target='_blank' rel="noreferrer" >
        <img src={Instagram} id={'person'} alt="Instagram Logo"></img>
    </a>
    <a href='https://discordapp.com/users/299516008920514560' target='_blank' rel="noreferrer" >
        <img src={Discord} id={'person'} alt="Discord Logo"></img> 
    </a>
</div>
    );

}