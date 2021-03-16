import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpecialServicePage } from './special-service.page';

describe('SpecialServicePage', () => {
  let component: SpecialServicePage;
  let fixture: ComponentFixture<SpecialServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
