# angular-background-video
It is a angularjs directive to generate video background with carouse with a single line of code. 

Demo: http://www.web-huertas.com:8080/angular-video-background/#/



Step: 1
 
 Load angular-video-background.js file:
 
 <script src="path_file/angular-video-background.js"></script>

Step: 2
 inject the angular-video-background in angular.module
 
 angular.module('app', ['angular-video-background']);

Step 3:
 
 Initialize directive:
 
 <div id="main">
   <angular-html-video back-video-data="angular_Back_data"></angular-html-video>  
 </div>

Step 3"

 Create the object which setup the video background and carousel.
 
 Inside the controller:

    $scope.angular_Back_data = {
          video:{
            mp4:"dist/videos/modaVideo.mp4",
            webm:"",
            ogv:""
          },
          carousel:[
               {"title":"Carousel Page 1","subtitle":"This is the subtitle and it need to be longer. This look pretty amazing"},
               {"title":"Carousel Page 2","subtitle":"This is the subtitle and it need to be longer. This look pretty amazing"},
               {"title":"Carousel Page 3","subtitle":"This is the subtitle and it need to be longer. This look pretty amazing"},
               {"title":"Carousel Page 4","subtitle":"This is the subtitle and it need to be longer. This look pretty amazing"}
          ],
          titleColor:"#FFFFFF",
          subtibleColor:"red",
          carouselTransitonTime: 4 // time is measured in seconds. 

      }
