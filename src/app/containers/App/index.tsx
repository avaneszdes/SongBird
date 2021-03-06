import React, { useState } from 'react';
import styles from './style.css';
import PaginationSongs from '../../components/PaginationSongs';
import CheckboxList from '../../components/CheckboxList/CheckboxList';
import BirdDiscription from '../../components/BirdDiscription/BirdDiscription';
import ButtonNext from '../../components/ButtonNext';
import { RandomBird } from '../../components/RandomBird/RandomBird';
import { birdArray } from '../../components/BirdData';
import { Bird } from '../../components/BirdData';

export const App = () => {

  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);
  const [countForSliceArray, setCountForSliceArray] = useState(0)
  const [birdsArray, setBirdsArray] = useState<Bird[]>(birdArray);
  const [countOfGame, setCountOfGame] = useState(0);
  const [countOfRound, setCountOfRound] = useState(5);
  const [randomBird, setRandomBird] = useState<Bird>(birdsArray[getRandomIntFromRange(countForSliceArray)]);
  const [listItem, setListItem] = useState(birdsArray[36]);
  const [numberOfTypeBird, setNumberOfTypeBird] = useState(0);
  const [press, setPress] = useState(false);


  const playSound = (soundIsPlay: boolean) => {
    const audio = new Audio(soundIsPlay ? '../../../assets/sounds/notOk.mp3' : '../../../assets/sounds/ok.mp3')
    audio.play()
  }

  const getCorrectAnswer = (bird: Bird) => {

    setPress(true);
    const newArray = birdsArray.map((item) => {

      if (item.name === bird.name) {
        setListItem(item);
        if (item.name === randomBird.name && !nextButtonEnabled) {
          playSound(true);
          setNextButtonEnabled(true);
          setCountOfGame(countOfGame + countOfRound);
          return { ...item, selected: true, radio: styles.formRadioIfTrue }
        }
        else if (!nextButtonEnabled) {
          playSound(false);
          setCountOfRound(countOfRound - 1);
          return { ...item, selected: true }
        }


      }

      return item;
    })

    setBirdsArray(newArray)
  }

  function getRandomIntFromRange(number: number) {
    let min = Math.ceil(number);
    let max = Math.floor(number + 6);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const printNextListElements = () => {
    setCountForSliceArray(countForSliceArray + 6);
    setNextButtonEnabled(!nextButtonEnabled);
    setCountOfRound(5);
    setRandomBird(birdsArray[getRandomIntFromRange(countForSliceArray + 6)]);
    setNumberOfTypeBird(numberOfTypeBird === 5 ? 5 : numberOfTypeBird + 1);
    setPress(false);
    setListItem(birdsArray[36]);
  }

  const startGameAgain = () => {
    setNextButtonEnabled(false);
    setCountForSliceArray(0);
    setBirdsArray(birdArray);
    setCountOfGame(0);
    setCountOfRound(5);
    setRandomBird(birdsArray[getRandomIntFromRange(0)]);
    setListItem(birdsArray[36]);
    setNumberOfTypeBird(0)
    setPress(false);
  }

  return (
    <div >

      <div className={styles.bg}>
        <div className={styles.container} >
          <div className={styles.topPanel}>
            <div className={styles.header__logo}>SongBird</div>
            <div className={styles.header__logo}>count : {countOfGame}</div>
          </div>
          <div className={styles.pagination}>
            <PaginationSongs numberOfTypeBird={numberOfTypeBird} />
          </div>

          {countForSliceArray !== 36 ?

            <div>
              <div className={styles.randomBirdContainer}>
                <RandomBird song={randomBird.song} bird={nextButtonEnabled ? randomBird : birdArray[36]} />

              </div>
              <div className={styles.answerContainer}>
                <div className={styles.answerList}>
                  <CheckboxList
                    birds={birdsArray.slice(countForSliceArray, countForSliceArray + 6)}
                    onSelectedCorrect={getCorrectAnswer} />
                </div>
                <div className={styles.birdDiscription} >
                  <BirdDiscription
                    press={press}
                    bird={listItem} />
                </div>
              </div>
              <div className={styles.pagination}>
                <ButtonNext
                  isEnabled={nextButtonEnabled}
                  printNextListElements={printNextListElements} />
              </div>
            </div> :
            <div className={styles.gameOwer}>
              <h1 className={styles.congratulation}>Поздравляем!</h1>
              <h2 className={styles.gamePoints}>Вы прошли викторину и набрали {countOfGame} из 30 возможных баллов</h2>
              <button className={styles.gameAgain} onClick={startGameAgain}> <h2 className={styles.textGameAgain}>Попробовать еще раз!</h2></button>

            </div>
          }
        </div>
      </div>
    </div>
  );
};
