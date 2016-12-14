// Play 

var mic
var of;
var ok;
var xpos = 0;
var ypos = 0;
var t = 1;

function setup() {
  createCanvas(800, 700);

 var t =
    {
        name: "test",
        colors: ["white", "purple"],
        lifetime: 150,
        angle: [200,360],
        size: [2,8],
        speedx: 4.0,
        x: .5,
        y: .5
    };
    of = new Fountain(null, t);

    
  mic = new p5.AudioIn();
  analyzer = new p5.Amplitude;
  analyzer.setInput(mic);
  fft = new p5.FFT();
  fft.setInput(mic);
    
   mic.start();
}

function draw() {
  background(0);

 var rms = analyzer.getLevel();
 var spectrum = fft.analyze();
  

var elapsedSeconds = millis() / 500.0;
  var alpha = noise(width/2, height/2, elapsedSeconds);
  
  var time = millis() % 20000;
  var hue = map (time, 0, 20000, 0, 400);
  
  fill(hue, 100, alpha * 400);
  
  //centerLogo
  stroke(255);
  ellipse(width/2, height/2, 10+rms*1000, 5+rms*500);
  ellipse(width/2, height/2, 10+rms*500, 5+rms*1000);
  

  //soundbar
  noStroke(0);
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width*6);
    var h = -height + map(spectrum[i], 0, 255, height*3, 0);
    rect(x, height, width / spectrum.length, h )
  
}
  
  //oscillating ellipse 
  noFill();
  stroke(255);
  strokeWeight(4);
 
  ellipse(width/2,height/2,1+(sin(frameCount/20)*50),100);
  ellipse(width/2,height/2,100+(cos(frameCount/20)*50),50);
  

  var vol = mic.getLevel();
  
  //particles
  of.Draw();
  of.Create();
  if(vol>0.01){
  of.Step();
  }
    
  noStroke();
  text(of.length, width/2, 20);
  stroke(0);
}





