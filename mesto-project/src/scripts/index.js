import {closeModal, openModal} from './modal.js'
import  {resetForm, enableValidation} from './validate.js'
import {createCard} from './card.js'
import {getInfoUser, getCards, setInfoUser, setCard, setAvatar} from './api.js'
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
const avatarPopup = document.querySelector(".popup_type_new-avatar");

//кнопки
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonCard = document.querySelector(".profile__add-button");
const buttonEditAvatar = document.querySelector(".profile__avatar-container");

//форма изменения аватара 
const avatarFormElement = avatarPopup.querySelector(".popup__form");
const avatarLinkInput = avatarFormElement.querySelector(".popup__input_type_url");
const buttonAvatarForm = avatarFormElement.querySelector(".popup__button");

//форма изменения профиля
const profileFormElement = profilePopup.querySelector(".popup__form");
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const jobInput = profileFormElement.querySelector(".popup__input_type_description");
const buttonProfileForm = profileFormElement.querySelector(".popup__button");


//форма добавления карточки 
const cardFromElement = cardPopup.querySelector(".popup__form");
const placeNameInput = cardFromElement.querySelector(".popup__input_type_card-name");
const linkInput = cardFromElement.querySelector(".popup__input_type_url");
const buttonCardForm = cardFromElement.querySelector(".popup__button");

profilePopup.classList.add("popup_is-animated");
cardPopup.classList.add("popup_is-animated");
imagePopup.classList.add("popup_is-animated");

enableValidation();

let currentID;
//вывести информацию о пользователе
getInfoUser()
    .then((data) => {
        currentID = data._id;
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        profileAvatar.src= data.avatar;
        displayCards();

    })
    .catch((err) => {
        console.log("Error: " + err );
    })

//Вывести карточки на страницу
function displayCards() {
    getCards()
    .then((data) => {
        data.forEach(el => {
            let isLiked = 0;
            el.likes.forEach((user) => {
                if ( user._id == currentID){
                    isLiked = 1;
                }
            })
            const new_card = createCard(el.name, el.link, el.likes.length, el.owner._id == currentID, isLiked, el._id);
            palces.append(new_card);           
        });
    })
    .catch((err) => {
        console.log("Error: " + err );
    })
}

    



buttonEditAvatar.addEventListener('click', () => {
    avatarLinkInput.value = '';

    openModal(avatarPopup);
    const formElement = avatarPopup.querySelector('.popup__form');
    resetForm(formElement);
});

function handleAvatarForm(evt){
    evt.preventDefault();
    buttonAvatarForm.textContent = "Сохранение...";
    const imageURL = avatarLinkInput.value;
    setAvatar(imageURL)
        .then(() => {
            profileAvatar.src = imageURL;
        })
        .catch((err) => {
            console.log("Error in edit avatar: " + err );
        })
        .finally(() => {
            buttonAvatarForm.textContent = "Сохранить";
            closeModal(avatarPopup);
        });

}

avatarFormElement.addEventListener('submit', handleAvatarForm);

buttonEdit.addEventListener('click', function(){
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
    const formElement = profilePopup.querySelector('.popup__form');
    resetForm(formElement);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    buttonProfileForm.textContent  = "Сохранение...";
    setInfoUser(nameInput.value, jobInput.value)
        .then(() => {
            profileName.textContent = nameInput.value;
            profileDescription.textContent = jobInput.value;        
        })
        .catch((err) => {
            console.log("Error in set user info : "+ err)
        })
        .finally(() => {
            buttonProfileForm.textContent  = "Сохранение...";
            closeModal(profilePopup)
        }
    );
    
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
    buttonCardForm.textContent = "Сохранение...";
    setCard(cardPlaceName, cardLink)
        .then((res) => {
            const new_card = createCard(cardPlaceName, cardLink);
            palces.prepend(new_card);
        })
        .catch((err) => {
            console.log("Error in added card: " + err);
        })
        .finally(() => {
            buttonCardForm.textContent = "Сохранить";
            closeModal(cardPopup);
        })
    

    
}


cardFromElement.addEventListener('submit', handleCardFormSubmit);





