const jwt = require("jsonwebtoken");
const User = require("../models/User");

//generate jwt token
const generateToken = (id)=> {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
}

//register user
exports.registerUse = async (req, res) =>{
    const { fullName, email, password,profileImageUrl, age } = req.body;

    //validation for missing fields
    if(!fullName || !email ||!password || !age) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        //check if email already exist
        const existingUse = await User.findOne({email});
        if(existingUse) {
            return res.status(400).json({ message: "User already exists" });
        }

        //create the user 
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
            age,
        });
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            age: user.age,
            token: generateToken(user._id), // Generate JWT token
        });
    }  catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//login user
exports.loginUser = async (req, res) => {};

//get user info
exports.getUserInfo = async (req, res) => {};

