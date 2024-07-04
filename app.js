//Definicion variables
let numeroMaximoEnRango = 10;
let numeroDeIntentos = 1;
let listaNumerosAleatoriosUsados = [];


//Funcion que calcula el numero aleatorio
/*
function generacionNumeroAleatorio() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximoEnRango) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosAleatoriosUsados);

    if (listaNumerosAleatoriosUsados.length == numeroMaximoEnRango) {
        insertarTexto('p', 'Ya se jugaron todos los numeros del rango')
    } else {
        if (listaNumerosAleatoriosUsados.includes(numeroGenerado)) {
            return generacionNumeroAleatorio();//Si el numero ya existe en la lista genera un nuevo numero aleatorio
        } else {
            listaNumerosAleatoriosUsados.push(numeroGenerado);//Si el numero no existe lo agrega a la lista
        }
    }
}
*/
// Funcion que calcula el numero aleatorio CHAT GPT
function generacionNumeroAleatorio() {
    if (listaNumerosAleatoriosUsados.length == numeroMaximoEnRango) {
        insertarTexto('p', 'Ya se jugaron todos los numeros del rango');
        return null; // Return null to indicate that no new number can be generated
    }
    let numeroGenerado;
    do {
        numeroGenerado = Math.floor(Math.random() * numeroMaximoEnRango) + 1;
    } while (listaNumerosAleatoriosUsados.includes(numeroGenerado));

    listaNumerosAleatoriosUsados.push(numeroGenerado); // Agrega el numero generado a la lista
    return numeroGenerado; // Return the generated number
}

//Funcion que permite agregar texto a un elemento de HTML
function insertarTexto(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

insertarTexto('h1', 'Adivina el numero secreto');

let numeroAleatorio = parseInt(generacionNumeroAleatorio());

//Funcion que valida si el numero aleatorio es igual al numero del usuario
function validarNumeroSecreto() {
    let numeroUsuario = parseInt(document.getElementById('numero_registrado_usuario').value);

    // Valida si el campo está vacío
    if (isNaN(numeroUsuario) || numeroUsuario === "") {
        insertarTexto('p', 'No has registrado el número');
        return; // Salir de la función si el campo está vacío
    }

    // Valida si el numero secreto es igual al numero del usuario
    if (numeroUsuario === numeroAleatorio) {
        insertarTexto('p', `Acertaste en ${numeroDeIntentos} ${numeroDeIntentos == 1 ? 'intento' : 'intentos'}.`); //el operador ternario "?" permite evaluar una variable dentro del string
        document.getElementById('reiniciar').removeAttribute('disabled'); //obtiene el elemento y modifica el atributo del campo
    } else {
        if (numeroUsuario > numeroAleatorio) {
            insertarTexto('p', "Pista!! El numero secreto es menor");
        } else {
            insertarTexto('p', "Pista!! El numero secreto es mayor");
        }
        numeroDeIntentos++;
        limpiarCampoNumero()
    }
    return;
}

function limpiarCampoNumero() {
    let valorEnCampo = document.querySelector('#numero_registrado_usuario');
    valorEnCampo.value = '';
}

function nuevoJuego() {
    //limpiar el campo
    limpiarCampoNumero();
    //Generar nuevamente el numero aleatorio
    numeroAleatorio = generacionNumeroAleatorio();
    //Inicializar el contador de intentos
    numeroDeIntentos = 1;
    //Validar el numero secreto
    validarNumeroSecreto();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}


