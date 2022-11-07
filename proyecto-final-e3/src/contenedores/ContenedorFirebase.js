// Clase contenedora Firebase
const logger = require("../logger");

let fireBaseConnection;

class ContenedorFirebase {
  constructor(serviceAccount, collection) {
    // Solo puede haber una coneccion a firebase,
    // las demas instancias deben usar la misma
    if (!fireBaseConnection) {
      const firebase = require("firebase-admin");
      connect(firebase, serviceAccount);
      fireBaseConnection = firebase.firestore();
    }
    this.db = fireBaseConnection;
    this.query = this.db.collection(collection);
  }

  // agrega un nuevo item
  async save(newItem) {
    const doc = this.query.doc();
    newItem.timestamp = +new Date();
    await doc.create(newItem);
    return doc.id;
  }

  // retorna el item indicado por idBuscado o null si no existe
  async getById(idBuscado) {
    const queryRef = await this.query.doc(`${idBuscado}`).get();
    if (queryRef.exists) {
      return {
        id: queryRef.id,
        ...queryRef.data(),
      };
    }
    return null;
  }

  // devuelve la lista completa de items
  async getAll() {
    const querySnapshot = await this.query.get();
    const docs = querySnapshot.docs;
    const response = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return response;
  }

  // elimina el item del id indicado
  async deleteById(idBuscado) {
    const queryRef = await this.query.doc(`${idBuscado}`).get();
    if (queryRef.exists) {
      await this.query.doc(`${idBuscado}`).delete();
      return {
        id: queryRef.id,
        ...queryRef.data(),
      };
    }
    return null;
  }

  // elimina todos los items
  async deleteAll() {
    try {
      const snapshot = await this.query.get();
      snapshot.forEach((doc) => {
        doc.ref.delete();
      });
    } catch (error) {
      logger.error(error);
    }
  }

  // retorna el producto actualizado indicado por idBuscado o null si no existe
  async updateById(idBuscado, itemActualizado) {
    const queryRef = await this.query.doc(`${idBuscado}`).get();
    if (queryRef.exists) {
      let queryRef = await this.query.doc(`${idBuscado}`);
      await queryRef.update(itemActualizado);
      queryRef = await this.query.doc(`${idBuscado}`).get();
      return {
        id: queryRef.id,
        ...queryRef.data(),
      };
    }
    return null;
  }
  async disconnect() {}
}

async function connect(firebase, serviceAccount) {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
}

module.exports = { ContenedorFirebase };
