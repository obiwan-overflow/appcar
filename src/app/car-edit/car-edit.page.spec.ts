import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarEditPage } from './car-edit.page';

describe('CarEditPage', () => {
  let component: CarEditPage;
  let fixture: ComponentFixture<CarEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
