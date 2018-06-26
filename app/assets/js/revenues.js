const revenues = {
    init: function() {
        $(document).ready(function() {
            revenues.methods.hideContextMenu(); 
            revenues.events();
        });
    },
    variables: {

    },
    methods: {
        hideContextMenu: () => {
            document.oncontextmenu = function() {
                return false;
            }
        },
        activeInput: sender => {
            const name = $(sender).attr('name');
            $(`p.${name}`).addClass('input-active');
        },
        inActiveInput: sender => {
            const name = $(sender).attr('name');
            $(`p.${name}`).removeClass('input-active');
        }
    },
    events: function () {
        $('form input').focusin(function() {
            revenues.methods.activeInput(this);
        });
        $('form input').focusout(function() {
            revenues.methods.inActiveInput(this);
        });
        $('a.manipulation-change-password').click(e => {
            e.preventDefault();
            $('div.wr-container-change-password').addClass('toggle-show-form-change-password');
            let focusInputTimeout = setTimeout(() => {
                $('input[name="password-old"]').focus();
                clearTimeout(focusInputTimeout);
            }, 100);
        });
        $('a.close-container-change-password').click(e => {
            e.preventDefault();
            $('div.wr-container-change-password').removeClass('toggle-show-form-change-password');
            $('p.message-change-password').text('');
        });
    }
}

module.exports = revenues;