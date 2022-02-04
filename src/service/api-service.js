import {configuration} from '@/config'

export default {
    fetchChildInfo(qrCode) {
        return new Promise(
            (resolve, reject) => {
                fetch(configuration.apiUrl + '/codes', {
                    method: 'get',
                    headers: {'Content-Type': 'application/json', 'code': qrCode}
                })
                    .then((response) => {
                        if (response.status === 200) {
                            response
                                .json()
                                .then(resolve)
                                .catch((err) => {
                                    console.error('Failed to convert response to json from code ' + qrCode, err)
                                    reject('We\'re sorry, it looks like the connection to the server is broken. Please try again later.')
                                })
                        } else {
                            console.error('Server responded with status ' + response.status + ' while trying to fetch info for the code ' + qrCode)
                            reject('We\'re sorry, it looks like the server sent an invalid response. Please try again later.')
                        }
                    })
                    .catch((err) => {
                        console.error('Failed to fetch child info from code ' + qrCode, err)
                        reject('We\'re sorry, we could not connect to the server. Please try again later.')
                    })
            }
        )
    },
    notifyChildIsWell(code) {
        return new Promise(
            (resolve, reject) => {
                fetch(configuration.apiUrl + '/codes', {
                    method: 'post',
                    body: JSON.stringify({ accepted: true }),
                    headers: {'Content-Type': 'application/json', 'code': code}
                })
                    .then((response) => {
                        if (response.status === 200) {
                            resolve()
                        } else {
                            console.error('Server responded with status ' + response.status + ' while trying to notify child is well for the code ' + code)
                            reject('We\'re sorry, it looks like the server sent an invalid response. Please try again later.')
                        }
                    })
                    .catch((err) => {
                        console.error('Failed to notify server that child with code ' + code + ' is well.', err)
                        reject('We\'re sorry, we could not connect to the server. Please try again later.')
                    })
            }
        )
    },
    notifyChildIsUnwell(code, symptomNames) {
        return new Promise(
            (resolve, reject) => {
                fetch(configuration.apiUrl + '/codes', {
                    method: 'post',
                    body: JSON.stringify({ accepted: false, symptoms: symptomNames}),
                    headers: {'Content-Type': 'application/json', 'code': code}
                })
                    .then((response) => {
                        if (response.status === 200) {
                            resolve()
                        } else {
                            console.error('Server responded with status ' + response.status + ' while trying to notify child is unwell for the code ' + code)
                            reject('We\'re sorry, it looks like the server sent an invalid response. Please try again later.')
                        }
                    })
                    .catch((err) => {
                        console.error('Failed to notify server that child with code ' + code + ' is unwell.', err)
                        reject('We\'re sorry, we could not connect to the server. Please try again later.')
                    })
            }
        )
    }
}
