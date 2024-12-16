import {closeModal, openModal} from './modal.js'
import  {resetForm, enableValidation} from './validate.js'
import {createCard} from './card.js'
import {getInfoUser, getCards, setInfoUser, setCard} from './api.js'
import '../pages/index.css';


//поля профиля
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector('.profile__image');

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


//форма добавления карточки 
const cardFromElement = cardPopup.querySelector(".popup__form");
const placeNameInput = cardFromElement.querySelector(".popup__input_type_card-name");
const linkInput = cardFromElement.querySelector(".popup__input_type_url");

profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");

enableValidation();


//Вывести карточки на страницу
getCards()
    .then((data) => {
        data.forEach(el => {

            let likes_count = 0;
            el.likes.forEach(() => {
                likes_count += 1;
            })
            
            const new_card = createCard(el.name, el.link, likes_count);
            palces.append(new_card);           
        });
    })
    .catch((err) => {
        console.log("Error: " + err );
    })
    

//вывести информацию о пользователю 
getInfoUser()
    .then((data) => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
        console.log("Error: " + err );
    })




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

    setInfoUser(nameInput.value, jobInput.value)
        .catch((err) => {
            console.log("Error in set user info : "+ err)
        })
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
    setCard(cardPlaceName, cardLink)
        .then((data) => {
            if ( data.name !== cardPlaceName && data.link !== cardLink){
                console.log("Adding card is bad");
            }
        })
        .catch((err) => {
            console.log("Error in added card: " + err);
        })
    palces.prepend(new_card);

    closeModal(cardPopup);
}


cardFromElement.addEventListener('submit', handleCardFormSubmit);




