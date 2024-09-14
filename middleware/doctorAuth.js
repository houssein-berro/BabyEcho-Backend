import jwt from 'jsonwebtoken';

export const doctorAuth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (req.user.UserType !== 'doctor') {
      return res.status(403).json({ message: 'Access denied. You are not authorized as a doctor.' });
    }

    next(); // User is a doctor, proceed with the request
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default doctorAuth;
