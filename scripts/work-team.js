
const openItem = item => {
    const container = item.closest(".work-team__item");
    const contentBlock = container.find(".work-team__desc-block");
    const textBlock = contentBlock.find(".work-team__desc");
    const reqHeight = textBlock.height();

    container.addClass("work-team__item--active")
    contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
    const items = container.find(".work-team__desc-block");
    const itemContainer = container.find(".work-team__item");

    itemContainer.removeClass("work-team__item--active");
    items.height(0);
}

$('.work-team__name-btn').click(e => {
    const $this = $(e.currentTarget);
    const container = $this.closest(".work-team__list");
    const elemContainer = $this.closest(".work-team__item");

    if (elemContainer.hasClass("work-team__item--active")) {
        closeEveryItem(container);
    } else {
        closeEveryItem(container);
        openItem($this);
    }
})