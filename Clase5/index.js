const moment = require('moment');

console.log(`
    Hoy es: ${moment().format('DD/MM/YYYY')}
    Naci el dia: ${moment("1988-05-19").format('DD/MM/YYYY')}
    Desde mi nacimiento pasaron:  ${moment().diff('1988-05-19', 'years')} años
    Desde mi nacimiento pasaron: ${moment().diff('1988-05-19', 'days')} dias 
`)