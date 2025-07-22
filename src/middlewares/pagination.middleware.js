

export function pagination (req, res, next) {

    const page = Math.max(1, parseInt(req.query.page)) || 1;
    const limit = Math.max(1, parseInt(req.query.limit)) || 10;
    const skip = (page -1 ) * limit;

    req.pagination = {page, limit, skip};
    
    next();
}