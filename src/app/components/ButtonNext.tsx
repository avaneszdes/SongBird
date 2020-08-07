import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {

    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(0, 200, 135, .3)',
    color: 'white',
    height: 48,
  },
});




export default function ButtonNext() {

  const [enable, setEnable] = useState(true);

  let myValue = !enable;

  const classes = useStyles();
  return <Button
    fullWidth={true}
    disabled={myValue}
    onClick={() => { setEnable(enable != enable) }}
    variant="outlined"
    className={classes.root}>
    Next Level
      </Button>;
}
