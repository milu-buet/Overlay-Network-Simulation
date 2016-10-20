/**
 * Created by Alex on 5/20/2015.
 */

function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText));
      }
      else {
        error(xhr);
      }
    }
  };
  xhr.open('GET', path, true);
  xhr.send();
}


function getScaleFreeNetwork(nodeCount) {
  var nodes = [];
  var edges = [];
  var connectionCount = [];

  // randomly create some nodes and edges
  for (var i = 0; i < nodeCount; i++) {
    nodes.push({
      id: i,
      label: String(i)
    });

    connectionCount[i] = 0;

    // create edges in a scale-free-network way
    if (i == 1) {
      var from = i;
      var to = 0;
      edges.push({
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
        cum += connectionCount[j];
        j++;
      }


      var from = i;
      var to = j;
      edges.push({
        from: from,
        to: to
      });
      connectionCount[from]++;
      connectionCount[to]++;
    }
  }

  nodes = new vis.DataSet(nodes);
  edges = new vis.DataSet(edges);

  return {nodes:nodes, edges:edges};
}

var randomSeed = 764; // Math.round(Math.random()*1000);
function seededRandom() {
  var x = Math.sin(randomSeed++) * 10000;
  return x - Math.floor(x);
}

function getScaleFreeNetworkSeeded(nodeCount, seed) {
  if (seed) {
    randomSeed = Number(seed);
  }
  var nodes = [];
  var edges = [];
  var connectionCount = [];
  var edgesId = 0;


  // randomly create some nodes and edges
  for (var i = 0; i < nodeCount; i++) {
    nodes.push({
      id: i,
      label: String(i)
    });

    connectionCount[i] = 0;

    // create edges in a scale-free-network way
    if (i == 1) {
      var from = i;
      var to = 0;
      edges.push({
        id: edgesId++,
        from: from,
        to: to
      });
      connectionCount[from]++;
      connectionCount[to]++;
    }
    else if (i > 1) {
      var conn = edges.length * 2;
      var rand = Math.floor(seededRandom() * conn);
      var cum = 0;
      var j = 0;
      while (j < connectionCount.length && cum < rand) {
        cum += connectionCount[j];
        j++;
      }


      var from = i;
      var to = j;
      edges.push({
        id: edgesId++,
        from: from,
        to: to
      });
      connectionCount[from]++;
      connectionCount[to]++;
    }
  }

  return {nodes:nodes, edges:edges};
}



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

            connectionCount[sp[i]] = 0;

          // create edges in a scale-free-network way
          if (i == 1) {
            var from = sp[i];
            var to = sp[0];
            edges.push({
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
            edges.push({
              from: from,
              to: to
            });
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
         edges.push({
            from: from,
            to: to
        });

    }
  }


  nodes = new vis.DataSet(nodes);
  edges = new vis.DataSet(edges);

  return {nodes:nodes, edges:edges};

}