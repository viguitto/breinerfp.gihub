let box = document.getElementById("box");
let score = document.getElementById("score");
let time = document.getElementById("time");

let puntos = 0;
let tiempo = 20;
let juegoActivo = false;

// Colores aleatorios
function colorRandom() {
    let colores = ["red", "blue", "green", "purple", "orange"];
    return colores[Math.floor(Math.random() * colores.length)];
}

// Mover caja con animación
function moverCaja() {
    let x = Math.random() * 350;
    let y = Math.random() * 350;

    box.style.left = x + "px";
    box.style.top = y + "px";
    box.style.backgroundColor = colorRandom();

    // Animación de aparición
    box.style.transform = "scale(0)";
    setTimeout(() => {
        box.style.transform = "scale(1)";
    }, 100);
}

// Click en la caja
box.addEventListener("click", function() {
    if (!juegoActivo) return;

    puntos++;
    score.textContent = puntos;

    moverCaja();
});

// Iniciar juego
function iniciarJuego() {
    puntos = 0;
    tiempo = 20;
    juegoActivo = true;

    score.textContent = puntos;
    time.textContent = tiempo;

    moverCaja();

    let intervaloTiempo = setInterval(function() {
        tiempo--;
        time.textContent = tiempo;

        if (tiempo <= 0) {
            clearInterval(intervaloTiempo);
            juegoActivo = false;
            alert("⏰ Fin del juego. Puntos: " + puntos);
        }
    }, 1000);
}