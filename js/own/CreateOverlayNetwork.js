 
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


    function getOverLayEdge(from,to){

      for(var edge in overlayedges.get()){
          //console.log(edge)
          var edge_obj = overlayedges.get(edge)
          //console.log(obj)
          if(edge_obj.from == from && edge_obj.to == to){
              return edge_obj.id
          }
          if(edge_obj.from == to && edge_obj.to == from){
              return edge_obj.id
          }
      }
      return -1;
    }

    function overlayHighlightEdge(id,color){

        overlayedges.update({
          id:id, 
          color:{color:color}
        });

    }

    function overlayPath(overlay_path){

      var path_color = '#f44242';

      for(var i = 0; i < overlay_path.length - 1 ;i++){

        var show_edge = getOverLayEdge(overlay_path[i],overlay_path[i+1])
        console.log(show_edge)

        if(show_edge > -1){
          overlayHighlightEdge(show_edge,path_color);
        }
      }
      console.log('ok');
    }

  
  
