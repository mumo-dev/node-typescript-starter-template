
export const formatMongooseValidationErrors = (errors: any) => {
  const errorMessages = [];
  for (const fieldError in errors) {
    const formattedError: any = {};
    formattedError[fieldError] = errors[fieldError]["properties"]["message"];
    errorMessages.push(formattedError);
  }
  return errorMessages;
};
