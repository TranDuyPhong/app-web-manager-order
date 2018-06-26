const login = {
    init: () => {
        $(document).ready(() => {
            login.events();
        })
    },
    methods: {
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
        $('form input').focusin(function() {
            login.methods.activeInput(this);
        });
        $('form input').focusout(function() {
            login.methods.inActiveInput(this);
        });
    }
}
login.init();