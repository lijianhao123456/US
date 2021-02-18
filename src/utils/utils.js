import moment from 'moment';

export function removePrefix(content = '', flag = ':') {
    return content.substr(content.indexOf(flag) + 1);
}
export function getDistanceFromNow(date, type) {
    moment.locale('zh-cn');
    const m = moment(date);
    return m.startOf(type).fromNow();
}