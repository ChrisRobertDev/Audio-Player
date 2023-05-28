import './main.css';
import './input.css';

import React from 'react';
import Header from "./components/Header";
import Actions from './components/playlist/Actions';
import Playlist from './components/playlist/Playlist';
import PlayerState from './context/PlayerState';
import Controls from './components/playlist/Controls';

let AudioPlayer = () => {
    return (
        <PlayerState>
    <div className='audioplayer'>
        <div className='inside_content'>
            <Header/>
            <Actions/>
            <Playlist/>
        </div>
        <Controls/>
    </div>
    </PlayerState>
    );
    
}

export default AudioPlayer;