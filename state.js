var State = (function() {

	/*Private Static Variables*/
	var gradientOn = false;
	var strokeColor = "#222";
	this.pathObjectSet;
	var that = this;

	var colorsAR = [
		Raphael.rgb(230,33,2), //darkRed
		Raphael.rgb(255,85,67), //lightRed
		Raphael.rgb(255,255,50), //yellow
		Raphael.rgb(81,125,244), //lightBlue
		Raphael.rgb(12,55,160) //darkBlue 	
	]

	var gradientsAR = [
		Raphael.rgb(255,150,138), //darkRed
		Raphael.rgb(255,202,196), //lightRed
		Raphael.rgb(255,255,180), //yellow
		Raphael.rgb(164,187,249), //lightBlue
		Raphael.rgb(15,77,238) //darkBlue 	
	];

	var contentAR = [
		"Definite Conservative Victory", //darkRed
		"Leans Right", //lightRed
		"Battleground!!", //yellow
		"Leans Left", //lightBlue
		"Definite Liberal Victory" //darkBlue 	
	];

	/*Private Static Functions*/
	function addGradient(pathObject, colorCode) {
		if (!gradientOn) {
			pathObject.attr({"fill": colorsAR[colorCode+2], "fill-opacity": 1, stroke: strokeColor, "stroke-width": 2, "stroke-opacity": 1 });
			return;
		}
		var gradient = "50-"+gradientsAR[colorCode+2]+"-"+colorsAR[colorCode+2]+":40";
		pathObject.attr({"fill": gradient, "fill-opacity": 1, stroke: strokeColor });
	}

	function constructPathObject(path, colorCode, gradientBool) {
		var pathObject = paper.path(path);
		if (gradientBool) 
			addGradient(pathObject, colorCode);
		else
			pathObject.attr({"fill": colorsAR[colorCode+2], "fill-opacity": 1, stroke: strokeColor, "stroke-width": 2 });
		pathObject.translate(25,25);
		return pathObject;
	}

	function bindState(pathObject, hoverPath, colorCode, name) {

		var mouseInRunning = false;
		var mouseOutRunning = false;

		var animateCallback = function() {
			mouseInRunning = false;
			mouseOutRunning = false;
		}

		pathObject.mouseover(function() {
			if (mouseInRunning)
				return false;
			hoverPath.toFront();
			pathObjectSet.toFront();		
			hoverPath.animate({transform: "t15,15"}, 300);
			$("#title").text(name); 
			$("#content").text(contentAR[colorCode+2]);
			mouseInRunning = true;
		});

		pathObject.mouseout(function() {
			if (mouseOutRunning)
				return false;
			$("#title, #content").text('');
			mouseOutRunning = true;
			hoverPath.stop();
			hoverPath.animate({transform: "t25,25"}, 300, animateCallback);
		});
	}

	/*Constructor*/
	return function (id, path, name, colorCode) {

		var id = id;
		var colorCode = parseInt(colorCode);
		var name = name;
		var pathObjectAR = [];
		var hoverPathObjectAR = [];
		var backPath;
		var shadowPath;

		this.addPath = function(path) {
			var pathObject = constructPathObject(path, colorCode, false);
			var hoverPath = constructPathObject(path, colorCode, true);
			pathObject.attr({"fill-opacity":0, "stroke-opacity": 0}).toFront();
			bindState(pathObject, hoverPath, colorCode, name);
			that.pathObjectSet.push(pathObject);
			pathObjectAR.push(pathObject);
			hoverPathObjectAR.push(hoverPath);
		}

		/*Constructor Function*/
		backPath = constructPathObject(path, colorCode, false);
		shadowPath = constructPathObject(path, colorCode, false);
		shadowPath.attr({"stroke-opacity": 0, fill: '#000', "fill-opacity":.8});
		this.addPath(path);

	}

})();



/*Public Static Functions*/

State.initializePathObjectSet = function() {
	pathObjectSet = paper.set();
}