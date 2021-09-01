const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var bubble1
var canW;
var canH;
var bubble
var bubblemelon
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

 

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  bubble = loadImage("bubble.png")
  bubblemelonn=loadImage("bubblemelon.png")
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  
  frameRate(80);
createCanvas(windowWidth,windowHeight)
  

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position( 200,320);
  button.size(50,50);
 // button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position( 30,420);
   button2.size(60,60)
   button2.mouseClicked(drop );
   
 
   

  
  
  rope = new Rope(4,{x: 230,y: 330});
  rope2 = new Rope(3,{x: 50,y:450});
 

  ground = new Ground(250,height-10,width,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

higherground=new Ground(300,170,100,10)

  bunny = createSprite( 270,100,100,100);
  bunny.scale = 0.2;
bunny.addImage(rabbit)
  bubble1=createSprite( 290,460,20,20)
  bubble1.addImage("bubble",bubble)
  bubble1.scale=0.2

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  var fruit_options={
  restitution:0.8
  }
  fruit = Bodies.circle( 100, 400,15,fruit_options);
  
  Matter.Composite.add(rope.body,fruit);

 fruit_con = new Link(rope,fruit);
   fruit_con2 = new Link(rope2,fruit);
  

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  
  image(bg_img,0,0, width , height);
  push()
  if(fruit!=null){
 
    image(food,fruit.position.x,fruit.position.y,70,70);
   }
     pop()
  
  imageMode(CENTER);
   

  rope.show();
  rope2.show();
 higherground.show()

  Engine.update(engine);
  ground.show();

 

  if(collide(fruit,bunny,80)==true)
  {
    remove_rope()
    bubble.visible=false
    World.remove(engine.world, fruit)
    fruit=null
    bunny.changeAnimation('eating');
   
  }
  if(collide(fruit,bubble1,40)==true){
 engine.world.gravity.y=-1
   bubble1.position.x=fruit.position.x
   bubble1.position.y=fruit.position.y
  }
  drawSprites();
   
}

function drop()
{
  
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null; 
}
function remove_rope(){
  rope.break()
  fruit_con.dettach()
  fruit_con=null
}
 
 


function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<= x)
            {
             
               return true; 
            }
            else{
              return false;
            }
         }
}
 


