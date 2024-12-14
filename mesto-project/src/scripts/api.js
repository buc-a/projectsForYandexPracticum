const baseUrl = 'https://nomoreparties.co/v1/frontend-st-cohort-201';
const token = '474d755c-7404-400b-a7a9-c788ccd1f694';


function getInfoUser () {
  
  return fetch(baseUrl + '/users/me', {
    headers: {
      authorization: token,
    }}) 
    .then(res => res.json())
}

function getCards (){
  return fetch(baseUrl + '/cards', {
    headers: {
      authorization: token,
    }
    })
    .then(res => res.json()) 
}

export {getInfoUser, getCards}