import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchcarPage } from './searchcar.page';

describe('SearchcarPage', () => {
  let component: SearchcarPage;
  let fixture: ComponentFixture<SearchcarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchcarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchcarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
