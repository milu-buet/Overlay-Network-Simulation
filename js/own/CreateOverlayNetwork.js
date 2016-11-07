 
 	  var overlaynodes = null;
    var overlayedges = null;
    var overlaynetwork = null;
    var overlaysetSmooth = false;
    var sequentialEdgesToAnimate = []

    function overlaydestroy() {
      if (overlaynetwork !== null) {
        overlaynetwork.destroy();
        overlaynetwork = null;
      }
    }

    function overlaydraw() {
      overlaydestroy();

      var nodeCount = document.getElementById('nodeCount').value;
      var superpeerCount = document.getElementById('superpeerCount').value;
      
      // create a network
      var container = document.getElementById('overlaynetwork');
      var data = getScaleFreeOverlayNetwork(nodeCount,superpeerCount);
      overlaynodes = data.nodes
      overlayedges = data.edges

      var options = {
        physics: { stabilization: false },
        manipulation: {
      		addNode: function(nodeData,callback) {
      			nodeData.id = nodeCount;
        			nodeData.label = nodeCount;
        			nodeCount++
        			callback(nodeData);
      		},
      		deleteNode: true
  		  },
        groups: {
            myGroup: {color:{background:'red'}, borderWidth:3}
        }
      };
      overlaynetwork = new vis.Network(container, data, options);
    }

    var last_dir_backward = false;
    function getOverLayEdge(from,to){
      last_dir_backward = false;
      for(var edge in overlayedges.get()){
          //console.log(edge)
          var edge_obj = overlayedges.get(edge)
          //console.log(obj)
          if(edge_obj.from == from && edge_obj.to == to){
              return edge_obj.id
          }
          if(edge_obj.from == to && edge_obj.to == from){
            last_dir_backward = true;
              return edge_obj.id
          }
      }
      return -1;
    }

    function overlayHighlightEdge(id,color){

        overlayedges.update({
          id:id, 
          color:{color:color},
          width: 5
        });

    }

    function overlayPath(overlay_path){

      var path_color = '#f44242';

      for(var i = 0; i < overlay_path.length - 1 ;i++){

        var show_edge = getOverLayEdge(overlay_path[i],overlay_path[i+1])
        //console.log(show_edge)
        //isBackward: true

        var anim_obj = { edge: show_edge,trafficSize:8};
        anim_obj.isBackward = last_dir_backward;

        sequentialEdgesToAnimate.push(anim_obj);

        if(show_edge > -1){
          overlayHighlightEdge(show_edge,path_color);
        }
      }
      console.log('ok');
    }

    function getOverlayShortestPath(node1,node2){

      var d = new Dijkstras();
      n = overlaynodes.getIds();
      e = overlayedges.get();
      d.setGraphCustom(n,e);

      var p = d.getPath(node1.toString(), node2.toString());
      p.unshift(node1.toString());

      overlayPath(p);
      realroute(p);
      animate(0);

    }


    // function testm(){

    //   animate(0);

    // }


// var sequentialEdgesToAnimate = [
//        // forward sequence
//        {edge:1, trafficSize:4}
// ];


function animate(startingEdgeNum) {
   
    overlaynetwork.animateTraffic(
                        /* first edge to start animating */
                        sequentialEdgesToAnimate [startingEdgeNum] ,

                        /* onPreAnimationHandler*/
                        null, 

                        /*onPreAnimateFrameHandler*/
                        null , 

                       /*onPostAnimateFrameHandler*/ 
                        null ,
                        
                        /* onPostAnimationHandler */
                        function(edgesTrafficList) { 
                              if (++ startingEdgeNum < sequentialEdgesToAnimate.length) {
                                   animate(startingEdgeNum); 
                              }
                       }
    );
}

  
  
