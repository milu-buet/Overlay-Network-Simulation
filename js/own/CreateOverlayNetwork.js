 
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

