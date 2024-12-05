import {initialCards} from './cards.js'
import {closeModal, openModal} from './modal.js'
import  {resetForm, enableValidation} from './validate.js'
import {createCard} from './card.js'
import '../pages/index.css';


// @todo: DOM узлыs
const palces = document.querySelector(".places__list");

//поп-апы
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

//кнопки
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonCard = document.querySelector(".profile__add-button");

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

enableValidation();


// @todo: Вывести карточки на страницу
initialCards.forEach(function(item){
    const new_card = createCard(item.name, item.link);
    palces.append(new_card);
});

buttonEdit.addEventListener('click', function(){
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
    const formElement = profilePopup.querySelector('.popup__form');
    resetForm(formElement);
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
    const formElement = cardPopup.querySelector('.popup__form');
    resetForm(formElement);
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




