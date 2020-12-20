$(".form").submit((e) => {
    e.preventDefault();


    const form = $(e.currentTarget);
    const firstName = form.find("[name='firstName']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $("#modal");
    const buttonClose = modal.find(".btn-modal-close");

    [firstName, phone, comment, to].forEach(field => {
        field.removeClass("form__entry--error");
        if (field.val().trim() == "") {
            field.addClass("form__entry--error");
        }
    })

    modal.removeClass("modal--error");
    modal.removeClass("modal--active");

    const errorField = form.find(".form__entry--error");

    if (errorField.length == 0) {
        $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                firstName: firstName.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val(),
            },
            // success: () => {
            //     modal.addClass("modal--active")
            // },
            // error: () => {
            //     modal.addClass("modal--error");
            // }
        });
    }

})