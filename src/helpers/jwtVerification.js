import jwt from "jsonwebtoken";

export const jwtVerification = (token) => {
     const verification = jwt.verify(token, process.env.JWT_SECRET);
     return verification;
}

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}