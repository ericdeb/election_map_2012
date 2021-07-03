var paper;
var background;
var xmlMap;
var grey = Raphael.rgb(84,84,84);
var stateAR = [];

$(document).ready(function() {

	canvas = $("#myCanvas")[0];
    P.setup(canvas);
    initializeCanvas();

	$.ajax({
		type: "GET",
		url: "usa.xml",
		dataType: "xml",
		success: function(xml) {
			xmlMap = xml;
		}
	})	

});

function initializeMap() {
	$("#myCanvas").remove();
	$("#map").css('display', 'block');
	paper = new Raphael("raphael_canvas", 1200, 650);
	background = paper.rect(0,0,1200,650).attr({fill: grey, stroke: grey});
	State.initializePathObjectSet();
	processStates();
	
}

function processStates() {

	$(xmlMap).find('path').each(function() {
		var id = $(this).attr("id");
		var path = $(this).attr("d");
		var name = $(this).attr("name");
		var color = $(this).attr("color");

		if (id == "MI2") {
			var p = stateAR[stateAR.length-1];
			stateAR[stateAR.length-1].addPath(path);
		}
		else {
			var st = new State(id, path, name, color);
			stateAR.push(st);
		}
	})

}
