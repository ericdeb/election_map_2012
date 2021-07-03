var LetSegPath = (function() {

    /*Private Static Variables*/
    var Sty = {
        strokeWidth: 10,
        strokeCap: 'round',
        strokeJoin: 'round',
        strokeColor: new P.RgbColor(36/255,223/255,248/255)
    };

    function addHandle(seg, pathAR, index) {
        if (pathAR[index][2]) {
            var p = new P.Point(pathAR[index][2], pathAR[index][3]);
            if (index == pathAR.length-2)
                seg.handleOut = p;
            else
                seg.handleIn = p;
        }
    }


    /*Private Static Functions*/
    function createPath(pathAR) {
        var path = new P.Path();

        for (var i = 0; i < pathAR.length; i++) {
            var seg = new P.Segment(new P.Point(pathAR[i][0], pathAR[i][1]), null, null);
            addHandle(seg, pathAR, i);
            path.add(seg);
        }

        path.visible = false;
        return path;
    }


    function calcSegLength(pathAR) {
        var len = pathAR.length;
        var seg1 = new P.Segment(new P.Point(pathAR[len-2][0], pathAR[len-2][1]), null, null);
        var seg2 = new P.Segment(new P.Point(pathAR[len-1][0], pathAR[len-1][1]), null, null);

        addHandle(seg1, pathAR, len-2);        
        addHandle(seg2, pathAR, len-1);

        var path = new P.Path(seg1, seg2);
        path.remove();

        return path.length;
    }


    /*Constructor*/
    return function(pathAR, timeStart) {

        var timeStart = timeStart;
        var timeDur = timeEnd-timeStart;
        var fullPath = createPath(pathAR);
        var segs = fullPath.segments;
        var segLen = calcSegLength(pathAR);
        var totPathLen = 0;
        var totSegCount = 1;
        var curPath = new P.Path(fullPath.segments[0]);
        curPath.style = Sty;

        delete pathAR;

        this.animate = function(curTime) {

            if (curTime < timeStart)
                return;

            if (totSegCount + 1 > segs.length)
                return;

            var lenNeeded = (curTime-timeStart)/timeDur*fullPath.length - totPathLen;
            handleLine(lenNeeded);

        }

        
        function handleLine(lenNeeded) {
            var p1 = curPath.lastSegment.point;
            var p2 = segs[totSegCount].point;
            var v = p2.subtract(p1);

            if (lenNeeded > v.length) {
                curPath.add(p2);
                totSegCount++;
            }
            else {
                v.length = lenNeeded;
                curPath.add(new P.Point(p1.x + v.x, p1.y + v.y));
            } 

            totPathLen+=v.length;

            while (curPath.length > segLen)
                curPath.removeSegment(0);
        }

    }

})();