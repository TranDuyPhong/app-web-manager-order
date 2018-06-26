let foods = {
    init: () => {
        $(document).ready(() => {
            foods.methods.hideContextMenu(); 
            foods.events();
        });
    },
    variables: {
        flagTab: false,
        flagShowListFilterPrice: false
    },
    methods: {
        hideContextMenu: () => {
            document.oncontextmenu = function() {
                return false;
            }
        },
        aniTab: sender => {
            if(foods.variables.flagTab === false) {
                const tab = $(sender).data('tab');
                if(tab != undefined) {
                    const checkExsistContainer = $(`div.wr-list-food-item[data-tab="${tab}"]`);
                    if(checkExsistContainer.length > 0) {
                        const checkContainerActive = $('div.wr-list-food-item.container-food-active');
                        if(checkContainerActive.length > 0) {
                            const checkActive = $(checkExsistContainer).hasClass('container-food-active');
                            if(checkActive === false) {
                                foods.variables.flagTab = true;
                                $('h3.title-tab').removeClass('title-tab-active');
                                $(sender).addClass('title-tab-active');
                                $(checkContainerActive).animate({
                                    left: '-100%'
                                }, 1000, 'swing', () => {
                                    $(checkContainerActive).removeClass('container-food-active');
                                    $(checkContainerActive).css('left', '100%');
                                });
                                $(checkExsistContainer).animate({
                                    left: '0%'
                                }, 1000, 'swing', () => {
                                    $(checkExsistContainer).addClass('container-food-active');
                                    foods.variables.flagTab = false;
                                })
                            } else {

                            }
                        }
                    }
                }
            }
        },
        showListFilterPrice: sender => {
            if(foods.variables.flagShowListFilterPrice === false) {
                $(sender).addClass('toggle-show-list-filter-price');
            } else {
                $(sender).removeClass('toggle-show-list-filter-price');
            }
            foods.variables.flagShowListFilterPrice = !foods.variables.flagShowListFilterPrice;
        },
        choseFilterPrice: sender => {
            const text = $(sender).children('p').text();
            $('h3.filter-price').children('span').html(text);
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
        $('h3.title-tab').click(function() {
            foods.methods.aniTab(this);
        });
        $('h3.filter-price').click(function() {
            foods.methods.showListFilterPrice(this);
        });
        $('h3.filter-price ul li').click(function() {
            foods.methods.choseFilterPrice(this);
        });
        $('form input').focusin(function() {
            foods.methods.activeInput(this);
        });
        $('form input').focusout(function() {
            foods.methods.inActiveInput(this);
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

module.exports = foods;