 
 	var nodes = null;
    var edges = null;
    var network = null;
    var setSmooth = false;

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

    function getEdge(from,to){

      for(var edge in edges.get()){
        //console.log(typeof(edge));
        edge_obj = edges.get()[edge]
          if(edge_obj.from == from && edge_obj.to == to){
              return edge_obj.id
          }
          if(edge_obj.from == to && edge_obj.to == from){
              return edge_obj.id
          }
      }
      return -1;
    }

    function hghlightEdge(id,color){

        edges.update({
          id:id, 
          color:{color:color}
        });

    }

    function Path(path){

      var path_color = '#f44242';
      for(var i = 0; i < path.length - 1 ;i++){

        var show_edge = getEdge(path[i],path[i+1])
        console.log(show_edge)

        if(show_edge > -1){
          hghlightEdge(show_edge,path_color);
        }
      }
      console.log('ok');
    }

