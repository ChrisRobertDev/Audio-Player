import React, {useRef, useState,useEffect, useContext} from "react";
import playerContext from "../../context/playerContext";


let Controls = () => {
    const {
        currentSong,
        songs,
        nextSong,
        prevSong,
        repeat,
        random,
        playing,
        toggleRandom,
        toggleRepeat,
        togglePlaying,
        handleEnd,
        songslist
    } = useContext(playerContext);

    const [stateVolume, setStateVolume] = useState(0.3);
    const [dur,setDur] = useState(0);
    const [currentTime,setCurrentTime] = useState(0);

    const audio = useRef('audio_tag');

    const handleVolume = (q) => {
        setStateVolume(q);
        audio.current.volume = q;
    };

    const toggleAudio = () => {
        audio.current.paused ? audio.current.play() : audio.current.pause();
    };

    const handleProgress = (e) => {
        let compute = (e.target.value * dur)/100;
        setCurrentTime(compute);
        audio.current.currentTime = compute;
    };

    const fmtMSS = (s) =>{
        return (s - (s %= 60)) / 60 + (9 < s ? ':': ':0') + ~~s;
    };


    useEffect(() => {
        audio.current.volume = stateVolume;
        if(playing){
            toggleAudio()
        }
    },[currentSong]);

    return(
        <div className="controls">
            <audio 
                ref={audio}
                onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                onCanPlay={(e) => setDur(e.target.duration)}
                onEnded={handleEnd}
                type="audio/mpeg"
                preload="true"
                src={songslist[currentSong].fileUrl}
            />
            <div className="vlme">
                <span className="volum">
                    <i className="fas fa-volume-down"></i>
                </span>
                <input
                    value = {Math.round(stateVolume * 100)}
                    type = "range"
                    name = "volBar"
                    id = "volBar"
                    onChange = {(e)=> handleVolume(e.target.value/100)}
                />
            </div>
            <div className="musicControls">
                <span className="prev" onClick={prevSong}>
                    <i className="fas fa-step-backward"></i>
                </span>
                <span className="play" 
                onClick={() =>{
                    togglePlaying();
                    toggleAudio();
                }}
                >
                    <span className={!playing ? '' : 'hide'}>
                        <i className="fas fa-play"></i>
                    </span>
                    <span className={!playing ? 'hide' : ''}>
                    <i className="fas fa-pause"></i>
                    </span>
                    <span className="next" onClick={nextSong}>
                        <i className="fas fa-step-forward"></i>
                    </span>
                </span>
            </div>
            
            <div className="progressb">
                <div className="songMeta">
                <span className="songtitle">{songslist[currentSong].title}</span>
                <span className="songartistName">
                    {songslist[currentSong].artistName}
                </span>
                </div>
                <input
                onChange={handleProgress}
                value={dur ? (currentTime * 100) / dur : 0}
                type="range"
                name="progresBar"
                id="prgbar"
                />
                <span className="currentT">{fmtMSS(currentTime)}</span>/
                <span className="totalT">{fmtMSS(dur)}</span>
            </div>
            <div className="plsoptions">
                <span
                onClick={toggleRandom}
                className={'random ' + (random ? 'active' : '')}
                >
                <i className="fas fa-random"></i>
                </span>
                <span
                onClick={toggleRepeat}
                className={'repeat ' + (repeat ? 'active' : '')}
                >
                <i className="fas fa-redo-alt"></i>
                </span>
            </div>

        </div>
    );
};

export default Controls;