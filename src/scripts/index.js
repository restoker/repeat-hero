import gsap from "gsap";
import SplitType from "split-type";


window.addEventListener('load', () => {
    const title1 = document.querySelector('.title1');
    const title2 = document.querySelector('.title2');
    const card = document.querySelector('.card');
    const splitTitle1 = new SplitType(title1);
    const splitTitle2 = new SplitType(title2);


    const tl = gsap.timeline();

    tl
        .from(splitTitle1.chars, {
            yPercent: -100,
            stagger: {
                each: 0.2,
                from: 'start',
            },
            // ease: 'back.out'
        })
        .from(splitTitle2.chars, {
            yPercent: 100,
            stagger: {
                each: 0.2,
                from: 'end',
            },
            // ease: 'back.out'
        }, '<')
        .from(card, {
            scale: 0,
            duration: 1.9,
            transformOrigin: 'top right',
            ease: 'power2.inOut'
        }, '<')

});