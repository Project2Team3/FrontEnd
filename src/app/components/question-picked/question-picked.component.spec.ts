import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPickedComponent } from './question-picked.component';

describe('QuestionPickedComponent', () => {
  let component: QuestionPickedComponent;
  let fixture: ComponentFixture<QuestionPickedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionPickedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionPickedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
