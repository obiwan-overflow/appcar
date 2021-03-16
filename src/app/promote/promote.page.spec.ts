import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PromotePage } from './promote.page';

describe('PromotePage', () => {
  let component: PromotePage;
  let fixture: ComponentFixture<PromotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PromotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
