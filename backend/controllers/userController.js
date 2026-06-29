// import uploadOnCloudinary from "../configs/cloudinary.js";

import User from "../models/userModel.js";

export const getCurrentUser = async (req,res) => {
    try {
        const user = await User.findById(req.userId).select("-password").populate("enrolledCourses")// -password karne se password nahi access ho payega
         if(!user){
            return res.status(400).json({message:"user does not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
    console.log("Current User Error:", error);
    return res.status(400).json({
        message: error.message
    });
}
}

