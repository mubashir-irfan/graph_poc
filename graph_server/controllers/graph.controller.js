var cloneDeep = require('lodash.clonedeep');

function sort(arr, descending = false) {
  return !descending ?  arr.sort((one, two) => (one < two ? -1 : 1)) :
    arr.sort((one, two) => (one > two ? -1 : 1));
}

exports.calculateRanks = (req, res) => {
  const payload = JSON.parse(req.query.requestData);
  if (!payload) res.status(400).send('Invalid Input');
  const pageRanks = {};
  const rankPositions = {};
  const vertices = payload.vertices;
  const pointerNodes = payload.pointerNodes;
  const outDegree = payload.outDegree;
  if (!vertices || !pointerNodes || !outDegree) res.status(400).send('Invalid Input');
  // Set Default Values (1/totalVertices)
  for (let v of vertices) {
    pageRanks[v] = {};
    pageRanks[v].rank = 1 / vertices.length;
  }

  // Calcuting relative pageRank
  // Formula: rank of page-i = sum([rank of page-j]/outDegree of page-j) where each pointer node is page j
  for (var i = 0; i < 2; i++) {
    const oldRanks = cloneDeep(pageRanks); // During calculation of new page-rank, ranks from previous iteration will be used
    vertices.forEach((vertex) => {
      const pointers = pointerNodes[vertex]; // Get all nodes pointing to vertex of interest
      if (!pointers.length) return;
      let rank = 0;
      pointers.forEach((pointer) => {
        rank += oldRanks[pointer].rank / +outDegree[pointer]; // summation of all pointer ranks divided by their outdegrees
      });
      pageRanks[vertex].rank = rank;
    });
  }

  // Assign bositions based on rank values. Higher the value, higher the position
  let ranks = [];
  // store values in an array and sort in ascending order. Higher values will get higher index;
  vertices.forEach((v) => +ranks.push(pageRanks[v].rank));
  const sortedRanks = sort(ranks);
  // Store the indices as rank positions
  vertices.forEach((v) => {
    rankPositions[v] =
      sortedRanks.indexOf(pageRanks[v].rank) + 1;
  });

  res.status(200).send(rankPositions);
};
