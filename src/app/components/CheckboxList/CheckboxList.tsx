import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        border: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 7,
        margin: 0,
        boxShadow: '0 3px 5px 2px rgb(105, 240, 174)',
        color: 'white',
        height: 70,
        fontSize: 500,
        padding: 1,
    },
    
   
});

export default function CheckboxList() {
    const [value, setValue] = React.useState('female');


    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <FormControl fullWidth={true} focused={true} >
            <RadioGroup value={value} onChange={handleChange}>
                <FormControlLabel className={classes.root}  value="0" control={<Radio />} label="Female" />
                <FormControlLabel className={classes.root} value="1" control={<Radio />} label="Male" />
                <FormControlLabel className={classes.root} value="2" control={<Radio />} label="Other" />
                <FormControlLabel className={classes.root} value="3" control={<Radio />} label="Male" />
                <FormControlLabel className={classes.root} value="4" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
    );
}
