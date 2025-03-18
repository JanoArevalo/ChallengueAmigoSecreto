// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
const amigos = [];
const inputAmigo = document.querySelector("#amigo");
const listaAmigos = document.querySelector("#listaAmigos");
const resultado = document.querySelector("#resultado");
const sonidoSorteo = new Audio("https://www.fesliyanstudios.com/play-mp3/2763");

sonidoSorteo.load();
document.addEventListener("click", () => (sonidoSorteo.muted = false));

function capturarNombre() {
    return inputAmigo.value.trim();
}

function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
    
    if (!nombre) {
        alert("Por favor, inserte un nombre.");
        return false;
    }
    if (!regex.test(nombre)) {
        alert("El nombre solo puede contener letras y espacios.");
        return false;
    }
    if (amigos.includes(nombre)) {
        alert("Este nombre ya está en la lista.");
        return false;
    }
    return true;
}

function agregarAmigo() {
    const nombre = capturarNombre();
    
    if (!validarNombre(nombre)) return;

    amigos.push(nombre);
    inputAmigo.value = "";
    actualizarInterfaz();
}

function actualizarInterfaz() {
    listaAmigos.innerHTML = amigos
        .map(amigo => 
            `<li class="amigo-item">
                <span>${amigo}</span>
                <button class="btn-eliminar" onclick="eliminarAmigo('${amigo}')">❌</button>
            </li>`
        )
        .join("");
}

function eliminarAmigo(nombre) {
    const index = amigos.indexOf(nombre);
    if (index !== -1) {
        amigos.splice(index, 1);
        actualizarInterfaz();
    }
}

function sortearAmigo() {
    resultado.innerHTML = "";

    if (amigos.length === 0) {
        alert("No hay amigos para sortear.");
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceAleatorio];

    resultado.innerHTML = `<li>Amigo secreto: ${amigoSorteado}</li>`;

    lanzarConfeti();
    sonidoSorteo.play().catch(err => console.error("Error reproduciendo el sonido:", err));
}

function lanzarConfeti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Permitir agregar con Enter
inputAmigo.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        agregarAmigo();
    }
});
