class FormValidator {

  constructor(validationOptions, formElement) {
    this._validationOptions = validationOptions;
    this._formElement = formElement;
  }

  enableValidation() {

    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationOptions.inputSelector));
    this._submitButton = this._formElement.querySelector(this._validationOptions.submitButtonSelector);
    this._errorMessageElements = this._findErrorMessageElements(this._formElement, this._inputList);

    this._inputList.forEach( (inputElement) => {
      inputElement.addEventListener('input', () => this._validateInput(inputElement));
    });
  }

  hideFormErrorMessages() {
    this._inputList.forEach( (inputElement) => this._hideInputError(inputElement));
  }

  validateForm() {
    this._inputList.forEach( (inputElement) => this._renderInputValidityState(inputElement) );
    this._renderSubmitButtonValidityState();
  }

  _validateInput(inputElement) {
    this._renderInputValidityState(inputElement);
    this._renderSubmitButtonValidityState();
  }

  _findErrorMessageElements(formElement, inputList) {
    const errorMessageElements = {};
    inputList.forEach( (inputElement) => {
      const errorSelector = `.${inputElement.id}-error`;
      errorMessageElements[inputElement.id] = formElement.querySelector(errorSelector);
    });
    return errorMessageElements;
  }

  _renderInputValidityState = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._validationOptions.inputErrorClass);
    const errorMessageElement = this._errorMessageElements[inputElement.id];
    errorMessageElement.textContent = '';
    errorMessageElement.classList.remove(this._validationOptions.errorClass);
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._validationOptions.inputErrorClass);
    const errorMessageElement = this._errorMessageElements[inputElement.id];
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._validationOptions.errorClass);
  }

  _renderSubmitButtonValidityState() {
    if ( this._hasInvalidData(this._inputList) ) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _hasInvalidData(inputList) {
    return inputList.some( (inputElement) => !inputElement.validity.valid );
  }

  _disableSubmitButton() {
    this._submitButton.classList.add(this._validationOptions.inactiveButtonClass);
    this._submitButton.setAttribute("disabled", "true" );
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._validationOptions.inactiveButtonClass);
    this._submitButton.removeAttribute("disabled" );
  }
}

export { FormValidator };