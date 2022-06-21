import cloneDeep from 'lodash/cloneDeep';
import { sort } from '../utils/utils';

export class Graph {
  public get allVertices() { return this.vertices};
  public get adjacency() { return this.adjacencyObject; }

  private vertices: string[] = [];
  private adjacencyObject: any = {}; // stores vertices as keys and an array of their neighours as values e.g { A: ["B", "C"]};
  private pageRanksCalcs: any = { calculated: false }; // The calculated flag is used for memoization
  private verticesRankingPosition: any = {}; // stores vertices as keys and their integer position as values


  /**
   * Adds a vertex to the graph
   * @param v string name of the vertex
   * @returns void
   */
  public addVertex(v: string): string | void {
    if (this.adjacencyObject[v]) return 'Vertex already exists';
    this.vertices.push(v);
    this.adjacencyObject[v] = [];
  }

  /**
   * Adds directed or undirected Edge in the graph
   * @param firstVertex string name of virst existent vertex. Returns error string if vertex does not exist
   * @param secondVertex string name of second vertex
   * @param isUndirected Optional flag to determine if edge is undirected. By default a directed edge is added
   * @returns void in case of success and a string in case of error
   */
  public addEdge(firstVertex: string, secondVertex: string, isUndirected: boolean = false): string | void {
    if (!this.adjacencyObject[firstVertex] || !(this.adjacencyObject[secondVertex])) return 'Vertex not found';
    if (this.hasEdge(firstVertex, secondVertex, isUndirected)) return 'Edge already exists';
    this.adjacencyObject[firstVertex].push(secondVertex);
    if (isUndirected) this.adjacencyObject[secondVertex].push(firstVertex);
  }

  /**
   * Deletes a vertex from the graph. It also removes its key from adjacency list and removes it from neighbours array of other vertices
   * @param vertex string name of vertex to be deleted
   * @returns void in case of success and a string in case of error
   */
  public deleteVertex(vertex: string): string | void {
    if (!this.vertices.includes(vertex)) return 'Vertix does not exist';
    delete this.adjacencyObject[vertex];
    const index = this.vertices.indexOf(vertex);
    if (index > -1) { this.vertices.splice(index, 1); }

    this.vertices.forEach(v => {
      if(this.adjacencyObject[v].includes(vertex)) {
        this.adjacencyObject[v].splice(this.adjacencyObject[v].indexOf(vertex, 1))
      }
    })
  }

  /**
   * Deletes an edge from the graph
   * @param vertex1 string name of edge's first vertex
   * @param vertex2 string name of edge's second vertex
   * @param undirected If true, deletes an undirected edge i.e removes both vertices from each other's neighbours array.
   * By default only v1->v2 edge will be deleted
   * @returns void in case of success and a string in case of error
   */
  public deleteEdge(vertex1: string, vertex2: string, undirected: boolean = false): string | void {
    if (!this.vertices.includes(vertex1) || !this.vertices.includes(vertex2)) return 'Vertix does not exist';
    this.adjacencyObject[vertex1].splice(this.adjacencyObject[vertex2].indexOf(vertex2), 1);
    if (undirected) this.adjacencyObject[vertex2].splice(this.adjacencyObject[vertex1].indexof(vertex1), 1);
  }

  /**
   * Generates a string detailing the edges of the graph
   * @returns graph's string representation e.g A => B \n B => C
   */
  public printGraph() {
    let printStr = '';
    this.vertices.forEach(vertex => {
      const neighboursList = this.adjacencyObject[vertex];
      neighboursList.forEach(
        (neighbour: string) => printStr+=`${vertex} => ${neighbour}\n`
      );

    });
    printStr = printStr.trim();
    return printStr;
  }

  /**
   * Determines the number of outgoing edges a vertex has.
   * @param v string name of the vertex
   * @returns number in case of success and a string in case of error
   */
  public getOutDegree(v: string): number | string {
    if (!this.adjacencyObject[v]) {
      return 'Vertex not found';
    }
    return this.adjacencyObject[v].length;
  }

