export default class AppException extends Error {
  statusCode: number;
  data?: any;

  constructor(message: string, statusCode: number, data?: any) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.data = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(
    message: string = "Bad Request",
    data?: string[],
  ): AppException {
    return new AppException(message, 400, data);
  }

  static unauthorized(
    message: string = "Unauthorized",
    data?: string[],
  ): AppException {
    return new AppException(message, 401, data);
  }

  static paymentRequired(message: string = "Payment Required"): AppException {
    return new AppException(message, 402);
  }

  static forbidden(message: string = "Forbidden"): AppException {
    return new AppException(message, 403);
  }

  static notFound(message: string = "Not Found"): AppException {
    return new AppException(message, 404);
  }

  static methodNotAllowed(
    message: string = "Method Not Allowed",
  ): AppException {
    return new AppException(message, 405);
  }

  static notAcceptable(message: string = "Not Acceptable"): AppException {
    return new AppException(message, 406);
  }

  static proxyAuthenticationRequired(
    message: string = "Proxy Authentication Required",
  ): AppException {
    return new AppException(message, 407);
  }

  static requestTimeout(message: string = "Request Timeout"): AppException {
    return new AppException(message, 408);
  }

  static conflict(message: string = "Conflict"): AppException {
    return new AppException(message, 409);
  }

  static gone(message: string = "Gone"): AppException {
    return new AppException(message, 410);
  }

  static lengthRequired(message: string = "Length Required"): AppException {
    return new AppException(message, 411);
  }

  static preconditionFailed(
    message: string = "Precondition Failed",
  ): AppException {
    return new AppException(message, 412);
  }

  static payloadTooLarge(message: string = "Payload Too Large"): AppException {
    return new AppException(message, 413);
  }

  static uriTooLong(message: string = "URI Too Long"): AppException {
    return new AppException(message, 414);
  }

  static unsupportedMediaType(
    message: string = "Unsupported Media Type",
  ): AppException {
    return new AppException(message, 415);
  }

  static rangeNotSatisfiable(
    message: string = "Range Not Satisfiable",
  ): AppException {
    return new AppException(message, 416);
  }

  static expectationFailed(
    message: string = "Expectation Failed",
  ): AppException {
    return new AppException(message, 417);
  }

  static teapot(message: string = "I'm a teapot"): AppException {
    return new AppException(message, 418);
  }

  static misdirectedRequest(
    message: string = "Misdirected Request",
  ): AppException {
    return new AppException(message, 421);
  }

  static unprocessableEntity(
    message: string = "Unprocessable Entity",
  ): AppException {
    return new AppException(message, 422);
  }

  static locked(message: string = "Locked"): AppException {
    return new AppException(message, 423);
  }

  static failedDependency(message: string = "Failed Dependency"): AppException {
    return new AppException(message, 424);
  }

  static tooEarly(message: string = "Too Early"): AppException {
    return new AppException(message, 425);
  }

  static upgradeRequired(message: string = "Upgrade Required"): AppException {
    return new AppException(message, 426);
  }

  static preconditionRequired(
    message: string = "Precondition Required",
  ): AppException {
    return new AppException(message, 428);
  }

  static tooManyRequests(message: string = "Too Many Requests"): AppException {
    return new AppException(message, 429);
  }

  static requestHeaderFieldsTooLarge(
    message: string = "Request Header Fields Too Large",
  ): AppException {
    return new AppException(message, 431);
  }

  static unavailableForLegalReasons(
    message: string = "Unavailable For Legal Reasons",
  ): AppException {
    return new AppException(message, 451);
  }

  static internalServerError(
    message: string = "Internal Server Error",
  ): AppException {
    return new AppException(message, 500);
  }

  static notImplemented(message: string = "Not Implemented"): AppException {
    return new AppException(message, 501);
  }

  static badGateway(message: string = "Bad Gateway"): AppException {
    return new AppException(message, 502);
  }

  static serviceUnavailable(
    message: string = "Service Unavailable",
  ): AppException {
    return new AppException(message, 503);
  }

  static gatewayTimeout(message: string = "Gateway Timeout"): AppException {
    return new AppException(message, 504);
  }

  static httpVersionNotSupported(
    message: string = "HTTP Version Not Supported",
  ): AppException {
    return new AppException(message, 505);
  }

  static variantAlsoNegotiates(
    message: string = "Variant Also Negotiates",
  ): AppException {
    return new AppException(message, 506);
  }

  static insufficientStorage(
    message: string = "Insufficient Storage",
  ): AppException {
    return new AppException(message, 507);
  }

  static loopDetected(message: string = "Loop Detected"): AppException {
    return new AppException(message, 508);
  }

  static notExtended(message: string = "Not Extended"): AppException {
    return new AppException(message, 510);
  }

  static networkAuthenticationRequired(
    message: string = "Network Authentication Required",
  ): AppException {
    return new AppException(message, 511);
  }

  static invalidSchema(
    message: string = "Invalid Schema",
    data: Record<string, any>,
  ): AppException {
    return new AppException(message, 400, data);
  }
}
