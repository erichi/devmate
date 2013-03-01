(function ($) {
    var $loginModal = $('#login-modal'),
        $authSteps = $loginModal.find('.auth-step'),
        $authForm = $('#auth-form').find('form'),
        $forgotForm = $('#auth-forgot-pswd').find('form'),
        $regForm = $('#register-modal').find('form');

    function updateValidationMessage(field) {
        $(field).next('.error').html(field.validationMessage);
    }

    function validateForm($form) {
        var $required = $form.find(':required'),
            valid = $form.get(0).checkValidity();

        if (!valid) {
            $form.addClass('submitted');

            $required.each(function(i, field) {
                updateValidationMessage(field);
            });
        } else {
            // Post form data on validation success
            $.ajax({
                url: $form.attr('action'),
                type: 'post',
                data: $form.serialize()
            }).done(function() {
                    console.log('Here must be redirect');
                });
        }

        //updateButtonState($form, !valid);
    }

    function updateButtonState($form, state) {
        var data = $form.serializeArray(),
            $btn = $form.find('input[type="submit"]'),
            errText,
            disableBtn = false;

        /*if (typeof state !== 'undefined') {
            $btn.attr('disabled', state);

            return;
        }*/

        for (var i = 0; i < data.length; i++) {
            if (!data[i].value) {
                disableBtn = true;
                errText = data[i].name === 'email' ? 'e-mail' : 'пароль';
            }
        }

        $btn.attr('disabled', disableBtn)
            .next('.error').html('Введите ' + errText).toggle(disableBtn);
    }

    // Reset modal steps state
    $loginModal.on('show', function () {
        $authSteps.hide().eq(0).show();
        $authForm.removeClass('submitted').get(0).reset();
        $authForm.find('input[type="submit"]').attr('disabled', true);
    });

    // Handle modal auth steps
    $('.change-auth-step').on('click', function(e) {
        e.preventDefault();

        var $step = $($(this).attr('href'));

        $authSteps.hide();
        $step.show();
    });

    // Auth form validation
    $authForm.on('submit', function(e) {
        e.preventDefault();
        validateForm($(this));
    }).find(':required').on('change', function() {
            updateValidationMessage(this);
        }).on('keyup', function() {
                updateButtonState($authForm);
            });

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
}(jQuery));