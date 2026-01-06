import { 
  Component, 
  Input, 
  ContentChildren, 
  QueryList, 
  AfterContentInit, 
  OnDestroy, 
  Output, 
  EventEmitter,
  OnChanges,
  SimpleChanges,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CarouselBreakpoint } from '../../models/carousel-breakpoint';

@Component({
  selector: 'app-custom-carousel',
  standalone: true,
  imports: [CommonModule,ButtonModule],
  templateUrl: './custom-carousel.component.html',
  styleUrl: './custom-carousel.component.css'
})
export class CustomCarouselComponent {
  @Input() numVisible: number = 1;
  @Input() numScroll: number = 1;
  @Input() autoplayInterval: number = 0; // 0 means no autoplay
  @Input() showIndicators: boolean = true;
  @Input() responsiveOptions: { [key: string]: CarouselBreakpoint } = {};

  @Output() onPageChange = new EventEmitter<{ page: number }>();

  @ContentChildren('carouselItem') items!: QueryList<any>;

  currentIndex = 0;
  currentPage = 0;
  translateX = 0;
  transition = 'transform 0.5s ease-in-out';
  totalPages = 0;
  loading = true;
  private autoplayTimer: any;
  private currentBreakpoint = 'default';

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterContentInit() {
    this.setupResponsiveBehavior();
    this.calculateDimensions();
    this.setupAutoplay();

    // Handle dynamic content changes
    this.items.changes.subscribe(() => {
      this.calculateDimensions();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['numVisible'] || changes['numScroll'] || changes['responsiveOptions']) {
      this.setupResponsiveBehavior();
      this.calculateDimensions();
    }

    if (changes['autoplayInterval']) {
      this.setupAutoplay();
    }
  }

  ngOnDestroy() {
    this.clearAutoplay();
  }

  private setupResponsiveBehavior() {
    if (isPlatformBrowser(this.platformId) && Object.keys(this.responsiveOptions).length > 0) {
      this.updateBreakpoint();
      window.addEventListener('resize', this.handleResize.bind(this));
    }
  }

  private handleResize() {
    this.updateBreakpoint();
    this.calculateDimensions();
  }

  private updateBreakpoint() {
    if (!isPlatformBrowser(this.platformId)) return;

    const width = window.innerWidth;
    let newBreakpoint = 'default';

    // Find the appropriate breakpoint
    const breakpoints = Object.keys(this.responsiveOptions)
      .map(key => ({ key, minWidth: this.getMinWidth(key) }))
      .sort((a, b) => b.minWidth - a.minWidth);

    for (const bp of breakpoints) {
      if (width >= bp.minWidth) {
        newBreakpoint = bp.key;
        break;
      }
    }

    if (newBreakpoint !== this.currentBreakpoint) {
      this.currentBreakpoint = newBreakpoint;
      const breakpointConfig = this.responsiveOptions[newBreakpoint];
      if (breakpointConfig) {
        this.numVisible = breakpointConfig.numVisible;
        this.numScroll = breakpointConfig.numScroll;
      }
    }
  }

  private getMinWidth(breakpoint: string): number {
    switch (breakpoint) {
      case 'sm': return 576;
      case 'md': return 768;
      case 'lg': return 992;
      case 'xl': return 1200;
      case 'xxl': return 1400;
      default: return 0;
    }
  }

  private calculateDimensions() {
    if (!this.items || this.items.length === 0) {
      this.loading = true;
      return;
    }

    this.loading = false;
    
    // Set item widths based on numVisible
    const itemWidth = 100 / this.numVisible;
    this.items.forEach(item => {
      if (item.nativeElement) {
        item.nativeElement.style.flex = `0 0 ${itemWidth}%`;
      }
    });

    this.totalPages = Math.ceil(this.items.length / this.numVisible);
    this.updatePosition();
  }

  private updatePosition() {
    this.translateX = -(this.currentIndex * (100 / this.numVisible));
    this.currentPage = Math.floor(this.currentIndex / this.numScroll);
    this.onPageChange.emit({ page: this.currentPage });
  }

  next() {
    if (this.currentIndex + this.numScroll >= this.items.length) {
      this.currentIndex = 0; // Loop back to start
    } else {
      this.currentIndex += this.numScroll;
    }
    this.updatePosition();
    this.resetAutoplay();
  }

  prev() {
    if (this.currentIndex - this.numScroll < 0) {
      // Loop to end
      this.currentIndex = Math.max(0, this.items.length - this.numVisible);
    } else {
      this.currentIndex -= this.numScroll;
    }
    this.updatePosition();
    this.resetAutoplay();
  }

  goToPage(page: number) {
    this.currentIndex = page * this.numScroll;
    this.updatePosition();
    this.resetAutoplay();
  }

  get indicators(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i);
  }

  private setupAutoplay() {
    this.clearAutoplay();
    
    if (this.autoplayInterval > 0 && isPlatformBrowser(this.platformId)) {
      this.autoplayTimer = setInterval(() => {
        this.next();
      }, this.autoplayInterval);
    }
  }

  private clearAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  private resetAutoplay() {
    if (this.autoplayInterval > 0) {
      this.clearAutoplay();
      this.setupAutoplay();
    }
  }
}
