const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = innerWidth; // window property;
canvas.height = innerHeight;

document.addEventListener('click', event => {if (event.target.tagName=='CANVAS'){save()};} );
let loop = 0;

function save(){
loop++;
console.log(`save triggered ${loop}`);

const aTag = document.createElement('a');
document.body.appendChild(aTag);
aTag.href = canvas.toDataURL('image/png');
aTag.download = `magic-image-${loop}.png`;
aTag.click();
aTag.remove();
}


const players = { 
  player1: [20,20,50,50,"green"],
  player2: [80,50,20,20,"red"],
  player3: [90,100,25,30,"blue"]
};


class Player {
  constructor(x,y,width,height,color) {
  this.position = {x: x, y: y}
  this.velocity = {x: 0, y: 10}
  this.width = width;
  this.height = height;
  this.color = color;
  }


  draw() {
  context.fillStyle = this.color;
  context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
  this.position.y += this.velocity.y;
  this.draw();
  }

} // end class;


function randomColor() {
let opacity = Math.random()*0.7 + 0.1;
let rgbColors = [
  `rgb(255,0,0,${opacity})`,
  `rgb(255, 128, 0,${opacity})`,
  `rgb(255, 255, 0,${opacity})`,
  `rgb(128, 255,0,${opacity})`,
  `rgb(0, 255, 0,${opacity})`,
  `rgb(0, 255, 128,${opacity})`,
  `rgb(0, 255, 255,${opacity})`,
  `rgb(0, 128, 255,${opacity})`,
  `rgb(0, 0, 255,${opacity})`,
  `rgb(128, 0, 255,${opacity})`,
  `rgb(255, 0, 255,${opacity})`,
  `rgb(255, 0, 128,${opacity})`
];
return rgbColors[(parseInt(Math.random()*rgbColors.length))];
}

// colors[parseInt(Math.random()*colors.length)];

const colors = ["red", "blue", "green", "orange", "yellow", "indigo", "violet", "lime", "deeppink", "teal", "aquamarine"];

function makeArt() {
// set background white;
let arrayShell = [];
arrayShell.push (new Player(0,0,canvas.width,canvas.height,"white"));
arrayShell[0].draw();
arrayShell.length = 0;
// console.log(arrayShell); // empty array, contents marked for garbage collection?;
  let maxWidth = 120;
  let minWidth = 20;
  let maxHeight = 80;
  let minHeight = 20;

for (let i=0; i<300; i++) {
  arrayShell.push(new Player(Math.random()*(canvas.width-maxWidth), Math.random()*(canvas.height-maxHeight), Math.random()*(maxWidth-minWidth)+minWidth, Math.random()*(maxHeight-minHeight)+minHeight,randomColor()));
  arrayShell[0].draw();
  arrayShell.length = 0;
  console.log(arrayShell);
 
} // next rectangle;
} // end function makeArt();



/*
  for (keyName in players) {
   // use window[variableReference] to adopt keyName as new player name;
   window[keyName] = new Player(...players[keyName]);
   // new person has name of key used in persons array;
   // and has global scope;
  } // next players keyname;
player1.draw();
player2.draw();
player3.draw();

player1.update();
*/

makeArt();
