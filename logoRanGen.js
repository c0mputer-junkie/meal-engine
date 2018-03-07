// Users/smcueto/Documents/GitHub-Projects/meal-engine/static/logoRanGen.js

var imagesArray = ["Butter Cookies", "Spinach Artichoke Dip", "Chicken Soup"];

function displayImage(){

    var num = Math.floor(Math.random() * (imagesArray.length));
    console.log(imagesArray.length);
    console.log(num);
    document.getElementById('test').innerHTML = imagesArray[num];
}
