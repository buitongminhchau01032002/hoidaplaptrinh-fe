import moment from 'moment';

function colorizeCategory(category) {
    if (!category?.createdAt) {
        return 'hsl(' + 0 + ',' + 65 + '%,' + 60 + '%)';
    }
    const second = moment(category.createdAt).seconds();
    return 'hsl(' + 6 * second + ',' + 65 + '%,' + 60 + '%)';
}

export default colorizeCategory;
