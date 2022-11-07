const loginForm = document.querySelector("#loginform");

// submit formulario login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  login();
});

async function login() {
  try {
    const host = window.location.protocol + "//" + window.location.host;
    const destURL = new URL("/api/login", host);
    const responseData = await fetch(destURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario: loginForm.nombre.value,
      }),
    });
    if (responseData.status === HTTP_STATUS_OK) {
      document.location.href="/";
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
