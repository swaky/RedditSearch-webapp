import reddit from './redditapi';


const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');


//form event listener
searchForm.addEventListener('submit',event=>{
    console.log("clicked");

    const searchTerm =searchInput.value;

    console.log(searchTerm);

    const sortby =document.querySelector('input[name="sortby"]:checked').value;
    console.log(sortby);

    //get limit
    const searchLimit = document.getElementById('limit').value;
    console.log(searchLimit);


    if(searchTerm===''){
        showMessage('Please add a search term','alert-danger')
    }

    //clear input
    searchInput.value='';

    //search reddit
    reddit.search(searchTerm,searchLimit,sortby);

    event.preventDefault();
});

//show message
function showMessage(message,className){
    //create div
    const div =document.createElement('div');
    //add classes
    div.className =`alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent
    const searchContainer =document.getElementById('search-container');
    const search=document.getElementById('search');
    searchContainer.insertBefore(div,search);

    //timeout
    setTimeout(()=>document.querySelector('.alert').remove(),2000);
}