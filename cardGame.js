var COLORS = [
	"blue",
	"red",
	"yellow"
]

var NUMBERS = [1, 2, 3]

var SHAPES = [
	"square",
	"triangle",
	"circle"
]

function Result (options){
	var options = options || {}
	this.reactionTime = options.reactionTime;
	this.rule = options.rule;
	this.hit = options.hit;
}


function Card (options){
	var options = options || {}
	this.color = options.color;
	this.number = options.number;
	this.shape = options.shape;
}

Card.prototype.randomCard = function(){
	this.color = _.sample(COLORS);
	this.number = _.sample(NUMBERS);
	this.shape = _.sample(SHAPES);
	return this;
}

function Trial (){
	this.table = [],
	this.hand = [],
	this.startTime = new Date().getTime()
}

Trial.prototype.setTrial = function(){
	var tempColors = _.shuffle(COLORS);
	var tempNumbers = _.shuffle(NUMBERS);
	var tempShapes = _.shuffle(SHAPES);
	var options = {}
	for(var i = 0; i < 3; i++){
		options.color = tempColors[i];
		options.number = tempNumbers[i];
		options.shape = tempShapes[i];
		this.table.push(new Card(options));
	}
	var randCard = new Card();
	this.hand = randCard.randomCard()
	return this;
}
