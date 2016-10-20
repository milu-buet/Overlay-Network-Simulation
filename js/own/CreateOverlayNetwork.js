 
 	  var overlaynodes = null;
    var overlayedges = null;
    var overlaynetwork = null;
    var overlaysetSmooth = false;

    function overlaydestroy() {
      if (overlaynetwork !== null) {
        overlaynetwork.destroy();
        overlaynetwork = null;
      }
    }

    function overlaydraw() {
      overlaydestroy();

      var nodeCount = document.getElementById('nodeCount').value;
      
      // create a network
      var container = document.getElementById('overlaynetwork');
      var data = getScaleFreeNetwork(nodeCount);
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
  		}
      };
      overlaynetwork = new vis.Network(container, data, options);
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

