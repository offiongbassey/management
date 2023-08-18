import jwt from "jsonwebtoken";

export const jwtVerification = (token) => {
     const verification = jwt.verify(token, process.env.JWT_SECRET);
     return verification;
}