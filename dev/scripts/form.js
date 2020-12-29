$(".form").submit(e => {
    e.preventDefault();


    const form = $(e.currentTarget);
    const firstName = form.find("[name='firstName']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $("#modal");
    const content = modal.find(".modal__content");

    modal.removeClass("modal--error");

    [firstName, phone, comment, to].forEach(field => {
        field.removeClass("form__entry--error");
        if (field.val().trim() == "") {
            field.addClass("form__entry--error");
        }
    })

    const errorField = form.find(".form__entry--error");

    if (errorField.length == 0) {
        $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: firstName.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val(),
            },
            success: data => {
                content.text(data.message)
                $.fancybox.open({
                    src: "#modal",
                    type: "inline"
                })
                $('#form')[0].reset();
            },
            error: data => {
                content.text(data.responseJSON.message);
                $.fancybox.open({
                    src: "#modal",
                    type: "inline"
                })
                modal.addClass("modal--error");
            }
        });
    }
})

$(".btn-modal-close").click(e => {
    e.preventDefault();
    $.fancybox.close();
})