// @todo: Темплейт карточки
const template = document.querySelector("#card-template");

// @todo: DOM узлы
const palces = document.querySelector(".places__list");

//поп-апы
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

//кнопки
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonCard = document.querySelector(".profile__add-button");
const buttonImage = document.querySelector(".card__delete-button");

//форма изменения профиля
const profileFormElement = profilePopup.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const jobInput = profileFormElement.querySelector(".popup__input_type_description");

//поля профиля
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//форма добавления карточки 
const cardFromElement = cardPopup.querySelector(".popup__form");
const placeNameInput = cardFromElement.querySelector(".popup__input_type_card-name");
const linkInput = cardFromElement.querySelector(".popup__input_type_url");

profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");


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
        console.log('правильная форма')
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
    
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
    
};


//настраиваем валидацию у формы изменения профиля
setEventListeners(profileFormElement);

function createCard(name, link){

    const item = template.content.cloneNode(true);

    const image = item.querySelector(".card__image");
    const title = item.querySelector(".card__title");
    const likeButton = item.querySelector(".card__like-button");
    const deleteButton = item.querySelector(".card__delete-button");

    image.src = link;
    image.alt = name;

    title.textContent = name;

    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle("card__like-button_is-active");
    });

    deleteButton.addEventListener('click', function(){
        deleteButton.closest('.card').remove();
    })

    image.addEventListener('click', function() {
        const popupCaption = imagePopup.querySelector('.popup__caption');
        const popupImage = imagePopup.querySelector('.popup__image');

        popupImage.src = link;
        popupCaption.textContent = name;

        openModal(imagePopup);

    });

    return item;
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item){
    const new_card = createCard(item.name, item.link);
    palces.append(new_card);
});

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    popup.querySelector('.popup__close').addEventListener('click', function(){
        closeModal(popup);
    });
}

function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
}



buttonEdit.addEventListener('click', function(){
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);



buttonCard.addEventListener('click', function(){
    placeNameInput.value = '';
    linkInput.value = '';
    openModal(cardPopup);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardPlaceName = placeNameInput.value;
    const cardLink = linkInput.value;
    const new_card = createCard(cardPlaceName, cardLink);
    palces.prepend(new_card);

    closeModal(cardPopup);
}

cardFromElement.addEventListener('submit', handleCardFormSubmit);




