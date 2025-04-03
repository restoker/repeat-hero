import gsap from "gsap";
import SplitType from "split-type";
import { ImageRepetition } from "./ImageRepetition";


window.addEventListener('load', () => {
    const title1 = document.querySelector('.title1');
    const title2 = document.querySelector('.title2');
    const card = document.querySelector('.card');
    const imagen = document.querySelector('.imagen');
    const splitTitle1 = new SplitType(title1);
    const splitTitle2 = new SplitType(title2);

    new ImageRepetition(imagen);

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
            duration: 3.1,
            transformOrigin: 'top right',
            ease: 'power2.inOut',
            delay: 0.2,
            transform: 'translate(10px)'
        }, '<');

});