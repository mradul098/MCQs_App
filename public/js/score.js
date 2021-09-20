const name_text = document.getElementById('score-text1');
const score_text = document.getElementById('score-text2');

let username = sessionStorage.getItem("name");
let score = sessionStorage.getItem("score");
let email = sessionStorage.getItem("email");

sessionStorage.removeItem("name");
sessionStorage.removeItem("score");
sessionStorage.removeItem("email");




console.log(score)

name_text.innerHTML = 'Well Done '  + username + ' you scored ';
score_text.innerHTML = score + '/' +"10";


const data = {
    username,
    email,
    score
};

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
};


async function data_send() {
    const response = await fetch('/resultdata', options);
    console.log('hi');
    const json = await response.json();
    console.log(json);
}

if (username && email && score) {
    data_send();
}
