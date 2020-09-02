import React, { useRef, useState, } from 'react'
import styles from './RandomBird.css';
import { Bird } from '../BirdData';

interface Props {
    bird: Bird,
    song: string,
}


export function RandomBird({ bird, song }: Props) {

    const audio = useRef<HTMLAudioElement>();
    const [play, setPlay] = useState(false)
    const [dur, setDur] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const fmtMSS = (s: number) => { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~(s) }


   


    const toggleAudio = () => {
        setPlay(!play)
        return audio.current?.paused ? audio.current.play() : audio.current?.pause();
    }

    const handleProgress = (e: any) => {
        let compute = (e.target.value * dur) / 100;
        setCurrentTime(compute);
        if (audio?.current) {
            audio.current.currentTime = compute
        }
    }

    const renderButtonSound = () => {
        return (

            <div onClick={() => { toggleAudio() }} className={styles.playbackButton}>

                {play ? <svg viewBox="0 0 47.607 47.607">
                    <path fill="#00bc8c"
                        d="M17.991 40.976a6.631 6.631 0 01-13.262 0V6.631a6.631 
                        6.631 0 0113.262 0v34.345zM42.877 40.976a6.631 6.631 
                        0 01-13.262 0V6.631a6.631 6.631 0 0113.262 0v34.345z">
                    </path></svg> :
                    <svg viewBox="-200 0 1200 1000">
                        <path fill="#00bc8c"
                            d="M96.51 11.97c-31.23 8.05-53.26 32.76-63.42 71.27-3.45
                         12.84-3.64 29.7-3.64 416.71s.19 403.87 3.64 416.71c16.09 
                         60.74 61.69 86.03 120.9 67.25 9-2.87 53.65-25.1 116.49-58.24 
                         56.14-29.51 221.29-116.3 367.28-192.93 145.99-76.64 271.29-143.31 
                         278.38-148.1 39.28-25.68 59.59-63.04 53.26-97.52-4.79-26.63-24.33-53.07-52.88-71.65C892
                          399.37 172.58 22.32 154.95 16.38c-18.97-6.33-43.3-8.24-58.44-4.41z">

                        </path>
                    </svg>}


                <audio

                    onTimeUpdate={(e: React.SyntheticEvent<HTMLAudioElement, Event>) => setCurrentTime(e.currentTarget.currentTime)}
                    onCanPlay={(e) => { setDur(e.currentTarget.duration); setPlay(false) }}
                    // @ts-ignore
                    ref={audio}

                    type="audio/mpeg"
                    preload='true'
                    src={song}
                />
            </div>
        )
    }


    return (
        <div className={styles.container} >
            <div >
                <img src={bird.birdImg} alt={bird.name} className={styles.birdImage} />
            </div>
            <div className={styles.rightContent}>
                <h1 className={styles.h1Style}>{bird.name}</h1 >
                <div className={styles.playerContainer}>
                    {renderButtonSound()}
                    <div className={styles.progressb}>
                        <input
                            onChange={handleProgress}
                            value={dur ? (currentTime * 100) / dur : 0}
                            type="range" name={styles.progresBar} />
                    </div>
                </div >
                <div className={styles.songTime}>
                    <span className={styles.currentT}>{fmtMSS(currentTime)}</span>
                    <span className={styles.totalT}>{fmtMSS(dur)}</span>
                </div>
            </div>
        </div >
    );
}


