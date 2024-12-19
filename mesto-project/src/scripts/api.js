const baseUrl = 'https://nomoreparties.co/v1/frontend-st-cohort-201';
const token = '474d755c-7404-400b-a7a9-c788ccd1f694';


function getInfoUser () {
  
  return fetch(baseUrl + '/users/me', {
    headers: {
      authorization: token,
    }})
    .then(res => {
      if (res.ok) {

          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }) 

}

function getCards (){
  return fetch(baseUrl + '/cards', {
    headers: {
      authorization: token,
    }
    })
    .then(res => {
      if (res.ok) {

          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  })

}

function setInfoUser (newName, newAbout){
  return fetch(baseUrl + '/users/me', {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: newName,
      about: newAbout
    })
    })
    .then(res => {
      if (res.ok) {

          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  })

}

function setCard (newName, newLink){
  return fetch(baseUrl + '/cards', {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      name: newName,
      link: newLink
    })
    })
    .then(res => {
      if (res.ok) {

          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  })

}

function deleteCard(cardId){
  return fetch(baseUrl + '/cards/' + cardId, {
    method: 'DELETE',
    headers: {
      authorization: token,
    }
    })
    .then(res => {
      if (res.ok) {

          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  })
   
}

function likeCard(cardId){
  return fetch(baseUrl + '/cards/likes/' + cardId, {
    method: 'PUT',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
    }) 
    .then(res => {
      if (res.ok) {

          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  })
}

function unlikeCard(cardId){
  return fetch(baseUrl + '/cards/likes/' + cardId, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
    })
    .then(res => {
      if (res.ok) {

          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  })
}

function setAvatar(newLink){
  return fetch(baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      avatar: newLink
    })
  })
  .then(res => {
    if (res.ok) {

        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
})
}

export {getInfoUser, getCards, setInfoUser, setCard, deleteCard, likeCard, unlikeCard, setAvatar}