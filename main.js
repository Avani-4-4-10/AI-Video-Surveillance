video = "" 
model_status= ""
objects = []
function setup(){
    canvas= createCanvas(480 , 380)
    canvas.center()
}
function preload(){
    video = createVideo("video.mp4")
    video.hide()
}
function start(){
    objectDetection= ml5.objectDetector("cocoSsd" , modelLoaded)
    document.getElementById("status").innerHTML= "Status : detecting objects"
}
function modelLoaded(){
    console.log("Model is initialized!")
    model_status = true ;
    video.loop()
    video.speed(1)
    video.volume(0)
}
function draw(){
    image(video , 0 , 0 , 480 , 380)

    if(model_status != ""){
        objectDetection.detect(video , gotResult)
        for(i = 0 ; i < objects.length ; i++ ){
            document.getElementById("status").innerHTML= "Status : Objects Detected!"
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected : "+ objects.length
            fill("red")
            percent = Math.floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%" , objects[i].x+15 , objects[i].y+15) 
            noFill()
            stroke("red")
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)
        }
    }
}
function gotResult(error , results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        objects = results ;
    }
}
