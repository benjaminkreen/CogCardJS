$(document).ready(function() {

  var v = new View();
	v.rule = new Rule();
  v.run();

  $(this).keydown(function(event) {
    v.handleKeyEvent(event);
  })
});

cardIDs = ['#left', '#top', '#right']

function Rule(options){
	var options = options || {hidden: false};
	var RULES = ["COLOR", "NUMBER", "SHAPE"]
	this.rule = _.sample(RULES),
	this.hidden = options.hidden
}


function View (){
	this.trial = new Trial().setTrial();
	this.results = []
}

View.prototype.handleKeyEvent = function(event){
	switch(event.keyCode){
	case(65):		// "a" is the left card, this.trial.table[0]
		this.validateResponse(this.trial.table[0])
		break;
	case(87):		// "w" is the top card, this.trial.table[1]
		this.validateResponse(this.trial.table[1])
		break;
	case(68):		// "d" is the right card, this.trial.table[2]
		this.validateResponse(this.trial.table[2])
		break;
	case(81): //'q' for quit!
		break;
	}
}

View.prototype.validateResponse = function(card){
	var hand = this.trial.hand
	var resOptions = {}
	var now = new Date().getTime()
	resOptions.reactionTime = now - this.trial.startTime
	switch(this.rule.rule){
	case("COLOR"):
		resOptions.rule = "COLOR"
		if(card.color === hand.color){
			resOptions.hit = true;
		} else {
			resOptions.hit = false;
		}
	break;
	case("SHAPE"):
		resOptions.rule = "SHAPE"
		if(card.shape === hand.shape){
			resOptions.hit = true;
		} else {
			resOptions.hit = false;
		}
	break;
	case("NUMBER"):
		resOptions.rule = "NUMBER"
		if(card.number === hand.number){
			resOptions.hit = true;
		} else {
			resOptions.hit = false;
		}
	break;
	}	
	var res =  new Result(resOptions);
	this.results.push(res);
	
	if(this.results.length < 10){
		this.trial = new Trial().setTrial()
		this.render();
	} else {
		this.showResults()
	}
}

View.prototype.showResults = function(){
	d3.selectAll('.cardrow svg').remove()
	console.log(this.results);
	var rxnTimes = []
	for(var i = 0; i < this.results.length; i++){
		rxnTimes.push(this.results[i].reactionTime);
	}
	var n = rxnTimes.length
	var zeroData = Array.apply(null, new Array(n)).map(Number.prototype.valueOf,0);
	var barW = 540/n,
			barH = 300;
			
			
	var y = d3.scale.linear()
						.domain([0, d3.max(rxnTimes)])
						.rangeRound([0, barH])
	
	var chart = d3.select('.results').append('svg')
													.attr('width', 540)
													.attr('height', 300)
		
	var bar = chart.selectAll('g')
				.data(rxnTimes)
				.enter().append("g")
				.attr("transform", function(d, i){ return "translate(" + i * barW + ", 0)"; });
				
	bar.append("rect")
			.attr("y", function(d){ return y(d);})
			.attr("height", function(d){ console.log(300 - y(d)); return 300 - y(d);})
			.attr("width", barW - 1)
			
				
}

View.prototype.run = function(){
	this.render();
}

View.prototype.erase = function(){
	d3.selectAll('circle').remove();
	d3.selectAll('rect').remove();
	d3.selectAll('polygon').remove();
}

View.prototype.render = function(){
	if(! this.rule.hidden){
		$('#rules').text("Match by " + this.rule.rule);
	}
	this.erase();
	for(var i = 0; i < 3; i++){
		var card = this.trial.table[i]
		var id = cardIDs[i]
		this.renderCard(card, id);
		this.renderCard(this.trial.hand, '#middle')
	}
}

View.prototype.renderCard = function(card, id){
	var spacing = 0;
	var yIncrement = 300/(card.number + 1);
	for(var j = 0; j < card.number; j++){
		spacing = spacing + yIncrement
		switch(card.shape){
		case "circle":
			d3.select(id).append("circle")
				.attr("cx", 90)
				.attr("cy", spacing)
				.attr("r", 10)
				.style("fill", card.color);
			break;
		case "square":
			d3.select(id).append("rect")
				.attr("x", 80)
				.attr("y", spacing)
				.attr("height", 20)
				.attr("width", 20)
				.style("fill", card.color);
			break;
		case "triangle":
			var topVertex = "90," + String(spacing - 10);
			var leftVertex = "80," + String(spacing + 10);
			var rightVertex = "100," + String(spacing + 10);
			var points = topVertex + ' ' + leftVertex + ' ' + rightVertex
			d3.select(id).append("polygon")
				.attr("points", points)
				.style("fill", card.color);
			break;
		}
	}
}

