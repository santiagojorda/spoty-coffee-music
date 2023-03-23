

module.exports.devTitle = (title) => {
    if(process.env.NODE_ENV === 'development')
        console.log(`---- ${title}\n`)
}

module.exports.devMessage = (message) => {
    if(process.env.NODE_ENV === 'development')
        console.log(`${message}\n`)
}