import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarAddPage } from './car-add.page';

describe('CarAddPage', () => {
  let component: CarAddPage;
  let fixture: ComponentFixture<CarAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
