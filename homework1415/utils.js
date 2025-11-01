const fs = require('fs/promises')

async function readFile(filePath, isParsed) {
    if (!filePath) return
    const data = await fs.readFile(filePath, 'utf-8')
    return isParsed ? JSON.parse(data) : data
}

async function writeFile(filePath, data) {
    if (!filePath || !data) return
    await fs.writeFile(filePath, typeof data === 'string' ? data : JSON.stringify(data))
    console.log('wrote successfully')
}

module.exports = { readFile, writeFile }
