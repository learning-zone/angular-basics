"use strict";

const mongoose = require('mongoose');

const serverConfig = require('../server.config');


require('../models/computer.model');

const Computer = mongoose.model('Computer');

function setUpConnection(){

    mongoose.connect(`mongodb://${serverConfig.db.host}:${serverConfig.db.port}/${serverConfig.db.name}`);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log("Successfully connected to the database")
    });
}


function getAllComputers(){
    return Computer.find();
}

function getComputerById(id){
    return Computer.findById(id);
}

function createNewComputer(newComputer){
    const computer = new Computer(newComputer);

    return computer.save();
}


function deleteExistingComputer(id){
    return Computer.findById(id).remove();
}

function updateExistingComputer(newComputer){
    return Computer.findOne({ _id: newComputer._id }, (err, existingComputer) => {
        if(err) {
            console.log(`Cannot update computer ${err}`);
        }
        existingComputer = Object.assign(existingComputer, newComputer);

        existingComputer.save();
    });
}

module.exports = {
    setUpConnection,
    getAllComputers,
    getComputerById,
    createNewComputer,
    deleteExistingComputer,
    updateExistingComputer
};