
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

let userSchema = mongoose.Schema({

    email : { type : String },
    username : { type : String },
    password : String,
    provider: String,
    role : { type : String },
	
	//Extra Cols
	
	profile:{  },
	
   firstName: { type : String },
   lastName: { type : String },
   address1: { type : String },
   address2: { type : String },
   city: { type : String },
   country: { type : String },
   zip: { type : String },
   mobile: { type : String },

   phone: { type : String },
   gmail: { type : String },
   facebook: { type : String },
   profile_url: { type : String },
   url: { type : String },

   delivery: { type : Boolean },
   pickup: { type : Boolean },
   veg: { type : Boolean },
   cusine: { type : String },
  


});

// ## Methods

// ### Generate a hash
userSchema.methods.generateHash = function(password) {

  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// ### Check if password is valid
userSchema.methods.validPassword = function(password) {

  return bcrypt.compareSync(password, this.password);
};

// Create the model for users and expose it to the app
export default mongoose.model('User', userSchema);
