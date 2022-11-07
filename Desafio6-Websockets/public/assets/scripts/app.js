const socket = io.connect();
const productForm = document.querySelector("#productForm");
const chatForm = document.querySelector("#chatForm");

// Envia una petición al servidor de  
// añadir un nuevo producto mediante fetch
async function addProduct() {
  try {
    const host = window.location.protocol + "//" + window.location.host;
    const destURL = new URL("/productos", host);
    const responseData = await fetch(destURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: productForm.title.value,
        price: productForm.price.value,
        thumbnail: productForm.thumbnail.value,
      }),
    });
    if (responseData.status === HTTP_STATUS_CREATED) {
      productForm.reset();
      productForm.title.focus();
    } else {
      // si el resultado no es el esperado
      // se muestra un mensaje con el error
      response = await responseData.json();

      if (typeof Swal !== "undefined") {
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: response.error,
        });
      } else {
        alert(response.error);
      }
    }
  } catch (error) {
    console.log("error=", error);
  }
}

// submit formulario productos
productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addProduct();
});

// submit formulario chat
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

// renderiza la lista de productos mediante la
// plantilla predefinida
function makeProductTable(productos) {
  return fetch("/assets/views/tabla_productos.hbs")
    .then((respuesta) => respuesta.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const html = template({ productos });
      return html;
    });
}

// renderiza la lista de mensajes del chat
// con la plantilla predefinida
function makeChatTable(mensajes) {
  return fetch("/assets/views/tabla_chat.hbs")
    .then((respuesta) => respuesta.text())
    .then((plantilla) => {
      const template = Handlebars.compile(plantilla);
      const html = template({ mensajes });
      return html;
    });
}

// websocket: envia un nuevo mensaje
// de chat al servidor
function sendMessage() {
  const mensaje = {
    email: chatForm.email.value,
    mensaje: chatForm.mensaje.value,
  };
  socket.emit("mensaje", mensaje);
  chatForm.reset();
  chatForm.email.focus();
}

// websocket: recibe la lista de productos
socket.on("productos", (productos) => {
  makeProductTable(productos).then((html) => {
    document.getElementById("productos").innerHTML = html;
  });
});

// websocket: recibe los mensajes de chat
socket.on("mensajes", (mensajes) => {
  makeChatTable(mensajes).then((html) => {
    document.getElementById("mensajes").innerHTML = html;
  });
});
