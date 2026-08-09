const REQUIRED_ENV = ['MONGO_URI', 'JWT_SECRET', 'NODE_ENV']

const validateEnv = () => {
    REQUIRED_ENV.forEach(env => {
        if (!process.env[env]){
            console.error(`Missing environment variable : ${env}`)
            process.exit(1)
        }
    })
}

export default validateEnv