import { Component, OnInit } from '@angular/core';

import { Graph } from './graph';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  public graph: Graph;
  public errorMessage: string = '';
  constructor() {
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

  public getPageRank(v: string): void {
    if (!v) { this.showError('Inavlid Vertex'); return; };
    this.resetError();
    const pageRank = this.graph.getPageRank(v);
    if (!pageRank) { this.showError('Inavlid Vertex'); return; };
    const positionField: HTMLInputElement = document.getElementById('rankPositionDisplay') as HTMLInputElement;
    positionField.value = pageRank.toString();
  }

  public resetGraph(): void {
    this.graph.reset();
  }

  private showError(message: string): void {
    this.errorMessage = message;
  }

  private resetError(): void {
    this.errorMessage = '';
  }

}
