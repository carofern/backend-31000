class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    //Métodos - son funciones dentro de un objeto
    getFullName(nombre, apellido) {
        console.log(`Mi nombre completo es ${nombre} ${apellido}`)
    }
    addMascota(pet) {
        //this.mascotas.push(pet);
        this.mascotas = [...this.mascotas, pet]
    }
    countMascotas() {
        console.log(`Tengo ${this.mascotas.length} mascotas`);
    }
    addBook(titulo, autor) {
        this.libros = [...this.libros, {titulo: titulo, autor: autor}];
    }
    getBookNames() {
        const nombres = []
        this.libros.forEach(libro => nombres.push(libro.titulo));
        console.log(nombres);
    }
}

//Instanciar una clase
const usuarioUno = new Usuario ("Carla", "Balbuena");

//Testeo metodos
usuarioUno.getFullName("Carla", "Balbuena");
usuarioUno.addMascota("Caballo");
usuarioUno.addMascota("Gato");
usuarioUno.addMascota("Pato");
usuarioUno.countMascotas();
usuarioUno.addBook("Freud", "Teorias del Psicoanalisis");
usuarioUno.addBook("Lalaland", "Phil News");
usuarioUno.getBookNames();
console.log(usuarioUno);

