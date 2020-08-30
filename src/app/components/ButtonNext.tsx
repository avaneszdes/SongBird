import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {

    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(0, 200, 135, .3)',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(105, 240, 174, .6)',
    color: 'white',
    height: 48,
  },
});

interface Props {
  isEnabled: boolean,
  printNextListElements: () => void,
}



export default function ButtonNext({isEnabled , printNextListElements}: Props) {

  const classes = useStyles();
  
  const showNextElements = () => {
    printNextListElements();
  }
  return <Button
    fullWidth={true}
    disabled={!isEnabled}
    onClick={showNextElements}
    variant="outlined"
    className={classes.root}>
    Next Level
      </Button>;

}
