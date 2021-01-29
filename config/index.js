const com = {
    IP: JSON.stringify('114.114.114.114')
}

module.exports = {
    // dev
    dev: {
        env: {
            TYPE: JSON.stringify('dev'),
            ...com
        }
    },
    // dev
    build: {
        env: {
            TYPE: JSON.stringify('prod'),
            ...com
        }
    }
}