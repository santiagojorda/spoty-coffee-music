

module.exports.devMessage = (message) => {
    if(process.env.NODE_ENV === 'development')
        console.log(`\n---- ${message}`)
}