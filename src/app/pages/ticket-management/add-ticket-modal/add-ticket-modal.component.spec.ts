import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicketModalComponent } from './add-ticket-modal.component';

describe('AddTicketModalComponent', () => {
  let component: AddTicketModalComponent;
  let fixture: ComponentFixture<AddTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTicketModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
