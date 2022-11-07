const validEmailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const validUrlRegex =
  /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/;
const HTTP_STATUS_ERROR_BAD_REQUEST = 400;
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;

// como uso el mismo archivo de constantes tanto del lado del 
// cliente como del servidor verifico la existencia de module
// para que no salte error del lado del cliente
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    validEmailRegex,
    validUrlRegex,
    HTTP_STATUS_ERROR_BAD_REQUEST,
    HTTP_STATUS_OK,
    HTTP_STATUS_CREATED,
  };
}