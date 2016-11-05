
$(document).ready(function(){

	draw();

	
})

function overlayroute(){

	s = $('#source').val();
	d = $('#destination').val();

	getOverlayShortestPath(s,d);

}