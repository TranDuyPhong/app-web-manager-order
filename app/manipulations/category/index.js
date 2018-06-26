import constantsCategory from '../../constant/category';

function getAllCategories() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: constantsCategory.GET_ALL_CATEGORIES,
            type: 'GET',
            dataType: 'json',
            success: result => {
                if(result.status === 200 && result.res && result.res !== null) {
                    resolve(result.res);
                } else {
                    resolve(null);
                }
            }
        })
    });
}

export default {
    getAllCategories: getAllCategories
}