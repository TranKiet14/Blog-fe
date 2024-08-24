import moment from 'moment';
export const formatDateTime = (time: Date) => {
    return moment(time).format("DD/MM/YYYY HH:mm:ss")
}

export const formatDate = (time: Date) => {
    return moment(time).format("DD/MM/YYYY")
}

export const formatTime = (time: Date) => {
    return moment(time).format("HH:mm:ss")
}