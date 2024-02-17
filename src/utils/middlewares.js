export function checkDeleteAccessKeyMiddleware(req, res, next) {
    const key = req.headers['x-access-key'];
    if (!key) {
        res.status(401).json({ message: 'x-access-key required in headers to delete' });
    } else if (key === process.env.DELETE_ACCESS_KEY) {
        next();
    } else {
        res.status(401).json({ message: 'Invalid Key' });
    }
}
