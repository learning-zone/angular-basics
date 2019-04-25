import mongoose from 'mongoose';

let cartSchema = new mongoose.Schema({
	userId: { type: String},
	sessionId: { type: String},
	date: { type: String},
	ip: { type: String},
	cookie: { type: String},

	productId: { type: String},
	shopId: { type: String},
  
	
    title: { type : String },
    
    quantity: { type: Number},
    completed: { type: Boolean},
    removed: { type: Boolean},
    
    rate: { type: Number},
    latitude: { type: Number},
    longitude: { type: Number},
   
});

export default mongoose.model('Cart', cartSchema);
