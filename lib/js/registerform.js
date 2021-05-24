const URL = 'https://script.google.com/macros/s/AKfycbz2otVIa4qxiCfDa97cmFIXKsSyjHno8zGWNth4bFJIbfFxLw-S9wsRdDY6jtuBrch0Zw/exec';
const GET = "GET";

const ID_REGISTER = 'subscription-form';
var $registerForm = $('form#' + ID_REGISTER);

$(document).ready(function () {
    jQuery(function ($) {
        $registerForm.submit(function (e) {
            var form = $(this)
            e.preventDefault();
            enableButton(form, false)
            submitAjax($(this), function (response) {
                enableButton(form, true)
                if (response.result == "error") {
                    alert("Something went wrong! : " + response.error)
                } else {
                    form.addClass('right');
                    form.find('input').val('OK!');
                    setTimeout(function () {
                        if ($('form.notify').hasClass('form-open')) {
                            $('form.notify').removeClass('form-open');
                            $('form.notify').addClass('form-close');
                            $('form.notify').trigger('reset');
                            $('form.notify').removeClass('wrong');
                            $('form.notify').removeClass('right');
                        };
                        $('form.notify input, form.notify button').removeClass('show-link');
                        $('form.notify input, form.notify button').addClass('hide-link');
                        $('form.notify label').removeClass('hide-link');
                        $('form.notify label').addClass('show-link');
                    }, 1500);
                    //$('#thankYouPopup').modal("show");
                    console.log("Form submitted successfully")
                }
            })
        })

        // $('#thankYouPopup').on('hidden.bs.modal', function () {
        //     // Redirect to root
        //     // window.location = '/';
        // });
    })
})

function enableButton(form, enable) {
    if (enable) {
        form.find('#submit-form').attr("disabled", false);
        form.find('.spinner-border').removeClass('loading');
        form.find('.gl-send').removeClass('loading');

    } else {
        form.find('#submit-form').attr("disabled", true);
        form.find('.spinner-border').addClass('loading');
        form.find('.gl-send').addClass('loading');
    }
}

// Append Form Id to every submit requests
function submitAjax(e, successFunc) {
    var id = e.attr('id');
    var data = e.serialize();

    $.ajax({
        method: GET,
        url: URL,
        data: data + '&id=' + id,
        success: successFunc,
        error: function (xhr, status, errorThrown) {
            alert("Error: " + xhr.responseText);
            console.log("Request Status: " + xhr.statusText);
            console.log("Status: " + status);
            console.log("Error: " + errorThrown);
        }
    })
}