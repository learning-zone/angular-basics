import mongoose from 'mongoose';

let orderItemSchema = new mongoose.Schema({
    orderId: { type : String },
    productId: { type : String },
    quantity: { type: Number},    
	rate: { type: Number},
	
	amount: { type: Number},    
	taxRate: { type: Number},    
	tax: { type: Number},    
	amountWithTax: { type: Number},    
	deliveryCharges: { type: Number},    
	totalAmount: { type: Number},    
	
    option1: { type : String },
    option2: { type : String },
    instructions: { type : String }
    
    
});

export default mongoose.model('OrderItem', orderItemSchema);
