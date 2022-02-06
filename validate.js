const formRegistry = {}

const setFormContext = (formElement, context) => {
  if (!formElement.id) {
    throw `Form should have id. form: ${formElement.innerHTML}`
  }
  formRegistry[formElement.id] = context;
}


const getFormContext = (formElement) => {
  if (!formElement.id in formRegistry) {
    throw `Validation for this form wasn't enabled. form: ${formElement.innerHTML}`
  }
  return formRegistry[formElement.id];
}


const hasInvalidData = (inputList) => {
  return inputList.some( (inputElement) => !inputElement.validity.valid );
}


const showInputError = (inputElement, formContext) => {
  inputElement.classList.add(formContext.options.inputErrorClass);
  const errorMessageElement = formContext.errorMessageElements[inputElement.id];
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(formContext.options.errorClass);
}


const hideInputError = (inputElement, formContext) => {
  inputElement.classList.remove(formContext.options.inputErrorClass);
  const errorMessageElement = formContext.errorMessageElements[inputElement.id];
  errorMessageElement.textContent = '';
  errorMessageElement.classList.remove(formContext.options.errorClass);
}


const hideFormErrorMessages = (formElement) => {
  const formContext = getFormContext(formElement);
  formContext.inputList.forEach( (inputElement) => hideInputError(inputElement, formContext));
}


const renderInputValidityState = (inputElement, formContext) => {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, formContext);
  } else {
    showInputError(inputElement, formContext);
  }
}


const disableSubmitButton = (formContext) => {
  formContext.submitButton.classList.add(formContext.options.inactiveButtonClass);
  formContext.submitButton.setAttribute("disabled", "true" );
}


const enableSubmitButton = (formContext) => {
  formContext.submitButton.classList.remove(formContext.options.inactiveButtonClass);
  formContext.submitButton.removeAttribute("disabled" );
}


const validateForm = (formElement) => {
  const formContext = getFormContext(formElement);
  formContext.inputList.forEach( (inputElement) => renderInputValidityState(inputElement, formContext) );

  if ( hasInvalidData(formContext.inputList) ) {
    disableSubmitButton(formContext);
  } else {
    enableSubmitButton(formContext);
  }
}


const findErrorMessageElements = (formElement, inputList) => {
  const errorMessageElements = {};
  inputList.forEach( (inputElement) => {
    const errorSelector = `.${inputElement.id}_error`;
    errorMessageElements[inputElement.id] = formElement.querySelector(errorSelector);
  });
  return errorMessageElements;
}


const createFormSettings = (formElement, validationOptions) => {
  const formSettings = {};
  formSettings.options = validationOptions;
  formSettings.formElement = formElement;
  formSettings.inputList = Array.from(formSettings.formElement.querySelectorAll(validationOptions.inputSelector));
  formSettings.submitButton = formSettings.formElement.querySelector(validationOptions.submitButtonSelector);
  formSettings.errorMessageElements = findErrorMessageElements(formSettings.formElement, formSettings.inputList);
  return formSettings;
}


const enableFormValidation = (formElement, validateOptions) => {
  const formSettings = createFormSettings(formElement, validateOptions);
  setFormContext(formElement, formSettings);

  formSettings.inputList.forEach( (inputElement) => {
    inputElement.addEventListener( 'input', () => {
      formElement.checkValidity();
      validateForm(formElement);
    });
  });
}


const enableValidation = (validateOptions) => {
  const forms = Array.from(document.querySelectorAll(validateOptions.formSelector));
  forms.forEach( (form) => enableFormValidation(form, validateOptions));
}