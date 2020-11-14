let url_articles = 'http://localhost:8080/articles';

let body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', async function (event){
    let content = await getWebData(url_articles);
    //console.log(content[0].content);
    //body.insertBefore(content.content, body.querySelector('script'));
    body.innerHTML = body.innerHTML + content.content;
    body.innerHTML = body.innerHTML + '<script src = js/app1.js></script>';
    let pluses = document.querySelectorAll('.plus');
    for (let plus of pluses){
        plus.style.display = 'none';
    }
    let headers = document.querySelectorAll('H2');
    for (let head of headers){
        head.className = '';
        head.removeAttribute('contenteditable');
    }
    let parags = document.querySelectorAll('div[contenteditable]');
    for (let parag of parags){
        parag.className = '';
        parag.removeAttribute('contenteditable');
    }
});

const getWebData = async (url) => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log("error", error);
    }
}
/* Function to POST data */
const postData = async (url = '', data = {}) => {
    console.log("Post entered");
    const response = await fetch(url, {
        method : 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newPostData = await response.json();
        console.log(`The new data is ${newPostData}`);
        return newPostData;
    }catch(error){
        console.log(`The error is: ${error}`);
    }
}