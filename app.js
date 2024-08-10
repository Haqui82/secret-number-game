let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

console.log(numeroSecreto);

function asignarTextoElementos(elemento, texto){
    // Selecciona elemento por el método "querySelector"
    let elementoHTML = document.querySelector(elemento);
    // Asigna contenido de la variable 'texto' al elemento selecciona
    elementoHTML.innerHTML = texto;
    return;
}
// Compara el número secreto con los intentos del usuario
function verificarIntento(){
    // Selecciona elemento por el método "getElementById" y accede al atributo "value" y luego lo transforma a un entero con "parseInt"
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    console.log(intentos);

    // El usuario acierta
    if (numeroDeUsuario === numeroSecreto) {
        // Invoca función usando "template strings" como parametro
        asignarTextoElementos('p', `haz ganado, acertaste el número en ${intentos} ${(intentos=== 1) ? 'intento': 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled')
        // El usuario no acierta entonces se indican pistas
        } else {
            if(numeroDeUsuario < numeroSecreto){
                asignarTextoElementos('p', 'El número secreto es mayor');
            } else{
                asignarTextoElementos('p','El número secreto es menor');
            }
            intentos++;
            limpiarCaja();
    }

    return;
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;  

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    // Valida si ya se usó el "numeroMaximo" de numeros a generar y envia mensaje
    if(listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElementos('p', 'Ya se jugaron todos los números posibles');
    // continua el juego desde que no se llegue al "numeroMaximo"    
    }else{
        // Genera un nuevo numero si el numero generado ya aparece en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();  
        // retorna numero que no exista en la lista y lo adiciona a la lista       
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;        
        }
    }
} 

function limpiarCaja(){
    // Selecciona elemento por el método "querySelector" pero indicando el ID del elemento (#)
    // Asigna vacio ('') al atributo 'value' del elemento seleccionado
    document.querySelector('#valorUsuario').value = '';   
}

function condicionesIniciales() {
    asignarTextoElementos('h1', 'Juego del Número Secreto'); 
    asignarTextoElementos('p', `Indica un número del 1 al ${numeroMaximo}`); 
    // Genera número aleatorio
    numeroSecreto = generarNumeroSecreto();
    // Reinicializa el número de intentos
    intentos = 1;
}

function reiniciarJuego(){
    // limpia caja de texto
    limpiarCaja();
    // Inica mensaje inicial de intervalo de números
    condicionesIniciales();    
    // Deshabilita boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute ('disabled','true');
}

condicionesIniciales();