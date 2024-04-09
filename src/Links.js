import React from 'react';
import Github from './Images/github.png';
import Linkedin from './Images/linkedin.png';
import Instagram from './Images/instagram-color.png';
import Discord from './Images/Discord.png';
export default function Links(){
    return(
    <div className="Links">
    <a href='https://github.com/Ashwin-Iyer1' target='_blank'>
        <img src={Github} id={'person'}></img>
    </a>
    <a href='https://www.linkedin.com/in/ashwin-iyer-949028263/' target='_blank'>
        <img src={Linkedin} id={'person'}></img>
        </a>
    <a href='https://www.instagram.com/ashwin_i_/' target='_blank'>
        <img src={Instagram} id={'person'}></img>
    </a>
    <a href='https://discordapp.com/users/299516008920514560'>
        <img src={Discord} id={'person'}></img> 
    </a>
</div>
    );

}