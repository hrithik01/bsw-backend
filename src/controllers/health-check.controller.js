import packageJson from '../../package.json' assert { type: "json" }

const healthCheck = (req, res) => {
    res.send({ statusCode: 200, message: 'Server is running!' })
}

const getVersions = (req, res) => {
    const version = packageJson.version
    res.send({ version })
}

export const healthCheckController = {
    healthCheck,
    getVersions
}