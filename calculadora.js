'use strict'

var props = process.argv.slice(2)

var n1 = parseFloat(props[0])
var n2 = parseFloat(props[1])

var plantilla = `
La suma es: ${n1 + n2}
La resta es: ${n1 - n2}
La multiplicacion es: ${n1 * n2}
La division es: ${n1 / n2}
`;

console.log(plantilla);