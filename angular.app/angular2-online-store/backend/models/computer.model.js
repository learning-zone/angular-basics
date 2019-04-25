"use strict";

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ComputerSchema = new Schema({
    _id:         {type: Number},
    title:       {type: String},
    brand:       {type: String},
    price:       {type: Number},
    image:       {type: String},
    description: {type: String},
    details:     {type: Array},
    date:        {type: Number}
});

mongoose.model('Computer', ComputerSchema);