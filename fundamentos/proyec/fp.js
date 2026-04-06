

function mostrarFecha() {
    const fecha = new Date();
    console.log(fecha.toLocaleString());
}
mostrarFecha();



function evaluarNota(nota) {
    if (nota >= 3.5) {
        return "aprobado"
    } else {
        return "reprobado"
    }
}
console.log(evaluarNota(4.0));
console.log(evaluarNota(2.0));



const convertirMayusculas = (texto) => {
    return texto.toUpperCase();
};
console.log(convertirMayusculas("hola mundo"));



const esParOIpar = (numero) => {
    if (numero % 2 === 0) {
        return "par"
    } else {
        return "impar"
    }
};
console.log(esParOIpar(4));
console.log(esParOIpar(7));
