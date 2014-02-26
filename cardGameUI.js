$(document).ready(function() {

  var v = new View();
	console.log(v.trial)
  v.run();

  // $(this).keydown(function(event) {
 //    v.handleKeyEvent(event);
 //  })
});

function View (){
	this.trial = new Trial().setTrial();
	this.rule = 
}

View.prototype.run = function(){
	this.render();
}

View.prototype.render = function(){
	var that = this;
	var cardIDs = ['#left', '#top', '#right']
	for(var i = 0; i < 3; i++){
		var card = that.trial.table[i]
		var spacing = 0;
		var yIncrement = 300/(card.number + 1);
		for(var j = 0; j < card.number; j++){
			spacing = spacing + yIncrement
			switch(card.shape){
			case "circle":
				d3.select(cardIDs[i]).append("circle")
					.attr("cx", 90)
					.attr("cy", spacing)
					.attr("r", 10)
					.style("fill", card.color);
				break;
			case "square":
				d3.select(cardIDs[i]).append("rect")
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
				d3.select(cardIDs[i]).append("polygon")
					.attr("points", points)
					.style("fill", card.color);
				break;
			}
		}
	}
}

