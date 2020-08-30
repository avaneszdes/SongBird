import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import green from '@material-ui/core/colors/green'; 


interface Props{
    numberOfTypeBird: number,
}

export default function PaginationSongs({ numberOfTypeBird } : Props) {
    return (
        <Paper style={{background: green.A200, fontWeight: 900 }}>
            <Tabs
                value={numberOfTypeBird}
                indicatorColor="secondary"
                textColor="secondary"
                variant="fullWidth"
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