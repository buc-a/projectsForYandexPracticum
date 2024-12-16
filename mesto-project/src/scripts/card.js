import {openModal} from './modal.js';
import {deleteCard} from './api.js'
const template = document.querySelector("#card-template");
const imagePopup = document.querySelector(".popup_type_image");

function createCard(name, link, likes, isDelete, cardId){

    const item = template.content.cloneNode(true);

    const image = item.querySelector(".card__image");
    const title = item.querySelector(".card__title");
    const likeButton = item.querySelector(".card__like-button");
    const likeNumber = item.querySelector(".card__like-number");
    const deleteButton = item.querySelector(".card__delete-button");

    
    if (!isDelete){
        deleteButton.classList.add("card__delete-button_invisible");
    }
    image.src = link;
    image.alt = name;

    title.textContent = name;
    likeNumber.textContent = likes;
  
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle("card__like-button_is-active");
    });

    deleteButton.addEventListener('click', function(){
        deleteCard(cardId)
            .catch((err) => {
                console.log("Delete card error: " + err);
            })
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

export {createCard}