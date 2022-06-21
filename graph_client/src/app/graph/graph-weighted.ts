export class WeightedGraph {
  private vertices: string[] = [];
  private adjacencyObject: any = {};

  public addVertex(v: string): string | void {
    if (this.adjacencyObject[v]) return 'Vertex already exists';
    this.vertices.push(v);
    this.adjacencyObject[v] = [];
  }

  public addEdge(u: string,v: string, weight: string, isUndirected: boolean = false): string | void {
    if (!this.adjacencyObject[u] || !(this.adjacencyObject[v])) return 'Vertex not found';
    this.adjacencyObject[u].push([v, weight]);
    if (isUndirected) this.adjacencyObject[v].push([u, weight]);
  }

  public printGraph() {
    let printStr = '';
    this.vertices.forEach(vertex => {
      const neighboursList = this.adjacencyObject[vertex];
      neighboursList.forEach(
        (neighbourEntry: [string, number]) => printStr+=`${vertex} => ${neighbourEntry[0]}(${neighbourEntry[1]})`
      );
      printStr+='\n';
    });
    printStr = printStr.trim();

    return printStr;
  }

  public getNeighbours(v: string): string | [][] {
    if (!this.adjacencyObject[v]) {
      return 'Vertex not found';
    }
    return this.adjacencyObject[v];
  }

  public hasVertix(v: string): boolean {
    return this.vertices.includes(v);
  }

  public hasEdge(firstVertex: string, secondVertex: string, isUndirected: boolean = false) {
    for (const edge of this.adjacencyObject[firstVertex]) if (edge[0]=== secondVertex) return true;

    if (isUndirected)
      for (const edge of this.adjacencyObject[secondVertex]) if (edge[0]=== firstVertex) return true;

      return false;
  }
}