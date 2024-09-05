// readFilesSync es sincronrono

/*

const fs = require('node:fs')

console.log('Leyendo el primer archivo...')
const text = fs.readFileSync('./archivo.txt', 'utf-8')

console.log(text)

console.log('Leyendo el segundo archivo....')
const secondText = fs.readFileSync('./archivo2.txt', 'utf-8')

console.log(secondText)

*/ 

const fs = require('node:fs')

console.log('Leyendo el primer archivo...')
fs.readFile('./archivo.txt', 'utf-8', (err, text) => { // <--- ejecutas este callback
    console.log('Primer Texto', text)
}) 

console.log('---> Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
    console.log('Segundo Texto', text)
})

 // Min 55 del video