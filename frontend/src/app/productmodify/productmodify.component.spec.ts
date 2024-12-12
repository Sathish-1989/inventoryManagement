import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmodifyComponent } from './productmodify.component';

describe('ProductmodifyComponent', () => {
  let component: ProductmodifyComponent;
  let fixture: ComponentFixture<ProductmodifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductmodifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductmodifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
