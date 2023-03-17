function testMovies(title,promoImage,year,era,length,trailerLink,trivia,category){
    let hasLetters = /[a-zA-Z]/g.test(title,promoImage,era,length,trailerLink,trivia,category);
    let hasNumber = /[0-9]/g.test(year);
    return hasLetters, hasNumber;
}

  module.exports = testMovies;