  /**
   * Provides an array of neighbours of a provided vertex
   * @param v strng name of vertex
   * @returns array in case of success and a string in case of error
   */
  public getNeighbours(v: string): string | string[] {
    if (!this.adjacencyObject[v]) {
      return 'Vertex not found';
    }
    return this.adjacencyObject[v];
  }

  /**
   * Resets all the data of graph
   */
  public reset() {
    // Data reset
    this.vertices = [];
    this.adjacencyObject = [];
    // Page rank variable resets
    this.pageRanksCalcs = {};
    this.pageRanksCalcs.calculated = false;
    this.verticesRankingPosition = {};
  }

  /**
   * checks if graph has a given vertex
   * @param v string name of the vertex
   * @returns a boolean denoting the vertex is present or not 
   */
  public hasVertex(v: string): boolean {
    return this.vertices.includes(v);
  }

    /**
   * checks if graph has an between given vertices
   * @param firstVertexs tring name of the vertex
   * @param secondVertex string name of the vertex
   * @param isUndirected boolean denoting if the edge to be checked for is undirected
   * @returns a boolean denoting the edge is present or not
   */
  public hasEdge(firstVertex: string, secondVertex: string, isUndirected: boolean = false) {
    return !isUndirected ?  this.adjacencyObject[firstVertex].includes(secondVertex) :
      this.adjacencyObject[firstVertex].includes(secondVertex) || this.adjacencyObject[secondVertex].includes(firstVertex)
  }

  /**
   * Returns integer position/pagerank of given vertex
   * @param vertex string name of vertex
   * @returns number denoting page rank starting from 1
   */
     public getPageRank(vertex: string): number {
      if (!this.pageRanksCalcs.calculated) this.calculatepageRanksCalcs();
      return this.verticesRankingPosition[vertex];
    }

  /**
   * Function to get all nodes that point towards provided vertex
   * @param v string name of pointee vertex
   * @returns string array of pointer node names
   */
  private getPointerNodes(v: string): string[] {
    const pointerNodes: string[] = [];
    this.vertices.forEach((n: string) => {
      if(n !== v) {
        if(this.adjacencyObject[n].includes(v)) pointerNodes.push(n);
      }
    });
    return pointerNodes;
  }

  /**
   * Function for calculating page ranks
   */
  private calculatepageRanksCalcs() {
    // Set Default Values (1/totalVertices)
    for (let v of this.vertices) {
      this.pageRanksCalcs[v] = {}
      this.pageRanksCalcs[v].rank = 1/this.vertices.length;
    }

    // Calcuting relative pageRank
    // Formula: rank of page-i = sum([rank of page-j]/outDegree of page-j) where each pointer node is page j
    for (var i = 0; i < 2; i++) {
      const oldRanks = cloneDeep(this.pageRanksCalcs); // During calculation of new page-rank, ranks from previous iteration will be used
      this.vertices.forEach(vertex => {
        const pointers = this.getPointerNodes(vertex); // Get all nodes pointing to vertex of interest
        if (!pointers.length) return;
        let rank: number = 0;
        pointers.forEach(pointer => {
          rank+=(oldRanks[pointer].rank/+this.getOutDegree(pointer)); // summation of all pointer ranks divided by their outdegrees
        });
        this.pageRanksCalcs[vertex].rank = rank;
      })
    }
    this.pageRanksCalcs.calculated = true; // enable memoization for future calls

    // Assign bositions based on rank values. Higher the value, higher the position
    let ranks: number[] = [];
    // store values in an array and sort in ascending order. Higher values will get higher index;
    this.vertices.forEach(v => +ranks.push(this.pageRanksCalcs[v].rank));
    const sortedRanks = sort(ranks);
    // Store the indices as rank positions
    this.vertices.forEach(v => {
      this.verticesRankingPosition[v] = sortedRanks.indexOf(this.pageRanksCalcs[v].rank) + 1;
    });
  }
}

