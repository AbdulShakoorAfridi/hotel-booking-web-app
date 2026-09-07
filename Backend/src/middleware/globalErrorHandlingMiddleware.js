export const errorHandler = (error, req, res, next) => {
  console.error("Global Error: ", error);

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
    }),
  });
};
