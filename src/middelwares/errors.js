function errorsMiddelware(err, req, res, next) {
  console.error('[Errors middelware]:\n', err.stack);
  res.status(500).send({ success: false, message: err.message });
}

export default errorsMiddelware;
