import reddit from './redditapi';


const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const outputdiv=document.getElementById('results');

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
    // reddit.search(searchTerm,searchLimit,sortby).then(results=>{
    //     console.log(results);
    
    
    //     outputdiv.innerHTML="<h2>api called</h2>";
    // })

    const response =  reddit.search(searchTerm,searchLimit,sortby)
    .then(results=>{
            console.log(results);

            let output ='<div class="card-columns">';

            results.forEach(post=>{

                let image = post.preview ? post.preview.images[0].source.url :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNbrwanPeWtbDMetYH6TtKXH6ucQzwz2niu0sHxlFKLd5y1B2K';

                output += `
                <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${image}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${post.selftext.substring(0,300)}</p>
    <a href="${post.url}" targer="_blank" class="btn btn-primary">Read More</a>
    <hr>
    <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
    <span class="badge badge-dark">Score: ${post.score}</span>
  </div>
</div>
                `;
            })

            output += "</div>";
        
            outputdiv.innerHTML=output;
        })


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