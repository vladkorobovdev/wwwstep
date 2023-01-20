(function () {   // Самовызывающаяся функция, которая отрабатает сразу же, как распарсится js-документ
    const header = document.querySelector(".header"); // Метод возвращает первый найденный элемент с селектором, который был передан в скобках
    window.onscroll = () => { // Метод исопльзуется при скроллинге страницы
        if (window.pageYOffset > 50) { // Метод возвращает расстояние, на которое мы скроллим относительно верхней точки страницы
            header.classList.add("header_active"); // Добавляется класс
        } else {
            header.classList.remove("header_active"); // Удаляется класс
        }
    };
}());

// Burger handler

(function () {
    const burgerItem = document.querySelector(".burger");
    const menu = document.querySelector(".header__nav");

    burgerItem.addEventListener("click", () => {   // Метод подвешивает на элемент обработчик события
        menu.classList.add("header__nav_active");
    }); 

    const menuCloseItem = document.querySelector(".header__nav-close");

    menuCloseItem.addEventListener("click", () => {
        menu.classList.remove("header__nav_active");
    });

    const menuLinks = document.querySelectorAll(".header__link");

    if (window.innerWidth <= 767) {
        for (let i = 0; i < menuLinks.length; i++) {
            menuLinks[i].addEventListener("click", () => {
                menu.classList.remove("header__nav_active");
            });
        }
    }
}());



// Scrolls to anchors

(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight = document.querySelector(".header").clientHeight; 
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;

        const ease = function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = function(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll(".js-scroll");
        links.forEach(each => {
            each.addEventListener("click", function () {
                const currentTarget = this.getAttribute("href");
                smoothScroll(currentTarget, 1000);
            });
        });
    };

    scrollTo();
}());

