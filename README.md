## Cognitive assessment card game 
Version 0.1a
####What this?
Basically a Wisconsin Card Sorting Test simulator. See more on wikipedia: http://en.wikipedia.org/wiki/Wisconsin_Card_Sorting_Test

####HOW to play:
Clone this repo and open the index.html file. When the page loads, use "w"(left card), "a"(top card) and "d"(right card) keys to select a card that matches the rule.


####Current Features:
* Registers User's reaction time, accuracy and type of test
* Uses d3.js to build a rudementary bar graph of relative rxn times

####Bugs:
* Keystrokes after test is over cause abberant graphs to appear
* First bar isn't registring right
* Redunant use of underscore library, maybe

####TODO:
* Add in game instructions and a ready screen
* Add x and y axis
* Display Accuracy
* Set up trial to run all the different rules
* Set up blind rule trials
* Add transitions to make bar graphs purdy.