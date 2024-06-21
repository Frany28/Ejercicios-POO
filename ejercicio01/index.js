class Personaje {
  constructor(nombre, vida = 2000, defensa = 3, cantidad = 10) {
    this.nombre = nombre;
    this.vida = vida;
    this.defensa = defensa;
    this.ataques = this.generarAtaquesAleatorios(1, 2000, cantidad);
  }

  generarAtaquesAleatorios(min, max, cantidad) {
    const ataques = [];
    for (let i = 0; i < cantidad; i++) {
      ataques.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return ataques;
  }

  atacar(otroPersonaje) {
    const ataque =
      this.ataques[Math.floor(Math.random() * this.ataques.length)];
    const danio = Math.random() <= 0.5 ? ataque : 0;
    otroPersonaje.vida -= danio;
    if (otroPersonaje.vida < 0) {
      otroPersonaje.vida = 0;
    }
    console.log(
      `${this.nombre} ataca a ${otroPersonaje.nombre} con ${danio} de daño. Vida restante de ${otroPersonaje.nombre}: ${otroPersonaje.vida}`
    );
  }

  defender() {
    this.vida += this.defensa;
    console.log(
      `${this.nombre} se defiende y recupera ${this.defensa} de vida. Vida actual: ${this.vida}`
    );
  }
}

class Combate {
  constructor(personaje1, personaje2) {
    this.personaje1 = personaje1;
    this.personaje2 = personaje2;
  }

  iniciar() {
    while (this.personaje1.vida > 0 && this.personaje2.vida > 0) {
      this.turno(this.personaje1, this.personaje2);
      if (this.personaje2.vida <= 0) break;
      this.turno(this.personaje2, this.personaje1);
    }
    this.declararGanador();
  }

  turno(atacante, defensor) {
    const accion = Math.random() < 0.5 ? "atacar" : "defender";
    if (accion === "atacar") {
      atacante.atacar(defensor);
    } else {
      atacante.defender();
    }
  }

  declararGanador() {
    if (this.personaje1.vida > 0) {
      console.log(`${this.personaje1.nombre} ha ganado la pelea!`);
    } else {
      console.log(`${this.personaje2.nombre} ha ganado la pelea!`);
    }
  }
}

const sonic = new Personaje("Sonic");
const mario = new Personaje("Mario");

const combate = new Combate(sonic, mario);
combate.iniciar();
