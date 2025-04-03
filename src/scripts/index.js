import gsap from "gsap";
import SplitType from "split-type";
import { ImageRepetition } from "./ImageRepetition";


window.addEventListener('load', () => {
    const title1 = document.querySelector('.title1');
    const title2 = document.querySelector('.title2');
    const card = document.querySelector('.card');
    const imagen = document.querySelector('.imagen');
    const cardImage = document.querySelector('.card__image');
    const splitTitle1 = new SplitType(title1);
    const splitTitle2 = new SplitType(title2);

    new ImageRepetition(imagen);

    const tl = gsap.timeline();

    tl
        .from(splitTitle1.chars, {
            duration: 3,
            yPercent: -100,
            stagger: {
                each: 0.4,
                from: 'start',
            },
            // ease: 'sine.in'
        })
        .from(splitTitle2.chars, {
            duration: 3,
            yPercent: 100,
            stagger: {
                each: 0.4,
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
        }, '<')
        .from(cardImage, {
            duration: 1.3,
            scale: 1.3,
            transformOrigin: '95% 50%',
        }, '>-=0.9')

});