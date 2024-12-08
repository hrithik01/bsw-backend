import rateLimit from 'express-rate-limit'
const { IP_MAX_REQ, IP_TIME_FRAME, PATH_MAX_REQ, PATH_TIME_FRAME, AUTH_TIME_FRAME, AUTH_MAX_REQ } = process.env

function createRL(keyFunction, timeFrame, maxReq) {
    return rateLimit({
        windowMs: parseInt(timeFrame) * 1000,
        max: maxReq,
        keyGenerator: keyFunction,
        handler: (req, res) => {
        res.status(429).send('Too many requests, please try again later.')
        },
        standardHeaders: true,
        legacyHeaders: false
    })
}

export const ipRL = createRL((req) => 'h2j-bsw-' + req.ip, IP_TIME_FRAME, parseInt(IP_MAX_REQ))
export const pathRL = createRL((req) => 'h2j-bsw-' + req.path, PATH_TIME_FRAME, parseInt(PATH_MAX_REQ))
export const staticRL = createRL((req) => 'h2j-bsw-static', PATH_TIME_FRAME, parseInt(PATH_MAX_REQ)*5)
export const authRL = createRL((req) => 'h2j-bsw-auth', AUTH_TIME_FRAME, parseInt(AUTH_MAX_REQ))