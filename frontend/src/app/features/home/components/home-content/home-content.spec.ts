import { HomeContent } from '@/app/features/home/components/home-content/home-content';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('HomeContent', () => {
  let component: HomeContent;
  let fixture: ComponentFixture<HomeContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeContent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
