import moment from 'moment';

function colorizeCategory(category) {
    if (!category?.created_at) {
        return 'hsl(' + 0 + ',' + 65 + '%,' + 60 + '%)';
    }
    const second = moment(category.createdAt).seconds();
    return 'hsl(' + 6 * Math.floor(Math.random() * 60) + ',' + 65 + '%,' + 90 + '%)';
}

export default colorizeCategory;
