let index = {
    init: () => {
        $(document).ready(() => {
            index.methods.hideContextMenu(); 
            index.events();
        });
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
    events: () => {
        $('div.wr-container-change-password, div.wr-container-order-table, div.wr-order input').focusin(function() {
            index.methods.activeInput(this);
        });
        $('div.wr-container-change-password, div.wr-container-order-table, div.wr-order input').focusout(function() {
            index.methods.inActiveInput(this);
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
            $('div.wr-container-change-password input[name="password-old"]').val('');
            $('div.wr-container-change-password input[name="password-new"]').val('');
            $('div.wr-container-change-password input[name="re-password-new"]').val('');
            $('p.message-change-password').text('');
        });
        $('a.close-container-order-table').click(e => {
            e.preventDefault();
            $('div.wr-container-order-table').removeClass('toggle-show-form-order-table');
            $('div.wr-container-order-table input[name="order-name"]').val('');
            $('div.wr-container-order-table input[name="phone-order"]').val('');
            $('div.wr-container-order-table input[name="cmnd-order"]').val('');
            $('div.wr-container-order-table input[name="count-people-come-in"]').val('');
            $('div.wr-container-order-table input[name="time-come-in"]').val('');
            $('p.message-order-table').text('');
        });
        $('a.close-container-order').click(e => {
            e.preventDefault();
            $('div.wr-container-order').removeClass('toggle-show-order');
        });
    }
}

module.exports = index;