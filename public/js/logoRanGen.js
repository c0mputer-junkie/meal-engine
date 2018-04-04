///meal-engine/static/logoRanGen.js

var imagesArray = ["Butter Cookies", "Spinach Artichoke Dip", "Chicken Soup"];

var imagesArray = imagesArray.insert(db.users.find());

function displayImage(){
    var num = Math.floor(Math.random() * (imagesArray.length));
    console.log(imagesArray.length);
    console.log(num);
    document.getElementById('test').innerHTML = imagesArray[num];
}

// console.log("Hello");
