const d = document;
const textarea = d.getElementById("input");
const muneco = d.querySelector(".Img-Muñeco");
const carga = d.querySelector(".loader");
const resultadotext = d.getElementById("parrafo_rectangulo");
const resulttitle = d.getElementById("titulo_mensaje");
const buttonencrip = d.getElementById("encriptarBtn");
const buttondesencrip = d.getElementById("desencriptarBtn");
const buttoncopiar = d.getElementById("copiarBtn");

const llaves = [
  ["e", "enter"],
  ["i", "imes"],
  ["o", "ober"],
  ["u", "ufat"],
  ["a", "ai"],
];

function encriptarMensaje(mensaje) {
  let mensajeEncriptado = "";
  for (let i = 0; i < mensaje.length; i++) {
    let letra = mensaje[i];
    let encriptada = letra;
    for (let j = 0; j < llaves.length; j++) {
      if (letra === llaves[j][0]) {
        encriptada = llaves[j][1];
        break;
      }
    }
    mensajeEncriptado += encriptada;
  }
  return mensajeEncriptado;
}

function desencriptarMensaje(mensaje) {
  let mensajeDesencriptado = mensaje;

  for (let i = 0; i < llaves.length; i++) {
    let regex = new RegExp(llaves[i][1], "g");
    mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
  }

  return mensajeDesencriptado;
}

// Tendría que ocultar los elementos pero no lo hace
 textarea.addEventListener("input", (e) => {
 muneco.style.display = "none";
 carga.removeAttribute("hidden");
 resulttitle.textContent = "Procesando el texto ...";
 resultadotext.textContent = "";
 
});

// Si funciona el botón encriptar pero no aparece el mensaje "el resultado es:" y no se oculta la imagen ni el texto del recuadro
buttonencrip.addEventListener('click',(e)=> {
  e.preventDefault();
  let mensaje = textarea.value.toLowerCase();
  let mensajeEncriptado = encriptarMensaje(mensaje);
  resultadotext.textContent = mensajeEncriptado;
  buttoncopiar.removeAttribute("hidden");
  resulttitle.textContent = "el resultado es:";
});

buttondesencrip.addEventListener("click", (e) => {
  e.preventDefault();
  let mensaje = textarea.value.toLowerCase();
  let mensajeDesencriptado = desencriptarMensaje(mensaje);
  resultadotext.textContent = mensajeDesencriptado;
  buttoncopiar.removeAttribute("hidden");
});

buttoncopiar.addEventListener("click", () => {
  let textoCopiado = resultadotext.textContent;
  navigator.clipboard.writeText(textoCopiado).then(() => {
    muneco.style.display = "block";
    //carga.classList.add("hidden");
    resulttitle.textContent = "el texto se copió";
  });
});