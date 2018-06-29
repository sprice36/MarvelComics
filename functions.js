const {
      
} = require('./db'); 

function saveComic(){
    $('[data-target-save]').on('click', function(data){
        var comicID = $('[data-comic-id]').text();
        console.log(comicID);
    })
    return comicID;
}

module.exports = {
        saveComic
}