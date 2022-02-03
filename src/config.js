const dev = {
    apiUrl: 'http://localhost:9002'
}

const prod = {
    apiUrl: 'https://api.owenclc.com'
}

const config = {
    dev: dev,
    prod: prod
}

export const configuration = config[process.env.NODE_ENV]
