/* eslint-disable quotes */
/* eslint-disable indent */
'use strict';
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.use((req,res) => {
    res.send ("Hello");
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
