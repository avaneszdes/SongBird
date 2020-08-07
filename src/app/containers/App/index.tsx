import React from 'react';
import styles from './style.css';
import PaginationSongs from '../../components/PaginationSongs';
import CheckboxList from '../../components/CheckboxList/CheckboxList';
import BirdDiscription from '../../components/BirdDiscription/BirdDiscription';
import ButtonNext from '../../components/ButtonNext';
import RandomBird from '../../components/RandomBird/RandomBird';
import ReactAudioPlayer from 'react-audio-player';


export const App = () => {

  return (
    <div >
      <div className={styles.bg}>
        <div className={styles.container} >
          <div className={styles.topPanel}>
            <div className={styles.header__logo}>SongBird</div>
            <div className={styles.header__logo}>count : 0</div>
          </div>
          <div className={styles.pagination}>
            <PaginationSongs />
          </div>
          <div className={styles.randomBirdContainer}>
            <RandomBird />
            < ReactAudioPlayer  src="assets/sounds/muz1.mp3"  controls />
          </div>
          <div className={styles.answerContainer}>
            <div className={styles.answerList}><CheckboxList /></div>
            <div className={styles.birdDiscription} ><BirdDiscription /></div>
          </div>
          <div className={styles.pagination}>
            <ButtonNext />
          </div>
        </div>
      </div>
    </div>
  );
};
