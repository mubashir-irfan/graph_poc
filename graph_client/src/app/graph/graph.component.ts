import { Component, OnInit } from '@angular/core';
import { ServerApi } from '../services/server-api';

import { Graph } from './graph';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  public graph: Graph;
  public errorMessage: string = '';

  private isGraphChanged: boolean = false;
  private pageRanksFromServer: any = null;

  constructor(private api: ServerApi) {
    this.graph = new Graph();
  }

  public ngOnInit() {
    // Default Graph
    this.createVertex('A');
    this.createVertex('B');
    this.createVertex('C');
    this.createVertex('D');

    this.createEdge('A','B');
    this.createEdge('A','C');
    this.createEdge('B','D');
    this.createEdge('C','A');
    this.createEdge('C','B');
    this.createEdge('C','D');
    this.createEdge('D','C');
  }

  public createVertex(name: string) {
    if (!name) { this.showError('Inavlid Input'); return; }
    this.resetError();
    const errorText = this.graph.addVertex(name);
    if (errorText) this.showError(errorText)
  }

  public createEdge(v1: string, v2: string, isUndirected: boolean = false) {
    if (!v1 || !v2) { this.showError('Inavlid Input'); return; }
    this.resetError();
    const errorText = this.graph.addEdge(v1, v2, isUndirected);
    if (errorText) this.showError(errorText)
  }

  public getPageRank(vertex: string): void | number {
    if (!vertex || !this.graph.hasVertex(vertex)) { this.showError('Inavlid Vertex'); return; };
    this.resetError();
    const pageRank = this.graph.getPageRank(vertex);
    if (!pageRank) { this.showError('Inavlid Vertex'); return; };
    const positionField: HTMLInputElement = document.getElementById('rankPositionDisplay') as HTMLInputElement;
    positionField.value = pageRank.toString();
    return pageRank;
  }

  public resetGraph(): void {
    this.graph.reset();
  }

  public logGraphToConsole(): void {
    console.log(this.graph);
  }

  private showError(message: string): void {
    this.errorMessage = message;
  }

  private resetError(): void {
    this.errorMessage = '';
  }

  public fetchRanksFromServer(vertex: string): string {
    if (!vertex || !this.graph.hasVertex(vertex)) { this.showError('Inavlid Vertex'); return ''; };

    if (!this.isGraphChanged && this.pageRanksFromServer) return this.pageRanksFromServer[vertex];

    const payload =  {
      vertices: this.graph.allVertices,
      adjacencyObject: this.graph.adjacency,
      pointerNodes: this.graph.getPointersConfig(),
      outDegree: this.graph.getOutDegreeConfig(),
    }
    console.log('payload', payload)
    this.api.get('graph/ranks', payload).subscribe((res: any) => {
      this.pageRanksFromServer = res;

      const displayElement: HTMLInputElement = document.getElementById('rankPositionDisplayServer') as HTMLInputElement;
      displayElement.value = res[vertex];
    });
    return '';
  }

}
