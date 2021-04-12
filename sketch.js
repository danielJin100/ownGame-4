var dim = 4;
var tesseract = [];
var binCount;
var rad = 2;
var zoom = 100;
var display = [];
var farZoom = 1;
var c;
var rotation = [45,45,10,0,0,0];
var inter = [];
var skew1 = 0;
var skew2 = 0;
var screenDist = 2;

function setup(){
  angleMode(DEGREES);
  createCanvas(800,800);
  for(var g = 0; g < 16; g++){
    inter.push({x:0,y:0,z:0});
  }
  for(var count = 0; count < Math.pow(2,dim); count++){
    binCount = count.toString(2)
    while(binCount.length < dim){
      binCount = "0" + binCount;
    }
    binCount = binCount.split("");
    for(j = 0; j < dim; j++){
      binCount[j] = parseInt(binCount[j])
      binCount[j] *= rad;
      binCount[j] -= 1;
    }
    tesseract.push(binCount);
  }
  console.log(tesseract)


  
  console.log(display);
}

function draw(){
  
  display = [];
  /*
  for(var v = 0; v < tesseract.length; v++){
      display.push({
        x:-200+(inter[v].z)*25+(inter[v].x*((screenDist+200)/(inter[v].z+200)))*zoom,
        y:-200+(inter[v].z)*25+(inter[v].y*((screenDist+200)/(inter[v].z+200)))*zoom});
  }
*/
for(var v = 0; v < tesseract.length; v++){
  display.push({x:inter[v].x*zoom+200-inter[v].x*zoom/2, y:inter[v].y*zoom+200-inter[v].y*zoom/2});
}
  background(255);
  strokeWeight(5);
  for(var a = 0; a < Math.pow(2, dim); a++){
    display[a];
  }


if(keyIsDown(SHIFT)){
  if(keyIsDown(81)){
    rotation[0] -= 5;;
  } else if(keyIsDown(69)){
    rotation[0] += 5;
  }
  if(keyIsDown(87)){
    rotation[1] += 5;
  } else if(keyIsDown(83)){
    rotation[2] -= 5;
  }
  if(keyIsDown(65)){
    rotation[2] += 5;
  } else if(keyIsDown(68)){
    rotation[2] -= 5;
  }

  if(keyIsDown(79)){
    rotation[3] += 5;
  }
}



  rot();
  wireframe();
}


function wireframe() {
  for(var c = 0; c < 8; c += 4){
    line(display[c+0].x,display[c+0].y,display[c+1].x,display[c+1].y);
    line(display[c+0].x,display[c+0].y,display[c+2].x,display[c+2].y);
    line(display[c+1].x,display[c+1].y,display[c+3].x,display[c+3].y);
    line(display[c+2].x,display[c+2].y,display[c+3].x,display[c+3].y);
  }
  line(display[0].x,display[0].y,display[4].x,display[4].y);
  line(display[1].x,display[1].y,display[5].x,display[5].y);
  line(display[2].x,display[2].y,display[6].x,display[6].y);
  line(display[3].x,display[3].y,display[7].x,display[7].y);

  for(var c = 8; c < 16; c += 4){
    line(display[c+0].x,display[c+0].y,display[c+1].x,display[c+1].y);
    line(display[c+0].x,display[c+0].y,display[c+2].x,display[c+2].y);
    line(display[c+1].x,display[c+1].y,display[c+3].x,display[c+3].y);
    line(display[c+2].x,display[c+2].y,display[c+3].x,display[c+3].y);
  }
  line(display[8].x,display[8].y,display[12].x,display[12].y);
  line(display[9].x,display[9].y,display[13].x,display[13].y);
  line(display[10].x,display[10].y,display[14].x,display[14].y);
  line(display[11].x,display[11].y,display[15].x,display[15].y);

  line(display[0].x,display[0].y,display[8].x,display[8].y);
  line(display[1].x,display[1].y,display[9].x,display[9].y);
  line(display[2].x,display[2].y,display[10].x,display[10].y);
  line(display[3].x,display[3].y,display[11].x,display[11].y);
  line(display[4].x,display[4].y,display[12].x,display[12].y);
  line(display[5].x,display[5].y,display[13].x,display[13].y);
  line(display[6].x,display[6].y,display[14].x,display[14].y);
  line(display[7].x,display[7].y,display[15].x,display[15].y);
}

function rot(){
  inter = [];
  var angle1 = rotation[0];
  var angle2 = rotation[1];
  var angle3 = rotation[2];
  var angle4 = rotation[3];
  for(var f = 0; f < 16; f++){
    inter.push({
      x: ((cos(angle1)) * tesseract[f][3]-(sin(angle1))*tesseract[f][2]),
      y: (sin(angle1)*tesseract[f][3]+cos(angle1)*tesseract[f][2]),
      z: tesseract[f][1],
      w: tesseract[f][0]
    });
  }
  
  for(var f = 0; f < Math.pow(2,dim); f++){
    inter[f].x = ((cos(angle2)) * inter[f].x-(sin(angle2))*inter[f].z)+2;
    inter[f].z = (sin(angle2)*inter[f].x+cos(angle2)*inter[f].z)+2;
  }

  for(var f = 0; f < Math.pow(2,dim); f++){
    inter[f].y = ((cos(angle3)) * inter[f].y-(sin(angle3))*inter[f].z)+2;
    inter[f].z = (sin(angle3)*inter[f].y+cos(angle3)*inter[f].z)+2;
  }

  for(var f = 0; f < Math.pow(2,dim); f++){
    inter[f].x = ((cos(angle4)) * inter[f].x-(sin(angle4))*inter[f].w)+2;
    inter[f].w = (sin(angle4)*inter[f].x+cos(angle4)*inter[f].w)+2;
  }
}