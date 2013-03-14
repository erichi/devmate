(function ($, win) {
    var $loginModal = $('#login-modal'),
        $authSteps = $loginModal.find('.auth-step'),
        $authForm = $('#auth-form').find('form'),
        $forgotForm = $('#auth-forgot-pswd').find('form'),
        $regForm = $('#register-modal').find('form');

    function submitForm($form) {
        if ($form.parsley('isValid')) {
            $.ajax({
                url: $form.attr('action'),
                type: 'post',
                data: $form.serialize()
            }).done(function() {
                    console.log('Here must be redirect');
                });
        } else {
            toggleButtonState($form, false);
        }
    }

    function toggleButtonState($form, enableBtn) {
        var $btn = $form.find('input[type="submit"]'),
            errText;

        $btn.attr('disabled', !enableBtn);
            //.next('.error').html('Введите ' + errText).toggle(disableBtn);
    }

    // Auth form validation
    $authForm.on('submit',function (e) {
        e.preventDefault();
        submitForm($(this));
    }).find('[data-required]').on('keyup', function () {
            var enableBtn = true;

            $authForm.find('[data-required]').each(function(i, field) {
                var $field = $(field),
                    $pField = $field.parsley();

                if (!$field.val() || $pField.validatedOnce) {
                    enableBtn = false;
                    return false;
                }
            });

            toggleButtonState($authForm, enableBtn);
        });

    // Parsley - form validation plugin

    win.ParsleyConfig = $.extend( true, {}, win.ParsleyConfig, {
        messages: {
            defaultMessage: "Поле заполнено некорректно.",
            type: {
                email: "Поле должно быть адресом электронной почты.",
                url: "Поле должно быть ссылкой на сайт.",
                urlstrict: "Поле должно быть ссылкой на сайт.",
                number: "Поле должно быть числом.",
                digits: "Поле должно содержать только цифры.",
                dateIso: "Поле должно быть датой в формате (ГГГГ-ММ-ДД).",
                alphanum: "Поле должно содержать только  цифры и буквы"
            },
            notnull: "Поле должно быть не нулевым.",
            notblank: "Поле не должно быть пустым.",
            required: "Поле обязательно для заполнения.",
            regexp: "Поле заполнено некорректно.",
            min: "Значение поля должно быть больше %s.",
            max: "Значение поля должно быть меньше %s.",
            range: "Значение поля должно быть между %s и %s.",
            minlength: "В поле должно быть минимум %s символов(а).",
            maxlength: "В поле должно быть не больше %s символов(а).",
            rangelength: "В поле должно быть от %s до %s символов(а).",
            mincheck: "Необходимо выбрать не менее %s пунктов(а).",
            maxcheck: "Необходимо выбрать не более %s пунктов(а).",
            rangecheck: "Необходимо выбрать от %s до %s пунктов.",
            equalto: "Значения полей должны быть одинаковыми."
        }
    });

    // Reset modal steps state
    $loginModal.on('show', function () {
        $authSteps.hide().eq(0).show();
        $authForm.removeClass('submitted').get(0).reset();
        //$authForm.find('input[type="submit"]').attr('disabled', true);
    });

    // Handle modal auth steps
    $('.change-auth-step').on('click', function(e) {
        e.preventDefault();

        var $step = $($(this).attr('href'));

        $authSteps.hide();
        $step.show();
    });

    // Auth form validation
    /*$authForm.on('submit', function(e) {
        e.preventDefault();
        validateForm($(this));
    }).find(':required').on('change', function() {
            updateValidationMessage(this);
        }).on('keyup', function() {
                updateButtonState($authForm);
            });*/

    // Forgot password form validation
    $forgotForm.on('submit', function(e) {
        e.preventDefault();
        validateForm($(this));
    }).find(':required').on('change', function() {
            updateValidationMessage(this);
        }).on('keyup', function() {
            updateButtonState($forgotForm);
        });

    // Registration form validation
    $regForm.on('submit', function(e) {
        e.preventDefault();
        validateForm($(this));
    }).find(':required').on('change', function() {
            updateValidationMessage(this);
        }).on('keyup', function() {
            updateButtonState($regForm);
        });
}(jQuery, window));