/* Author: Juan Huertas-Fernandez*/


(function withAngular(angular) {

    'use strict';

    angular.module('angular-video-background', [])
    
    	.directive('angularHtmlVideo', function($window,$document,$timeout,$compile,$route) {
               return {
                   restrict: "E",
                   scope: {
                    	carouselData: "="
                   },

                   template: '<div id="videoCont">'
				                 +'<video width="100%" height="100%" autoplay loop muted>'
					             +'</video>'
				                   	 +'<div id="mainContainer">' 
						               	   +'<div id="angularCarousel">'
					               	  			+'<div ng-repeat="d in carouselData.carouselData" class="item_carousel">'
						               	  			+'<h1> {{d.title}} </h1>'
						               	  			+'<p> {{d.subtitle}} </p>'
					               	  			+'</div>'
					                   	   +'</div>'
					                       +'<div class="bottomMenuCarousel">'
					                        	+'<div ng-repeat="d in carouselData.carouselData"'
					                       		+'class="circleMenuCarousel"'
					                        	+'ng-class="{activeCarouselItem: isActive(this)}"'
					                        	+'ng-click="changeSlide(this)">'
					                            +'</div>'
					                       +'</div>'
	                    	    	 +'</div>'      
                    	      +'</div>',
                    controller:function($scope){
                    	
                    	$scope.video = $scope.carouselData.video;
                    	$scope.carousel_time = ($scope.carouselData.carouselTransitonTime != undefined) ? ($scope.carouselData.carouselTransitonTime * 1000) : 3000;
                    	/* To control what dot need to be active */
                    	$scope.isActive = function(obj){
                      	   if(obj.$index == $scope.activeItem){
                      		   return true;
                      	   }
                      	   return false;
                         }
 
                    	
               
                    	
                    },              	    	
                    
                    link: function($scope, element, attrs) {

                    /* Getting dom elements */
                    var videoCont 	  = $scope[attrs.angularHtmlVideo] = element;
                    var videoDom 	  = videoCont[0].firstChild.firstChild;
                    var parentElement = angular.element(videoCont[0].parentElement);
                    var mainContainer = angular.element(videoCont[0].firstChild.lastChild);
                    var h1Dom 		  = angular.element(mainContainer[0].childNodes[0]);
                    var pDom 		  = angular.element(mainContainer[0].childNodes[1]);
                    var angularCarousel = angular.element(document.querySelector("#angularCarousel"));  	   
                    angularCarousel.css({'left':'0px'});
                    
                    
                    
                    /* Initialize global variables */
                    $scope.screenSize = {
                    		width:videoDom.offsetWidth,
                    		height: videoDom.offsetHeight
                    }
                    $scope.videoHeight = videoDom.offsetHeight;
                    $scope.videoWidth  = videoDom.offsetWidth;    	
                    
                   var carousel_Item_Number = $scope.carouselData.carouselData.length;
                   var carouselTimer;
                   var changeSliderTimer;
                   var resizeTimer;
                   var readyTimer;
                   
                   
                   
                  
                   
                    /** ******************************************************* */
                    /** 				Add source Video and play it 		    */
                    /** ******************************************************* */
                        	   
                   if('mp4' in $scope.video){
                        if($scope.video.mp4 != null && $scope.video.mp4 !=undefined && $scope.video.mp4 !=""){
                        	videoDom.setAttribute('src', $scope.video.mp4);
                        	videoDom.load();
       	                   	videoDom.play();
       	                   	    	   
                     }
	               }else if('webm' in $scope.video){
	                   	if($scope.video.webm != null && $scope.video.webm !=undefined && $scope.video.webm !=""){
	                        videoDom.setAttribute('src', $scope.video.webm);
	                        videoDom.load();
	       	                videoDom.play();
	                    }
	               }else if('ogv' in $scope.video){
	                   	if($scope.video.ogv != null && $scope.video.ogv !=undefined && $scope.video.ogv !=""){
	                        videoDom.setAttribute('src', $scope.video.ogv);
	                        videoDom.load();
	       	                videoDom.play();
	                   	 }
	                }
                  	    	 
	                   	    	
                   $scope.swipeLocation = [];
                        	   
                    /** ******************************************************* */
                    /** 					Applied CSS Styles	 			    */
                    /** ******************************************************* */
                   
              	   /* Initialize Variables */
                   var head = document.getElementsByTagName('head');
                   /* Create Css Elements and injet it into the head */
                   var styleCarousel = document.createElement('style');
                   styleCarousel.type = 'text/css';
                   
                   function updateCSS(){
                	   parentElement.css({'height': videoDom.offsetHeight+'px'})
                	   var titleSize = 80;
                	   var subtitleSize = 16;
                	   
                	   if(videoDom.offsetWidth > 1300){
                		   titleSize = 80;
                    	   subtitleSize = 16;
                	   }if(videoDom.offsetWidth > 1000 && videoDom.offsetWidth < 1300){
                		   titleSize = 60;
                    	   subtitleSize = 16;
                	   }if(videoDom.offsetWidth > 600 && videoDom.offsetWidth < 1000){
                		   titleSize = 45;
                    	   subtitleSize = 16;
                	   }if(videoDom.offsetWidth < 600){
                		   titleSize = 20;
                    	   subtitleSize = 12;
                	   }
 
                	   styleCarousel.innerHTML = ' '
                		    +' .activeCarouselItem { background-color: #FFFFFF; }'
          	   				+' .circleMenuCarousel{ width: 6px; height: 6px; cursor:pointer; justify-content: center; align-items: center; color: white; border: 1px solid white; border-radius: 3px;margin-right: 3px;}'
          	   				+' .item_carousel{ width:'+ videoDom.offsetWidth+'px; display:flex; flex-direction: column; justify-content: center; align-items:center;}'
          	   				+' .item_carousel h1{ text-align: center; color: '+ $scope.carouselData.titleColor +' ; font-size:'+ titleSize +'px; letter-spacing: 5px; margin: 40px 0 10px;line-height: 1; text-transform: uppercase; font-weight: normal; font-family: "Oswald", sans-serif;}'
          	   				+' .item_carousel p{ text-align: center; color: '+ $scope.carouselData.subtibleColor +'; font-size: '+ subtitleSize +'px; margin: 20px 0 40px;}'
          	   				+'  angular-carousel{width: inherit; height: inherit;}'
          	   				+' #angularCarousel{ top: 0px; width: '+(videoDom.offsetWidth * carousel_Item_Number)+'px; height:inherit; position:absolute;left:0px; display:inline-flex; -webkit-transition:all 1s ease-in-out; -moz-transition:all 1s ease-in-out;-o-transition: all 1s ease-in-out;-ms-transition: all 1s ease-in-out; transition: all 1s ease-in-out;} '
          	   				+' .bottomMenuCarousel{ position:absolute; bottom:40px; left:47%; height:6px; display:flex; flex-direction: row;list-style:none;}'
          	   				+'  angular-html-video{width:100%;  z-index: 0; position:absolute; left:0px; top:0px; overflow:hidden; opacity: 1;backface-visibility:hidden;}'
          	   			 	+' #mainContainer{width:100%; height: 100%; z-index:0; position:absolute; left:0px; top:0px; overflow:hidden; opacity: 1;backface-visibility: hidden; display: flex; flex-direction: column; justify-content:center; align-items:center; background: rgba(0,0,0,0.5;}'
          	   			 	+' ';
                 	   
     	   			
                	   
   		               /* add Css to Head */
   		            	head[0].appendChild(styleCarousel);
                   } // End updateCss
                 
                   
                  
                   
                   /** ******************************************************* */
                   /** 					  Carousel Functions   			       */
                   /** ******************************************************* */
                   
                   
                   
                   function startCarousel(){
	               		var totalWidth = videoDom.offsetWidth * carousel_Item_Number;
	               		var leftScreen = Math.abs(parseInt(angularCarousel.css('left')));
	               		var itemNumber = (carousel_Item_Number - 1);
	               		
	               		
	               		if(((totalWidth - videoDom.offsetWidth) == leftScreen) || totalWidth < leftScreen) {
	               			angularCarousel.css({'left':'0px'});
	               		}else{
	               			angularCarousel.css({'left':-(videoDom.offsetWidth + leftScreen) +'px'});
	               		}
	               		
	               		leftScreen = Math.abs(parseInt(angularCarousel.css('left')));        		
	               		if(leftScreen < videoDom.offsetWidth){
	               			$scope.activeItem = 0;
	               		}else{
								$scope.activeItem = (leftScreen / videoDom.offsetWidth);
							}
	               		
	               		carouselTimer = $timeout(function(){}, $scope.carousel_time);
	               		carouselTimer.then(
		                     function() {
		                    	 /** After timeout is completed, destroy the $timeout object and start again */
		                         $timeout.cancel(carouselTimer);
		                         startCarousel(); 
		                     }
		                );
		        	   
	               		
	               		
	               		
               		
               		} // End startCarousel
                   		
                   function stopCarousel(){
                	   $timeout.cancel(carouselTimer);
                   }
                   
		           function deleteCSS(){
		        	   styleCarousel.innerHTML = "";
                	   head[0].appendChild(styleCarousel); 
		           } // End deleteCSS
		            
		           
		           $scope.changeSlide = function(slideBullet){
		        	   var getSlideIndex = slideBullet.$index;
		        	   $scope.activeItem = getSlideIndex;
	
		        	   $timeout.cancel(carouselTimer);
		        	   if(getSlideIndex == 0){
		        		   angularCarousel.css({'left':'0px'});
		        		   
		        		   changeSliderTimer = $timeout(function(){ 
		        			   startCarousel();
		               		}, 4000);
		        		  
		        	   }else{
		        		   angularCarousel.css({'left':-(videoDom.offsetWidth * getSlideIndex)+'px'}); 
		        		   
		        		   changeSliderTimer = $timeout(function(){ 
		        			   startCarousel();
		               		}, 4000);
		        	   }
		        	   
		        	   
		        	   changeSliderTimer.then(
		                        function() {
		                            $timeout.cancel(changeSliderTimer);
		                        }
		                    );
		        	  
		           } // End changeSlide function
		            
		               		
                  /** ******************************************************* */
                  /** 					Windows Screen functions   			  */
                  /** ******************************************************* */

		         function getScreenSize(){
                       var scrSize = {
                             width:  document.body.clientWidth,
                             height: document.body.clientHeight
                       }
                      return scrSize;
                  }
                        	                           	   
                 function getVideoSize(){
                      var videoEleSize = {
                        	width: videoDom.offsetWidth,
                        	height:videoDom.offsetHeight
                      }
                       return videoEleSize;
                }
                        	   
                        	   
                function setupScreenSize(scrSize){
                      /* Setting new values into screen */
                      var videoSize = getVideoSize();
                      parentElement.css({"height":videoSize.height+"px"});
                      videoCont.css({"height":videoSize.height+"px"});
                } // End SetupScreenSize
                        	   
                        	   
                /** Window resize event handling */
                 angular.element($window).bind('resize', function () {
                	 
                	 angularCarousel.css({'left':'0px'});
                	 resizeTimer = $timeout(function(){ 
                		 	updateCSS();
	               		}, 200);

                	 resizeTimer.then(
		                 function() {
		                         $timeout.cancel(resizeTimer);
		                      }
		                 );

                 }); // End resize function
                        
                 
                 
                 
                 /** ******************************************************* */
                 /** 					Draggable functions	 			       */
                 /** ******************************************************* */
                 
	                 /* var startX = 0, startY = 0, x = 0, y = 0;
	               
	                  var maxScrool = (carousel_Item_Number - 1) * videoDom.offsetWidth;
	                 
	                 
	          	     
	                 angularCarousel.on('mousedown', function(event) {
	                	 angularCarousel.removeClass('carouselAnimation');
	                	 stopCarousel();
	          	       // Prevent default dragging of selected content
	          	       event.preventDefault();
	          	       startX = event.screenX - x;
	          	      // startY = event.screenY - y;
	          	       $document.on('mousemove', mousemove);
	          	       $document.on('mouseup', mouseup);
	          	     });
	
	          	     function mousemove(event) {
	          	       //y = event.screenY - startY;
	          	       x = event.screenX - startX;
	          	       var leftCarousel = parseInt(angularCarousel.css('left'));
	          	      
	          	    		 angularCarousel.css({
			 	          	        //top: y + 'px',
			 	          	         left:  x + 'px'
			 	          	 });
	          	    
	          	     }
	
	          	     function mouseup() {
	          	       $document.off('mousemove', mousemove);
	          	       $document.off('mouseup', mouseup);
	          	     }*/
                 
	          	   
	                 /** ******************************************************* */
	                 /** 					END Draggable functions	 			       */
	                 /** ******************************************************* */
                 
	          	     
                        	   
                angular.element($document).ready(function() {
                	/* Update Screen Size */
                	readyTimer = $timeout(function(){
                		 updateCSS(); // Start carousel again
                		 startCarousel();
	            	},500);
                	
                	readyTimer.then(function() {
    		               $timeout.cancel(readyTimer);
    		               }
    		        );
                                	
                }); // En document ready function
                
                
                
                
                  	       
                }  
             };
       })
       
       
}(angular));