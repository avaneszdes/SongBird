import React from 'react'
import styles from './BirdDiscription.css';
import { Bird } from '../BirdData';
import Player from '../Player/Player';


interface Props {
    bird: Bird
    press: boolean,

}

export default function BirdDiscription({ bird, press}: Props) {
    return (

        press ?
            <div className={styles.container}>

                <img src={bird.birdImg} alt={bird.name} className={styles.birdImage} />
                <div>
                    <h1 className={styles.h1Style}>{bird.name}</h1>
                    <h2 className={styles.birdEnglishName}>{bird.shortDiscription}</h2>
                    <Player style={styles} song={bird.song} />
                    


                </div>
                <h3 className={styles.birdDiscription}> {bird.discription}</h3>
            </div> : <h2 style={ {paddingLeft: 50 }}className={styles.h1Style}>Послушайте плеер.Выберите птицу из списка</h2>
    )
}
