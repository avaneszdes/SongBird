import React from 'react';
import styles from './CheckboxList.css';
import { Bird } from '../BirdData';

interface Props {
    onSelectedCorrect: (item : Bird) => void,
    birds: Bird[],
}

export default function CheckboxList({ onSelectedCorrect, birds  }: Props) {

    
    const getCorrectAnswer = (item: Bird) => {
        
        onSelectedCorrect(item);
    }
    
    
    return (
        <div>
            {birds.map((item) =>
                <div key={item.name} className={styles.listItem} onClick={() => {getCorrectAnswer(item); }} >
                    <input id={item.name}
                        style={{marginRight: 20}}
                        className={item.radio}
                        type='radio'
                        onChange={()=> {}}
                        checked={item.selected}
                        
                    />
                    {item.name}
                </div>
            )}

        </div>
    );
}

