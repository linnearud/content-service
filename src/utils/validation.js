exports.validatePostRequest = (req, requiredBodyFields) => {
  if (!req.body) {
    return "Body can't be empty";
  }

  for (const field of requiredBodyField) {
    if (!req.body[field]) {
      return `Missing required field ${field}`;
    }
  }

  return "";
};

exports.validateForm = (req, requiredFields, requiredFiles) => {
  if (!req.fields || !req.files) {
    return "Body can't be empty";
  }

  for (const field of requiredFields) {
    if (!req.fields[field]) {
      return `Missing required field ${field}`;
    }
  }

  for (const file of requiredFiles) {
    if (!req.files[file]) {
      return `Missing required file ${file}`;
    }
  }

  return "";
};