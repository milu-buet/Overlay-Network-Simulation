

function selectSuperPeers(nodeCount,superpeerCount){

  var sp = []
  for(var i=0;i<superpeerCount;i++){

      var rand = Math.floor(Math.random() * nodeCount);

      while(sp.indexOf(rand) >=0){
        var rand = Math.floor(Math.random() * nodeCount);
      }
        sp.push(rand) 
  }

  return sp;
}


function getScaleFreeOverlayNetwork(nodeCount,superpeerCount) {
  var nodes = [];
  var edges = [];
  var connectionCount = [];

  var sp = selectSuperPeers(nodeCount,superpeerCount)
  //console.log()

  for(i in sp){
      
            nodes.push({
                id: sp[i],
                label: String(sp[i]),
                //color:{background:'#7CFC00'},
                group:'myGroup'

            });

            rnodes.update([{id:sp[i], group:'myGroup'}]);

            connectionCount[sp[i]] = 0;

          // create edges in a scale-free-network way
          if (i == 1) {
            var from = sp[i];
            var to = sp[0];
            e_id = edges.length;
            edges.push({
              id: e_id,
              from: from,
              to: to
            });
            connectionCount[from]++;
            connectionCount[to]++;
          }
          else if (i > 1) {
            var conn = edges.length * 2;
            var rand = Math.floor(Math.random() * conn);
            var cum = 0;
            var j = 0;
            while (j < connectionCount.length && cum < rand) {
              cum += connectionCount[sp[j]];
              j++;
            }


            var from = sp[i];
            var to = sp[j];
            e_id = edges.length;
            edges.push({
              id: e_id,
              from: from,
              to: to
            });
            //console.log(e_id);
            connectionCount[from]++;
            connectionCount[to]++;
          }
  }


  for (var i = 0; i < nodeCount; i++) {
    if(sp.indexOf(i) < 0){
        nodes.push({
                id: i,
                label: String(i),
                color:{background:'#7CFC00'},
        });

        ri = Math.floor(Math.random() * sp.length);
        random_super_peer = sp[ri];

         var from = i;
         var to = random_super_peer;
         e_id = edges.length;
         edges.push({
            id: e_id,
            from: from,
            to: to
        });

         //console.log(e_id);

    }
  }


  nodes = new vis.DataSet(nodes);
  edges = new vis.DataSet(edges);

  return {nodes:nodes, edges:edges};

}