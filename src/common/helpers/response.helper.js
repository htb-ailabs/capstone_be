export const responseSuccess = (
  metaData = null,
  message = `ok`,
  code = 200
) => {
  return {
    status: `success`,
    code: code,
    message: message,
    metaData: metaData,
    doc: `api.domain.com/doc`, // nó là swagger
  };
};

export const responseError = (
  message = `internal server error`,
  code = 500,
  stack = null
) => {
  return {
    status: `error`,
    code: code,
    message: message,
    stack: stack,
  };
};
