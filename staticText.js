var StaticText = (function() {

    /*Private Static Variables*/
    var Sty = {
        strokeWidth: 10,
        strokeCap: 'round',
        strokeJoin: 'round',
        strokeColor: new P.RgbColor(250/255,33/255,27/255)
    };

    /*Constructor*/
    return function(pathAR) {

        var path = new P.Path();
        path.style = Sty;
        path.opacity = 0;

        for (var i = 0; i < pathAR.length; i++) {
            path.add(new P.Point(pathAR[i][0]+30, pathAR[i][1]));
        }

        delete pathAR;

        this.animate = function(curTime) {

            if (curTime < timeEnd)
                return;

            path.opacity += .01;

        }

    }

})();

