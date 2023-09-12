const mongoose = require('mongoose');
const express = require('express')
const dbURL = 'mongodb://0.0.0.0:27017/RudraInnovative';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
    .connect(dbURL, options)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });