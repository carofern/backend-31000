import util from "util";
import path from "path";
import fs from "fs";

function cloneObj(objeto) {
  return JSON.parse(JSON.stringify(objeto));
}

function printObj(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

// Crea un objeto con el error y la descripcion del error
function buildErrorMessage(error, descripcion) {
  return {
    error,
    descripcion,
  };
}

function parceError(error) {
  if (error.message) {
    error = error.message;
  }
  return error;
}

class WSResponse {
  constructor(data, message, error, errorCode) {
    this.data = data;
    this.message = message || "";
    this.error = error || false;
    this.errorCode = errorCode || 0;
  }
}

class WSErrorResponse extends WSResponse {
  constructor(message, errorCode) {
    super();
    this.data = null;
    this.message = message || "";
    this.error = true;
    this.errorCode = errorCode;
  }
}

let rootDir = null;

function getRootDir() {
  if (!rootDir) {
    const startdir = process.argv[1];
    let root = startdir;
    let prevroot;
    let found = false;
    while (true) {
      const pj = path.join(root, "package.json");
      if (fs.existsSync(pj)) {
        found = true;
        break;
      }
      prevroot = root;
      root = path.join(root, "..");
      if (prevroot === root) break;
    }
    if (found) {
      rootDir = root;
    } else {
      rootDir = startdir;
    }
  }
  return rootDir;
}

function findObj(obj, objList) {
  let result = null;
  const objKeys = Object.keys(obj);
  for (let i = 0; i < objList.length; i++) {
    let found = true;
    const item = objList[i];
    for (let j = 0; j < objKeys.length; j++) {
      const key = objKeys[j];
      if (obj[key] != item[key]) {
        found = false;
        break;
      }
    }
    if (found) {
      result = item;
      break;
    }
  }
  return result;
}

export {
  parceError,
  WSResponse,
  WSErrorResponse,
  getRootDir,
  cloneObj,
  printObj,
  buildErrorMessage,
  findObj,
};
