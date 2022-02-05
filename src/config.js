const dev = {
    apiUrl: 'http://localhost:9002',
    isProd: false,
    matomoUrl: 'https://server.iva/matomo',
    matomoSiteId: 3
}

const prod = {
    apiUrl: 'https://api.owenclc.com',
    isProd: true,
    matomoUrl: 'https://insights.owenclc.com',
    matomoSiteId: 3
}

const config = {
    dev: dev,
    prod: prod
}

export const configuration = config[process.env.NODE_ENV]
