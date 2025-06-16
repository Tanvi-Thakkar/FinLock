const mongoose = require("mongoose");


const bycrypt = require("bcryptjs");


const UserSchema = new mongoose.Schema(
    {
        fullName: {
            typr: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profileImageUrl: {
            type: String,
            default: null, // Default profile image URL
        },
        age: {
            type: Number,
            required: true,
        },
    },
    {timestamps: true} // Automatically manage createdAt and updatedAt fields
);


//hash password before saving - uses middleware
UserSchema.pre('save', async function (next){  //before saving the user document, this function will be called
    //if password is not modified, skip hashing
    if(!this.isModified('password')) {
        return next();
    }
    this.password = await bycrypt.hash(this.password, 10);
    next();

});


//compare password
UserSchema.methodes.comparePassword = async function (candidatePassword){
    return await bycrypt.compare(candidatePassword, this.password);
}; // Method to compare candidate password with hashed password during login

module.exports = mongoose.model("User", UserSchema); // Export the User model