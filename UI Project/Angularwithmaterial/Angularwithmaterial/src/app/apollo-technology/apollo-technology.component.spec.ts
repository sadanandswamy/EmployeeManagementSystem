import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApolloTechnologyComponent } from './apollo-technology.component';

describe('ApolloTechnologyComponent', () => {
  let component: ApolloTechnologyComponent;
  let fixture: ComponentFixture<ApolloTechnologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApolloTechnologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApolloTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
