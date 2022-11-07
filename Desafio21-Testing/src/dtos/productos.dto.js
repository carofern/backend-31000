class ProductoDto {
  constructor(datos) {
    if (datos) {
      if (datos.id) {
        this.id = datos.id;
      } else {
        this.id = null;
      }
      if (datos.title) {
        this.title = datos.title;
      } else {
        this.title = null;
      }
      if (datos.price) {
        this.price = datos.price;
      } else {
        this.price = null;
      }
      if (datos.thumbnail) {
        this.thumbnail = datos.thumbnail;
      } else {
        this.thumbnail = null;
      }
    } else {
      this.id = null;
    }
  }
}

export default ProductoDto;
