import mongoose from 'mongoose';

let orderSchema = new mongoose.Schema({
	userId:{ type : String },
	sellerId:{ type : String },	
	shopId: { type: String},
	date: { type: String},
	time: { type: String},
	timeZone: { type: String},
	ip: { type: String},
	session: { type: String},
	cookie: { type: String},
	amount: { type: Number},
	currency: { type: String},
	deliveryType: { type: String},
	latitude: { type: Number},
	longitude: { type: Number},
	address1: { type: String},
	address2: { type: String},
	zipcode: { type: String},
	city: { type: String},
	state: { type: String},
	country: { type: String},
	phone1: { type: String},
	phone2: { type: String},
	email: { type: String}
	
	
	
	
	
});

export default mongoose.model('Order', orderSchema);
