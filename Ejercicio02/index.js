class Jugador {
  constructor(nombre) {
    this.nombre = nombre;
    this.victorias = 0;
    this.derrotas = 0;
  }

  registrarVictoria() {
    this.victorias++;
  }

  registrarDerrota() {
    this.derrotas++;
  }

  obtenerHistorial() {
    return `Historial de ${this.nombre}: ${this.victorias} victorias, ${this.derrotas} derrotas.`;
  }
}

class Computadora {
  constructor() {
    this.opciones = ["piedra", "papel", "tijera"];
  }

  elegirOpcion() {
    const indice = Math.floor(Math.random() * this.opciones.length);
    return this.opciones[indice];
  }
}

class Juego {
  constructor(jugador) {
    this.jugador = jugador;
    this.computadora = new Computadora();
  }

  jugarTurno(opcionJugador) {
    const opcionComputadora = this.computadora.elegirOpcion();
    alert(`Computadora eligió: ${opcionComputadora}`);

    const resultado = this.determinarGanador(opcionJugador, opcionComputadora);

    if (resultado === "victoria") {
      alert(`¡${this.jugador.nombre} gana esta ronda!`);
      this.jugador.registrarVictoria();
    } else if (resultado === "derrota") {
      alert(`¡${this.jugador.nombre} pierde esta ronda!`);
      this.jugador.registrarDerrota();
    } else {
      alert("¡Es un empate!");
    }

    alert(this.jugador.obtenerHistorial());
  }

  determinarGanador(opcionJugador, opcionComputadora) {
    if (opcionJugador === opcionComputadora) {
      return "empate";
    } else if (
      (opcionJugador === "piedra" && opcionComputadora === "tijera") ||
      (opcionJugador === "papel" && opcionComputadora === "piedra") ||
      (opcionJugador === "tijera" && opcionComputadora === "papel")
    ) {
      return "victoria";
    } else {
      return "derrota";
    }
  }
}

function iniciarJuego() {
  const nombreJugador = prompt("Ingrese su nombre:");
  const jugador = new Jugador(nombreJugador);
  const juego = new Juego(jugador);

  let jugar = true;

  while (jugar) {
    const opcionJugador = prompt("Elija Piedra, Papel o Tijera:").toLowerCase();

    if (["piedra", "papel", "tijera"].includes(opcionJugador)) {
      juego.jugarTurno(opcionJugador);
    } else {
      alert("Opción no válida. Por favor, elija Piedra, Papel o Tijera.");
    }

    jugar = confirm("¿Quieres jugar otra vez?");
  }

  alert("Gracias por jugar. ¡Hasta luego!");
}

// Iniciar el juego
iniciarJuego();
