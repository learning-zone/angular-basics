// ```
// product.model.js
// product.model.js may be freely distributed under the MIT license
// ```

// */app/models/product/product.model.js*

// ## Product Model

// Note: MongoDB will autogenerate an _id for each Product object created

// Grab the Mongoose module
import mongoose from 'mongoose';

// Create a `schema` for the `Product` object
let productSchema = new mongoose.Schema({
    title: { type : String },
    code: { type : String },
    price: { type: Number},
    
    rate: { type: Number},
    latitude: { type: Number},
    longitude: { type: Number},
    cuisine: { type : String },
    unitQty: { type : String },
    unit: { type : String },
    options1: { type: Array },
    options2: { type: Array },
    orderTime: { type: String },
    orderDays: { type: String },
    prepareTime: { type: String },
    deliveryTime: { type: String },
    paymentCond: { type: String },


    currency: { type : String },
    imageUrl: { type : String },
    image: { type : String },

    url: { type : String },

  
  tags: { type: Array },
  rating: { type: Number},
  reviews: { type: Number},
  points: { type: Number},
  orders: { type: Number},



  description: { type : String },
  shopId: { type: String},
  
  userId: { type: String}
  
});

// Expose the model so that it can be imported and used in
// the controller (to search, delete, etc.)
export default mongoose.model('Product', productSchema);
