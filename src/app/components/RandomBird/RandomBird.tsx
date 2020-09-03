import React from 'react'
import styles from './RandomBird.css';
import { Bird } from '../BirdData';
import Player from '../Player/Player';
import style from '../Player/Player.css';


interface Props {
    bird: Bird,
    song: string,
}


export function RandomBird({ bird, song }: Props) {

    return (
        <div className={styles.container} >
            <div >
                <img src={bird.birdImg} alt={bird.name} className={styles.birdImage} />
            </div>
            <div className={styles.rightContent}>
                <h1 className={styles.h1Style}>{bird.name}</h1 >
                    <Player  style={style} song={song} />
            </div>
        </div >
    );
}


