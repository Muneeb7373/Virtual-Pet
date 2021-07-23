var dog,sadDog,happyDog;
var addfood, feedpet;
var foodObj;
var foodStock, foodS, fedTime, lastFed
var database;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database()

  foodObj = new Food
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedpet = createButton("Feed The Dog");
  feedpet.position(700,95);
  feedpet.mousePressed(feedDog);

  addfood = createButton("Add Food");
  addfood.position(800,95);
  addfood.mousePressed(addfoods);

  foodStock = database.ref('food')
  foodStock.on("value",readStock)

}

function draw() {
  background(46,139,87);
  drawSprites();

  foodObj.display()

}

//function to read food Stock
function readStock(data){
  foodS = data.val()
  foodObj.updatefoodStock(foodS)
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getfoodStock()<=0){
  if(foodObj.updatefoodStock(foodObj.getfoodStock()*0));
  }else{
    foodObj.updatefoodStock(foodObj.getfoodStock()-1);

  }

}

//function to add food in stock
function addfoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}