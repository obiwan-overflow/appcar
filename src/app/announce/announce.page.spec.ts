import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnnouncePage } from './announce.page';

describe('AnnouncePage', () => {
  let component: AnnouncePage;
  let fixture: ComponentFixture<AnnouncePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnnouncePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
