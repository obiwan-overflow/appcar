import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarallPage } from './carall.page';

describe('CarallPage', () => {
  let component: CarallPage;
  let fixture: ComponentFixture<CarallPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarallPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
