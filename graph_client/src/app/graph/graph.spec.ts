import { Graph } from './graph'

describe('Non-weighted Graph Test Suite', () => {

  let graph = new Graph();

  afterEach(() => graph.reset())

  it ('should create an empty graph', () => {
    expect(graph.allVertices.length).toBe(0);
    expect(Object.keys(graph.adjacency).length).toBe(0);
  });

  it ('should create vertex with no edges', () => {
    graph.addVertex('A');
    expect(graph.allVertices.includes('A')).toBe(true);
    expect(graph.adjacency['A'].length).toBe(0);
  });

  it ('should create and check for directed edge successfully', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addEdge('A', 'B');
    expect(graph.hasEdge('A', 'B')).toBe(true);
  });

  it ('should create and check for undirected edge successfully', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addEdge('A', 'B', true);
    expect(graph.hasEdge('A', 'B')).toBe(true);
  });

  it ('should determine neighbours in a directed graph correctly', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D')
    graph.addEdge('A', 'B', false);
    graph.addEdge('A', 'C', false);
    graph.addEdge('A', 'D', false);
    graph.addEdge('B', 'D', false);
    const neighboursA: string[] = graph.getNeighbours('A') as string[];
    const neighboursB: string[] = graph.getNeighbours('B') as string[];
    expect(neighboursA).toEqual(['B','C','D']);
    expect(neighboursB).toEqual(['D']);
  });

  it ('should determine neighbours in an udirected graph correctly', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addEdge('A', 'B', true);
    graph.addEdge('A', 'C', true);
    graph.addEdge('A', 'D', true);
    graph.addEdge('B', 'D', true);
    const neighboursA: string[] = graph.getNeighbours('A') as string[];
    const neighboursB: string[] = graph.getNeighbours('B') as string[];
    expect(neighboursA).toEqual(['B','C','D']);
    expect(neighboursB).toEqual(['A', 'D']);
  });

  it ('should delete a vertex and its edges successfully', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C')
    graph.addEdge('A', 'B', true);
    graph.addEdge('B', 'C', true);
    graph.addEdge('A', 'C', false);
    graph.deleteVertex('C');
    expect(graph.hasVertex('C')).toBe(false);
    expect(graph.hasEdge('A', 'C')).toBe(false);
    expect(graph.hasEdge('B', 'C')).toBe(false);
  });

  it ('should calculate page ranks of a default graph correctly', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addEdge('A','B');
    graph.addEdge('A','C');
    graph.addEdge('B','D');
    graph.addEdge('C','A');
    graph.addEdge('C','B');
    graph.addEdge('C','D');
    graph.addEdge('D','C');

    expect(graph.getPageRank('A')).toBe(1);
    expect(graph.getPageRank('B')).toBe(2);
    expect(graph.getPageRank('C')).toBe(4);
    expect(graph.getPageRank('D')).toBe(3);
  });
})