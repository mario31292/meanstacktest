//
//IMPORTANT!!!
//- This screen is an implementation guide, you can remove all comments if you want
//- Do not forget shift.screen.end(_screenPath) call to complete the screen and blink forward button
//- Do not forget shift.screen.loaded(_screenPath) call after initial animation of all screen elements. This function
//  enable all navigation buttons
//- Do not forget shift.screen.setScore(_screenPath, score) call to set user score when screen is a Test. The score is a number between 0 and 100. 
//  This function enable "forward" navigation button
//

shift.screen.play = function() {
    $.shiftScreen.initialize($("#content")); //initialize and play screen
};

$.extend({ //extend the jquery framework with new screen object
    shiftScreen: new function () { //this object encapsulates the p0 behavior
        var _self = this; //use _self to publish the initialize methods
        var _screenPath = $.extend(true, {}, shift.screen.path); //clone shift.screen.path to store the current screen path (unitIndex, topicIndex and screenIndex)
        var _container = null; //this is the screen container $("#content") defined as a global variable to contextualize p0's elements
        var _animationSpeed = 1000;
        
        _self.initialize = function (container) {
            _container = container;
            _loadScreenData();
            _startAnimation();
            _attachBehavior();
        };             
        
        var _loadScreenData = function () {                        
            $('#title', _container).html(shift.screen.name);
            //use this function to load the screen data and bind all elements content
            
            //load all text (define this function if you need it)
            //_loadTexts();
            
            //load all text (define this function if you need it)
            //_loadButtons();
            
            //load all audios and audio content (define this function if you need it)
            _loadAudios();
        };

        var _loadAudios = function() {
            $('#a1', _container).html(shift.screen.getAudio('a1').content);
            $('#a2', _container).html(shift.screen.getAudio('a2').content);
        }; 

        var _attachBehavior = function () {            
            //use this function to attach all behavior to the screen elements
            //$('element', _container).click(function(){.......}); 
            
            $('a.message_idea', _container).click(function(){
                MessageBox.alert('Idea', shift.screen.getText('message_idea').content);
            });

            $('a.message_example', _container).click(function(){
                MessageBox.alert('Example', shift.screen.getText('message_example').content);
            });
            
            _resizeControls(); //call resize controls if you need it
            
            $(window).resize(function(){ //bind windows resize if you need it
                _resizeControls();
            });
        };
        
        var _resizeControls = function(){
            //use this function to resize screen elements 
            //$('#a1', _container).width(30);
        };

        var _startAnimation = function () {
            //use this function to animate screen elements
            //this function is usually asynchronous and can include audio playback  
            
            _animateElement('#title', function(){
                _playAllAudios();
                _animateElement('#a1', function(){
                    _animateElement('#a2', function(){
                        _animateElement('a.message_idea', function(){
                            _animateElement('a.message_example', function(){
                                shift.screen.loaded(_screenPath);//always call shift.screen.loaded(_screenPath) function 
                                                                //width _screenPath paremeter after initial animation of all screen elements
                            });
                        });
                    });                
                });                
            });
        };     
        
        //user helper functions like _animateElement in order to help and simplify the animation process
        var _animateElement = function (element, callback) {
            $(element, _container).fadeIn(_animationSpeed, callback);
        };
        
        var _playAllAudios = function () { //you can define all functions that you need in this way            
            //use shift.screen.playAudio funcion to play audios.
            
            shift.screen.playAudio('a1',function(){
              shift.screen.playAudio('a2', function(){
                  shift.screen.end(_screenPath);//always call shift.screen.end(_screenPath) function width _screenPath paremeter to end the screen
              });
            });
        }; 
    }
});

//after all definitions call shift.screen.play() to run the screen. 
//do not remove this lines
$(function(){
    shift.screen.play(); 
});