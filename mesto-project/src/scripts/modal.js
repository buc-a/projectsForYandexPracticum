function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    const buttonClose = popup.querySelector('.popup__close');

    buttonClose.addEventListener('click', function(){
        closeModal(popup);
    });

    // при нажатии на Esc
    document.addEventListener('keydown', closeByEsc);

    //при нажатии за пределами элемента
    popup.addEventListener('mouseup', function(e) {
        const contentElement = popup.querySelector('.popup__content');
        if (!contentElement.contains(e.target)) {
            closeModal(popup);
        }
    });
}


function closeModal(popup) {      
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
}

// при нажатии на Esc
function closeByEsc(evt) {     
    if (evt.key === 'Escape') {       
        const openedPopup = document.querySelector('.popup_is-opened');       
        closeModal(openedPopup);      
    } 
};
export {closeByEsc, closeModal, openModal}