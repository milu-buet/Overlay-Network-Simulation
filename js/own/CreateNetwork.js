 
 	var nodes = null;
    var edges = null;
    var network = null;
    var setSmooth = false;
      var sequentialEdgesToAnimateR = [];

    function destroy() {
      if (network !== null) {
        network.destroy();
        network = null;
      }
    }

    function draw() {
      destroy();
      var nodeCount = document.getElementById('nodeCount').value;
      if (nodeCount > 100) {
        document.getElementById("message").innerHTML = '<a onclick="disableSmoothCurves()">You may want to disable dynamic smooth curves for better performance with a large amount of nodes and edges. Click here to disable them.</a>';
      }
      else if (setSmooth === false) {
        document.getElementById("message").innerHTML = '';
      }
      // create a network
      var container = document.getElementById('mynetwork');
      var data = getScaleFreeNetwork(nodeCount);
      rnodes = nodes = data.nodes
      redges = edges = data.edges

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
      network = new vis.Network(container, data, options);
    }

    function disableSmoothCurves() {
      setSmooth = true;
      network.setOptions({edges:{smooth:{type:'continuous'}}});
      document.getElementById("message").innerHTML = '<a onclick="enableSmoothCurves()">Click here to reenable the dynamic smooth curves.</a>';
    }

    function enableSmoothCurves() {
      setSmooth = false;
      document.getElementById("message").innerHTML = '<a onclick="disableSmoothCurves()">You may want to disable dynamic smooth curves for better performance with a large amount of nodes and edges. Click here to disable them.</a>';
      network.setOptions({edges:{smooth:{type:'dynamic'}}});
    }
    var last_dir_backward = false;
    function getEdge(from,to){
      last_dir_backward = false;
      for(var edge in edges.get()){
        //console.log(typeof(edge));
        edge_obj = edges.get()[edge]
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

    function hghlightEdge(id,color){

        edges.update({
          id:id, 
          color:{color:color},
          width: 5
        });

    }

    function Path(path){
      
      var path_color = '#f44242';
      for(var i = 0; i < path.length - 1 ;i++){

        var show_edge = getEdge(path[i],path[i+1])
        console.log(show_edge)

        var anim_obj = { edge: show_edge,trafficSize:8};
        anim_obj.isBackward = last_dir_backward;

        sequentialEdgesToAnimateR.push(anim_obj);

        if(show_edge > -1){
          hghlightEdge(show_edge,path_color);
        }
      }
      console.log('ok');
    }


  function getShortestPath(node1,node2){

      var d = new Dijkstras();
      n = nodes.getIds();
      e = edges.get();
      d.setGraphCustom(n,e);

      var p = d.getPath(node1.toString(), node2.toString());
      p.unshift(node1.toString());

      Path(p);

    }


  function realroute(path){
    sequentialEdgesToAnimateR = [] ;
    for(var i =0 ; i < path.length - 1; i++){

        n1 = path[i]
        n2 = path[i+1]
        getShortestPath(n1,n2);

    }
    animateR(0);
  }



  function animateR(startingEdgeNum) {
   
    network.animateTraffic(
                        /* first edge to start animating */
                        sequentialEdgesToAnimateR [startingEdgeNum] ,

                        /* onPreAnimationHandler*/
                        null, 

                        /*onPreAnimateFrameHandler*/
                        null , 

                       /*onPostAnimateFrameHandler*/ 
                        null ,
                        
                        /* onPostAnimationHandler */
                        function(edgesTrafficList) { 
                              if (++ startingEdgeNum < sequentialEdgesToAnimateR.length) {
                                   animateR(startingEdgeNum); 
                              }
                       }
    );
}


