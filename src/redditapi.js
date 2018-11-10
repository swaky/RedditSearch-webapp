export default {
    search:function(searchTerm,searchLimit,sortby){
//         console.log("Search ...");

     return    fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortby}&limit=${searchLimit}`)
         .then(res => res.json())
         .then(data => console.log(data));
    }
}