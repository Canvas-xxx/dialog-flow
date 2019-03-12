import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAreaComponent } from './drag-area.component';

describe('DragAreaComponent', () => {
  let component: DragAreaComponent;
  let fixture: ComponentFixture<DragAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
