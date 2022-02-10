const dev = {
    name: 'development',
    apiUrl: 'http://localhost:9002',
    isProd: false,
    matomoUrl: 'https://server.iva/matomo',
    matomoSiteId: 3,
    sentrySampleRate: 1.0
}

const prod = {
    name: 'production',
    apiUrl: 'https://api.owenclc.com',
    isProd: true,
    matomoUrl: 'https://insights.owenclc.com',
    matomoSiteId: 3,
    sentrySampleRate: 0.4
}

const config = {
    development: dev,
    production: prod
}

export const configuration = config[process.env.NODE_ENV]
