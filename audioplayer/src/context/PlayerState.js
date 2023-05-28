import React, { useReducer } from "react";
import playerReducer from "./playerReducer";
import playerContext from "./playerContext";

import { song_list } from "./songs";

const PlayersState = (props) => {
    const initialState = {
        currentSong: 0,
        songslist: song_list,
        repeat: false,
        random: false,
        playing: false,
        audio: null
    }
    const [state,dispatch] = useReducer(playerReducer, initialState);

    //set current song
    const SetCurrent = (id) => dispatch({type: 'SET_CURRENT_SONG',data:id}); 

    //set song list
    const songsSet = (songsArr) =>
    dispatch({type: 'SET_SONGS_ARRAY', data: songsArr});

    //Set playing state
    const togglePlaying = () => 
    dispatch({type: 'TOGGLE_PLAYING', data: state.playing ? false : true});

    //Previous song
    const prevSong = () =>{
        if(state.currentSong === 0){
            SetCurrent(state.songlist.length - 1);
        }
        else
            SetCurrent(state.currentSong - 1);
        
    };

    //Next song
    const nextSong = () =>{
        if(state.currentSong === 0){
            SetCurrent(0);
        }
        else
            SetCurrent(state.currentSong + 1);
        
    };

    //End of song
    const handleEnd = () =>{
        if(state.random){
            return dispatch({
                type: 'SET_CURRENT_SONG',
                data: ~~(Math.random() * state.songlist.length)
            });
        } else{
            if(state.repeat){
                nextSong();
            } else if(state.currentSong === state.song_list.length - 1){
                return;
            } else{
                nextSong();
            }
        }
    };

    //Repeat & Random
    const toggleRepeat = (id) =>
    dispatch({type : 'TOGGLE_REPEAT', data: state.repeat ? false : true});
    const toggleRandom = (id) =>
    dispatch({type : 'TOGGLE_RANDOM', data: state.repeat ? false : true});

    return (
        <playerContext.Provider value={{
            currentSong: state.currentSong,
            songslist: state.songslist,
            repeat: state.repeat,
            random: state.random,
            playing: state.playing,
            audio: state.audio,
            SetCurrent,
            toggleRandom,
            toggleRepeat,
            togglePlaying,
            handleEnd,
            songsSet
        }}>
            {props.children}
        </playerContext.Provider>
    );
};

export default PlayersState;