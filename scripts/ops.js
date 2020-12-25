const sections = $(".section");
const display = $(".maincontent");
const fixedMenu = $(".fixed-menu");
const menuItems = fixedMenu.find(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("section--active");

function countSectionPosition(sectionEq) {
    return sectionEq * -100;
}

const changeMenuThemeForSection = (sectionEq) => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-fixed-menu");
    const activeClass = "fixed-menu--black"

    if (menuTheme == "black") {
        fixedMenu.addClass(activeClass);
    } else {
        fixedMenu.removeClass(activeClass);
    }
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

function performTransition(sectionEq) {
    if (inScroll) return

    inScroll = true;

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

    display.css({
        transform: `translateY(${position}%)`,
    });

    resetActiveClassForItem(sections, sectionEq, "section--active");
    resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");

    setTimeout(() => {
        inScroll = false;
    }, 500);
}

function viewportScroller() {
    const activeSection = sections.filter(".section--active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
        next() {
            if (nextSection.length) {
                performTransition(nextSection.index());
            }
        },
        prev() {
            if (prevSection.length) {
                performTransition(prevSection.index());
            }
        },
    };
};

$(window).on("wheel", (e) => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();

    if (deltaY > 0) {
        scroller.next();
    }

    if (deltaY < 0) {
        scroller.prev();
    }
});

$(window).on("keydown", e => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypeingInInputs = tagName == "input" || tagName == "textarea";
    const scroller = viewportScroller();

    if (userTypeingInInputs) return;

    switch (e.keyCode) {
        case 38:
            scroller.prev();
            break;

        case 40:
            scroller.next();
            break;
    }
})

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    performTransition(reqSection.index());
})

if (isMobile) {
    $(".body").swipe({
        swipe: function (event, direction) {
            const scroller = viewportScroller();
            let scrollDirection = "";

            if(direction == "up") scrollDirection = "next";
            if(direction == "down") scrollDirection = "prev";

            scroller[scrollDirection]();
        },
    });
}
