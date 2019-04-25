// ```
// shop.model.js
// shop.model.js may be freely distributed under the MIT license
// ```

// */app/models/shop/shop.model.js*

// ## Shop Model

// Note: MongoDB will autogenerate an _id for each Shop object created

// Grab the Mongoose module
import mongoose from 'mongoose';

// Create a `schema` for the `Shop` object
let shopSchema = new mongoose.Schema({
    title: { type : String },
    cuisine: { type : String },
    userId: { type : String },

    no: { type : Number },

    isVeg:{ type : Boolean },
    isDelivery:{ type : Boolean },
    isPickup:{ type : Boolean },
    latitude : { type : Number } ,
    longitude: { type : Number },
    url:{ type : String },
    imageUrl:{ type : String }
        

});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('Shop', shopSchema);
