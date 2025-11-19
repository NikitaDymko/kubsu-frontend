class Gallery {
    constructor() {
        this.currentSlide = 0;
        this.slidesContainer = document.querySelector('.slides-container');
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.querySelector('.arrow.prev');
        this.nextBtn = document.querySelector('.arrow.next');
        this.currentPageEl = document.querySelector('.current-page');
        this.totalPagesEl = document.querySelector('.total-pages');
        
        this.slidesPerView = this.getSlidesPerView();
        this.totalPages = Math.ceil(this.slides.length / this.slidesPerView);
        
        this.init();
    }
    
    getSlidesPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    
    init() {
        this.totalPagesEl.textContent = this.totalPages;
        this.updatePager();
        
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        window.addEventListener('resize', () => this.handleResize());
    }
    
    handleResize() {
        this.slidesPerView = this.getSlidesPerView();
        this.totalPages = Math.ceil(this.slides.length / this.slidesPerView);
        this.totalPagesEl.textContent = this.totalPages;
        this.currentSlide = 0;
        this.updatePager();
        this.scrollToSlide(0);
    }
    
    prev() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.scrollToSlide(this.currentSlide);
            this.updatePager();
        }
    }
    
    next() {
        if (this.currentSlide < this.totalPages - 1) {
            this.currentSlide++;
            this.scrollToSlide(this.currentSlide);
            this.updatePager();
        }
    }
    
    scrollToSlide(slideIndex) {
        const slideWidth = this.slides[0].offsetWidth;
        const scrollPosition = slideIndex * slideWidth * this.slidesPerView;
        this.slidesContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
    updatePager() {
        this.currentPageEl.textContent = this.currentSlide + 1;
    }
}

// Инициализация галереи после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new Gallery();
});