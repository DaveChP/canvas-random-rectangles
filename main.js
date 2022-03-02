const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = innerWidth; // window property;
canvas.height = innerHeight;
let repeat = 0;


// document.addEventListener('click', event => {if (event.target.tagName=='CANVAS'){loop()};} );
// auto render and save (ensure browser prefs set to allow file save without user confirmation);

function loop(iterations) {
  for (let i=0; i<iterations; i++) {
  repeat++;
  makeArt();
  save(`${repeat}`);
  } // next i cycle of draw and save;
} // end function loop;


function save(filenameComponent){
const aTag = document.createElement('a');
document.body.appendChild(aTag);
aTag.href = canvas.toDataURL('image/png');
aTag.download = `${new Date().getTime()}-magic-image-${filenameComponent}.png`;
aTag.click();
aTag.remove();
}

class Player {
  constructor(x,y,width,height,color) {
  this.position = {x: x, y: y}
  this.width = width;
  this.height = height;
  this.color = color;
  }

  draw() {
  context.fillStyle = this.color;
  context.fillRect(this.position.x, this.position.y, this.width, this.height);
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
return rgbColors[parseInt(Math.random()*rgbColors.length)];
}

function makeArt() {
// set background white;
let arrayShell = [];
arrayShell.push (new Player(0,0,canvas.width,canvas.height,"white"));
arrayShell[0].draw();
arrayShell.length = 0;
// set rectangle constraints
  let maxWidth = 120;
  let minWidth = 20;
  let maxHeight = 80;
  let minHeight = 20;

  for (let i=0; i<300; i++) {
    // rect dimensions for this iteration;
    let width = Math.random()*(maxWidth-minWidth)+minWidth;
    let height = Math.random()*(maxHeight-minHeight)+minHeight;
    
    arrayShell.push(new Player(Math.random()*(canvas.width-width), Math.random()*(canvas.height-height), width, height, randomColor()));
    arrayShell[0].draw();
    arrayShell.length = 0;
   } // next rectangle;

} // end function makeArt();

function stamp(){
 return new Date().get
}

// makeArt();
// each loop makes an image and saves it;
loop(10); // ~22 ms per file, tested up to 1000 (~22 seconds), fan kicked in;
