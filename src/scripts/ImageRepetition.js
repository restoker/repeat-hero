import gsap from "gsap";

export class ImageRepetition {
    // DOM elements
    DOM = {
        // main element (.image)
        el: null,
        // .image__element
        innerElems: null,
    }
    // Background image path
    bgImage;
    // Total inner image elments
    totalInnerElems;
    // Hover timeline
    hoverTimeline;

    /**
     * Constructor.
     * @param {Element} DOM_el - the .image element
     */
    constructor(DOM_el) {
        this.DOM = { el: DOM_el };
        // console.log(this.DOM.el);
        // Get bg image url
        // this.bgImage = /(?:\(['"]?)(.*?)(?:['"]?\))/.exec(this.DOM.el.style.backgroundImage)[1];
        // this.bgImage = /(?:\(['"]?)(.*?)(?:['"]?\))/.exec(this.DOM.el.style.backgroundImage)[1];
        this.bgImage = this.DOM.el.dataset.image;

        // Remove bg image
        gsap.set(this.DOM.el, { backgroundImage: 'none' });

        // Add the .image__element inner elements (data-repetition-elems times)
        // First inner element will have a wrapper with overflow hidden so it's image child can scale up or down
        this.totalInnerElems = +this.DOM.el.dataset.repetitionElems || 4;
        // Minimum of two inner elments
        this.totalInnerElems = this.totalInnerElems <= 1 ? 2 : this.totalInnerElems;

        let innerHTML = '';
        for (let i = 0, len = this.totalInnerElems || 1; i <= len - 1; ++i) {
            innerHTML += i === 0 ?
                `<div class="image__wrap"><div class="image__element" style="background-image:url(${this.bgImage})"></div></div>` :
                `<div class="image__element" style="background-image:url(${this.bgImage})"></div>`
        }
        // Append
        this.DOM.el.innerHTML = innerHTML;
        // Get inner .image__element
        this.DOM.innerElems = this.DOM.el.querySelectorAll('.image__element');
        // transform origin
        gsap.set([this.DOM.el, this.DOM.innerElems[0]], { transformOrigin: this.DOM.el.dataset.repetitionOrigin || '50% 50%' });
        // Hover timeline
        this.createHoverTimeline();
        this.initEvents();
    }
    /**
     * Create the gsap timeline for the hover in/out animation
     */
    createHoverTimeline() {
        const property = this.DOM.el.dataset.repetitionAnimate || 'scale';
        let animationProperties = {
            duration: this.DOM.el.dataset.repetitionDuration || 1.9,
            ease: this.DOM.el.dataset.repetitionEase || 'power2.inOut',
            stagger: this.DOM.el.dataset.repetitionStagger || -0.1,
            // scale: 1,
            // repeat: -1,
            opacity: 0
        }
        let firstInnerElementProperties = {};

        // animationProperties[property] = i => +!i;
        // initial scale of first inner element
        firstInnerElementProperties[property] = this.DOM.el.dataset.repetitionInitialScale || 2;

        // console.log(firstInnerElementProperties);
        this.hoverTimeline = gsap.timeline()
            .set(this.DOM.innerElems[0], firstInnerElementProperties)
            .from([this.DOM.innerElems], { scale: 0, stagger: 0.65, opacity: 0, duration: 2 }, 0)
    }

    /**
     * Initializes the events on the image elemment
     */
    initEvents() {
        this.onMouseEnterFn = () => this.mouseEnter();
        this.onMouseLeaveFn = () => this.mouseLeave();
        // this.DOM.el.addEventListener('mouseenter', this.onMouseEnterFn);
        // this.DOM.el.addEventListener('mouseleave', this.onMouseLeaveFn);
        this.mouseEnter()
        // this.onMouseEnterFn();
        // this.onMouseLeaveFn();
    }

    /**
     * mouse enter
     */
    mouseEnter() {
        this.hoverTimeline.play();
    }

    /**
     * mouse leave
     */
    mouseLeave() {
        this.hoverTimeline.reverse();
    }
}