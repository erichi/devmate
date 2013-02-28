(function ($) {
    var $loginModal = $('#login-modal'),
        $authSteps = $loginModal.find('.auth-step');

    $loginModal.on('show', function () {
        $authSteps.hide().eq(0).show();
    });

    // Handle modal auth steps
    $('.change-auth-step').on('click', function(e) {
        e.preventDefault();

        var $step = $($(this).attr('href'));

        $authSteps.hide();
        $step.show();
    })
}(jQuery));