import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyServicePage } from './buy-service.page';

describe('BuyServicePage', () => {
  let component: BuyServicePage;
  let fixture: ComponentFixture<BuyServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
