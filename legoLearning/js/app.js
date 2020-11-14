var dfreeHeaderConfig = {
    selector: '.dfree-header',
    menubar: false,
    inline: true,
    toolbar: false,
    plugins: [ 'quickbars' ],
    quickbars_insert_toolbar: 'undo redo',
    quickbars_selection_toolbar: 'italic underline',
  };
  
  var dfreeBodyConfig = {
    selector: '.dfree-body',
    menubar: false,
    inline: true,
    plugins: [
      'autolink',
      'codesample',
      'link',
      'lists',
      'media',
      'powerpaste',
      'table',
      'image',
      'quickbars',
      'codesample',
      'help'
    ],
    toolbar: false,
    quickbars_insert_toolbar: 'quicktable image media codesample',
    quickbars_selection_toolbar: 'bold italic underline | formatselect | blockquote quicklink',
    contextmenu: 'undo redo | inserttable | cell row column deletetable | help',
    powerpaste_word_import: 'clean',
    powerpaste_html_import: 'clean',
  };
  
tinymce.init(dfreeHeaderConfig);
tinymce.init(dfreeBodyConfig);

let containerH = document.querySelector('.containerHolder');

document.addEventListener('DOMContentLoaded', async function() {
    let containerHolderRequest = await getWebData(url_post);
    let containerHolder = containerHolderRequest.content;
    console.log('This is the content that needs to be displayed: ', containerHolder);
    containerH.outerHTML = containerHolder;
    update_buttons();
    tinymce.init(dfreeHeaderConfig);
    tinymce.init(dfreeBodyConfig);
    if (document.querySelector('.containerHolder').firstChild.firstChild.className != 'plus'){
        let newContainer = document.createElement('DIV');
        newContainer.className = 'container';
        let newDiv = document.createElement('DIV');
        newDiv.className = 'plus';
        newContainer.appendChild(newDiv);
        document.querySelector('.containerHolder').prepend(newContainer);
        console.log('WTF');
        update_buttons();
    }
});



let update_buttons = function(){
    let plus_buttons = document.querySelectorAll('.plus');
    
    for (let button of plus_buttons){
        button.addEventListener('click', function(){
            console.log('entered button event listener');
            let new_part = document.createElement('DIV');
            new_part.className = 'demo-dfree';
            let new_part_header = document.createElement('H2');
            new_part_header.className = 'dfree-header mce-content-body';
            new_part_header.setAttribute('contenteditable', 'true');
            new_part_header.innerHTML = 'Your Header';
            let new_part_div = document.createElement('DIV');
            new_part_div.className = 'dfree-body mce-content-body';
            new_part_div.setAttribute('contenteditable', 'true');

            new_part.appendChild(new_part_header);
            new_part.appendChild(new_part_div);

            let new_button = document.createElement('div');
            new_button.className = 'plus';

            let new_container = document.createElement('div');
            new_container.className = 'container';

            let new_lego = document.createElement('DIV');
            new_lego.className = 'lego';
            new_lego.appendChild(new_part);

            let button_parent = button.parentElement;

            new_container.appendChild(new_lego);
            new_container.appendChild(new_button);

            button_parent.nextSibling.parentElement.insertBefore(new_container, button_parent.nextSibling);
            tinymce.init(dfreeHeaderConfig);
            tinymce.init(dfreeBodyConfig);
        });
    }
};
update_buttons();

let url_post = 'http://localhost:8080/articles';

document.querySelector('input').addEventListener('click', function(event) {
    //event.preventDefault();
    console.log('input entered!!!!');
    let article = document.querySelector('.containerHolder');
    postData(url_post, {content : article.outerHTML});
});


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