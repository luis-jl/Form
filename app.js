document.addEventListener("DOMContentLoaded", function() {
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }   
    
    const formulario = document.querySelector("#formulario");
    const inputEmail = document.querySelector("#email");
    const emailCC = document.querySelector("#cc");
    const inputAsunto = document.querySelector("#asunto");
    const mensaje = document.querySelector("#textArea");
    const btnSubmit = document.querySelector("#submit");
    const btnReset = document.querySelector("#resetear");
    const spinner = document.querySelector("#spinner");
    const enviadoConExito = document.querySelector("#enviado");

    btnReset.addEventListener("click", function() {
        resetForm();
    });

    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.add("mostrar");
        spinner.classList.remove("ocultar");

        setTimeout(() => {
            spinner.classList.add("ocultar");
            spinner.classList.remove("mostrar");
            resetForm();
            enviadoConExito.classList.remove("ocultar");
            setTimeout(() => {
                enviadoConExito.classList.add("ocultar");
            }, 3000)
        }, 2000);
        
    }

    inputEmail.addEventListener("input", validar);
    inputAsunto.addEventListener("input", validar);
    mensaje.addEventListener("input", validar);
    emailCC.addEventListener("input", validarCC);
    formulario.addEventListener("submit", enviarEmail);

    function validarCC(e) {
        limpiarAlerta(e.target.parentElement);
        if(e.target.value === ""){
        }else if(!validarEmail(e.target.value)){
            mostrarAlerta("El email no es valido", e.target.parentElement);
        }
    }

    function validar(e) {
        limpiarAlerta(e.target.parentElement);

        if(e.target.value.trim() === "") {
            mostrarAlerta(`El Campo ${e.target.id} es obligatorio`, e.target.parentElement);
            comprobarEmail();
           return;
        }
        
        if(e.target.id === "email" && !validarEmail(e.target.value)) {
            mostrarAlerta("El email no es valido", e.target.parentElement);
            comprobarEmail();
            return;
        }

        email[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarEmail();
    } 

    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);
        const error = document.createElement("P");
        error. textContent = mensaje;
        error.classList.add("error"); // Los estilos estan definidos en css.
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector(".error");
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email){
        const expex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = expex.test(email);
        return resultado
    }

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add("deshabilitar");
            return;
        }
        btnSubmit.classList.remove("deshabilitar");
    }

    function resetForm() {
        email.email = "";
        email.asunto = "";
        email.mensaje = "";
        formulario.reset();
        comprobarEmail();
    }
});
