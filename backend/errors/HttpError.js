export default class HttpError extends Error {
  constructor(msg, code) {
    super(msg); // ejecuta el constructor de la clase base, en este caso Errors

    this.code = code;

    this.ok = false;
  }
}
