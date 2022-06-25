# Graph POC
This repository provides a basic demo of a Non-Weighted Graph Data Structure. It supports the following features:
- Adding vertices
- Adding directed edge (default)
- Adding undirected edge
- Deleting vertices and edges
- Detecting if a vertex/edge exists
- Get out-degree of a given node
- Get pointer nodes of a given node

# How to Run
The repo has two directories. One for client and one for server. Both require independent run of `npm install` comman as both have their own dependency configuration.

Once require modules are installed, run `npm start` in `graph_Client` directory and `node server.js` in `graph_server` directory. Client app will open on port number 4200 and server will listen on on port number 5555 by default.

## Implementation
The implementation uses an Adjacency Object structured as follows:
```
{
vertices: string[],
adjacencyObject: {
  <vertex>: <pointee nodes>: string[]
  }
}
```
Page Ranks are calculated as sum of pointer nodes divided by their out-degree. The calculation starts with an initital value of `1/total notes` for all nodes and runs for 2 iterations. The algorithm used for the calculation has been taked from [this](https://www.youtube.com/watch?v=P8Kt6Abq_rM) video resource.

## Design
The frontend interface is written in Angular/TypeScript. Nearly all of the features are provided natively in the frontend application. For the purposes of demonstration, a Node app-let has been added which exposes an API for calculating a provided graph's page ranks.

For the Backend app-let, API is exposed on endpoint `/api/graph/ranks`. It consumes a stringified JSON payload representing the graph using the structure detailed in Implementation section. It returns an object with vertices as keys and ranks as values.

## Limitations
- The Frontend demonstrates only Non-Weighted Graph Implementation completely.
- Codebase demonstrates a limited example of weighted graph powred by The data structure for it requires representing adjacnency with each pointee node as an array, with first value being node name and second weight of the edge
