export const responseHandler = (res, statusCode, success, message, data) => {
    return res.status(statusCode).json({ success, statusCode, message, data });
}
