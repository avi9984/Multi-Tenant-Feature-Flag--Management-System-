const errorMiddleware = (err, req, res, next) => {
    console.log(err);

    if (err.code === 11000) {
        return res.status(400).json({
            message: "Duplicate entry",
        });
    }

    res.status(500).json({
        message: err.message || "Server Error",
    });
};

export default errorMiddleware;