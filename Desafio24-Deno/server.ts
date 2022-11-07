import { Application, Router, Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const app = new Application();
const router = new Router();

router.get("/", (ctx: Context) => {
  let frase = ctx.request.url.searchParams.get("frase");
  let respuesta = "Debe indicar la frase en la url /?frase=Una frase cualquiera";
  if (frase) {
    const arregloFrase = frase.split(" ");
    const arregloRespuesta = [];
    for (let i = arregloFrase.length - 1; i >= 0; i--) {
      arregloRespuesta.push(arregloFrase[i]);
    }
    respuesta = arregloRespuesta.join(" ");
  } else {
    frase = "N/D";
  }

  ctx.response.status = 200;
  ctx.response.body = `
  <!DOCTYPE html>
  <html>
    <head><title>Desafio 24 - Coderhouse</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,100&family=Roboto:wght@300&display=swap" rel="stylesheet">    <head>
    <body style="">
      <h1 style="padding: 0; margin: 0; color: black; background-color: cyan; font-family: 'Roboto', sans-serif;">
        Frase original: <p style="display: inline; font-family: 'Lato', sans-serif;">
        ${frase}</p></h1>
      <h1 style="padding: 0; margin: 0; color: black; background-color: yellow;; font-family: 'Roboto', sans-serif;">
        Frase invertida: <p style="display: inline; font-family: 'Lato', sans-serif;">
        ${respuesta}</p></h1>
    </body>
  </html>
  `;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
console.log("Servidor escuchando en http://127.0.0.1:8080");
