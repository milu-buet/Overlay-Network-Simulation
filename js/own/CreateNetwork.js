 
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

    function getNode(id){
    	//console.lnetwork.nodes
    	var newColor = '#7CFC00' ;
    	//nodes.update([{id:id, color:{background:newColor}}]);
    	edges.update([{id:'1', color:{color:newColor}}]);
    }

    function getEdge(node1,node2){

    }

    function showPath(path){



    }

