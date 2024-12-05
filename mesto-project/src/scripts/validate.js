const showError = (formElement, inputElement, errorMessage) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    formError.textContent = errorMessage;
    formError.classList.add('popup__input-error_active');
  };
  
const hideError = (formElement, inputElement) => {
    const formError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    formError.classList.remove('popup__input-error_active');
    formError.textContent = '';
};


const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideError(formElement, inputElement);
    }
  };
 
//есть ли некорректные поля в форме
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}; 

//изменение классов в зависимости от качетсва введенных полей 
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button_inactive');
    } else {
        buttonElement.classList.remove('popup__button_inactive');
    }
};

const setEventListeners = (formElement) => {
    const buttonElement = formElement.querySelector('.popup__button');
    formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
    }); 
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};



function enableValidation(){
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });

  };

const resetForm = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        hideError(formElement, inputElement);
    });
    const btn = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, btn);
}

export {resetForm, enableValidation, setEventListeners, toggleButtonState, hasInvalidInput,  checkInputValidity, hideError, showError}