
import jwt from "jsonwebtoken"
const isAuth = async (req, res, next) => {
    try {
        console.log("Cookies:", req.cookies);

        const token = req.cookies?.token;

        console.log("Token:", token);

        if (!token) {
            return res.status(400).json({ message: "No token" });
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded:", verifyToken);

        req.userId = verifyToken.userId;

        next();
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message,
            stack: error.stack
        });
    }
};
export default isAuth