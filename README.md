# angular-background-video
It is a angularjs directive to generate video background with carouse with a single line of code. It does not require jQuery and external libraries. 

Demo: http://www.web-huertas.com:8080/angular-video-background/#/



##Step: 1
 
 Load angular-video-background.js file:
 ```html
   <script src="path_file/angular.js"></script>
   <script src="path_file/angular-video-background.js"></script>
```

##Step: 2
 inject the angular-video-background in angular.module
 ```javascript
  angular.module('app', ['angular-video-background']);
 ```


##Step 3"

 Create the object which setup the video background and carousel.
 
 Inside the controller:
 ```javascript
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
 ```
   
      
##Step 4:
 
 Initialize directive:
 ```html
  <div id="main">
    <angular-html-video back-video-data="angular_Back_data"></angular-html-video>  
  </div>
```

