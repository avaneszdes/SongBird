import React from 'react'
import styles from './RandomBird.css';
import { Howl } from "howler";
import { Bird } from '../BirdData';


let audioClips = [
    {
        sound: ['../../../assets/sounds/m2.mp3','../../../assets/sounds/m3.mp3' ],
    },
]

let src = audioClips[0].sound[0];

export class RandomBird extends React.Component<any>{
    constructor(props : Bird) {
        super(props);
    }
    
    state = {
        playing: false,
        countMusic: 0,
        bird: this.props,
    }
    soundPlay = () => {
        let player = new Howl({ src, html5: true,});
        if (this.state.playing === false) {
            player.play();

            this.setState({
                playing: true,
                countMusic: this.state.countMusic += 1
            })
        }
        else {  
            src = audioClips[0].sound[this.state.countMusic];
            this.setState({
                playing: false
            })
            player.pause();
            player.stop();

        }
    }

    renderButtonSound = () => {
        return audioClips.map((soundObj, index) => {
            return (
                <div key={index} onClick={() => {this.soundPlay() }} className={styles.playbackButton}>
                    {this.state.playing ?  <svg viewBox="0 0 47.607 47.607"><path fill="#00bc8c" d="M17.991 40.976a6.631 6.631 0 01-13.262 0V6.631a6.631 6.631 0 0113.262 0v34.345zM42.877 40.976a6.631 6.631 0 01-13.262 0V6.631a6.631 6.631 0 0113.262 0v34.345z"></path></svg> : 
                    <svg viewBox="-200 0 1200 1000"><path fill="#00bc8c" d="M96.51 11.97c-31.23 8.05-53.26 32.76-63.42 71.27-3.45 12.84-3.64 29.7-3.64 416.71s.19 403.87 3.64 416.71c16.09 60.74 61.69 86.03 120.9 67.25 9-2.87 53.65-25.1 116.49-58.24 56.14-29.51 221.29-116.3 367.28-192.93 145.99-76.64 271.29-143.31 278.38-148.1 39.28-25.68 59.59-63.04 53.26-97.52-4.79-26.63-24.33-53.07-52.88-71.65C892 399.37 172.58 22.32 154.95 16.38c-18.97-6.33-43.3-8.24-58.44-4.41z"></path>
                </svg>}
                   
                </div>
            )
        })
    }

    render() {
        return (
            <div className={styles.container} >
                <div >
                    <img src={this.props.bird.birdImg} alt={this.props.bird.name} className={styles.birdImage} />
                </div>
                <div className={styles.rightContent}>
                    <h1 className={styles.h1Style}>{this.props.bird.name}</h1 >
                    <div className={styles.playerContainer}>
                        {this.renderButtonSound()}
                        <div className={styles.audioLine} />
                    </div >
                </div>
            </div >
        );
    }

















    // render() {
    //     return (
    //         <div className={styles.container} >
    //             <div >
    //                 <img src='https://live.staticflickr.com//65535//48701190276_ee2a9ed594.jpg' alt="" className={styles.birdImage} />
    //             </div>
    //             <div className={styles.rightContent}>
    //                 <h1 className={styles.h1Style}>Коршун</h1 >
    //                 <div className={styles.playerContainer}>
    //                     <div className={styles.playbackButton}>
    //                         <svg viewBox="-200 0 1200 1000">
    //                             <path fill="#00bc8c" d="M96.51 11.97c-31.23 8.05-53.26 32.76-63.42 71.27-3.45 12.84-3.64 29.7-3.64 416.71s.19 403.87 3.64 416.71c16.09 60.74 61.69 86.03 120.9 67.25 9-2.87 53.65-25.1 116.49-58.24 56.14-29.51 221.29-116.3 367.28-192.93 145.99-76.64 271.29-143.31 278.38-148.1 39.28-25.68 59.59-63.04 53.26-97.52-4.79-26.63-24.33-53.07-52.88-71.65C892 399.37 172.58 22.32 154.95 16.38c-18.97-6.33-43.3-8.24-58.44-4.41z">
    //                             </path>
    //                         </svg>
    //                     </div>
    //                     <div className={styles.audioLine} />
    //                 </div >
    //             </div>
    //         </div >
    //     );
    // }
}
