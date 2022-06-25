import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerApi } from '../services/server-api';

import { GraphComponent } from './graph.component';

describe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ GraphComponent ],
      providers: [ ServerApi ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should calculate page ranks correctly', () => {
    expect(+component.getPageRank('A')).toBe(1);
    expect(+component.getPageRank('B')).toBe(2);
    expect(+component.getPageRank('C')).toBe(4);
    expect(+component.getPageRank('D')).toBe(3);
  });
});
