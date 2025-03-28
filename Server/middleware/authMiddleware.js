
// Export protect as the default export and verifyToken as a named export
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;
 


export const protect = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token using JWT_SECRET
    req.user = decoded.userId;  // Attach user info to the request object
    next();  // Allow the request to proceed
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};




// Named export for verifyToken
export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

// export const verifyToken = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"

//   if (!token) {
//     return res.status(401).json({ message: "Access Denied. No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user info (userId & role) to request object
//     next();
//   } catch (error) {
//     res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

// // Middleware to check for Admin role
// export const verifyAdmin = (req, res, next) => {
//   if (!req.user || req.user.role !== "Admin") {
//     return res.status(403).json({ message: "Access Denied. Admins only." });
//   }
//   next();
// };