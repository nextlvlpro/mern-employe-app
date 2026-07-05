export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid resource id' });
  }

  if (error.code === 11000) {
    return res.status(409).json({ message: 'Duplicate record found' });
  }

  return res.status(statusCode).json({
    message: error.message || 'Server error'
  });
};
