import { SliderModule } from 'primeng/slider';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [CommonModule, SliderModule,FormsModule],
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.css',
})
export class PriceFilterComponent {
  rangeValues: number[] = [0, 60];
}
