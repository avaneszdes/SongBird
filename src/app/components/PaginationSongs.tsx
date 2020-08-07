import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import green from '@material-ui/core/colors/green'; 

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function PaginationSongs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper style={{background: green.A200, fontWeight: 900 }}className={classes.root}>
            <Tabs
                value={value}
                indicatorColor="secondary"
                textColor="secondary"
                variant="fullWidth"
                onChange={handleChange}
                centered
            >
                <Tab label="Разминка" />
                <Tab label="Воробьные" />
                <Tab label="Лесные птицы" />
                <Tab label="Певчие птицы" />
                <Tab label="Хищные птицы" />
                <Tab label="Морские птицы" />
            </Tabs>
        </Paper>
    )
}