export async function dateToTimestamp(transaction_date) {
    const [day, month, year] = transaction_date.split('-');
    const date = new Date(year, month - 1, day);
    date.setHours(9, 0, 0, 0);
    const today = new Date();
    today.setHours(9, 0, 0, 0);
    const created_at = date.getTime() === today.getTime() ? new Date() : date;
    const now = new Date();
    if (created_at > now) {
        throw new Error('Transaction date cannot be in the future');
    }
    return created_at;
}

export async function convertRelTimeToTimestamp(rel_time) {
    let fromDate;
    const toDate = new Date();

    switch (rel_time) {
        case 'last-24-hours':
            fromDate = new Date();
            fromDate.setDate(toDate.getDate() - 1);
            break;
        case 'last-7-days':
            fromDate = new Date();
            fromDate.setDate(toDate.getDate() - 7);
            break;
        case 'last-30-days':
            fromDate = new Date();
            fromDate.setDate(toDate.getDate() - 30);
            break;
        case 'last-90-days':
            fromDate = new Date();
            fromDate.setDate(toDate.getDate() - 90);
            break;
        case 'last-365-days':
            fromDate = new Date();
            fromDate.setDate(toDate.getDate() - 365);
            break;
        default:
            return  { statusCode: 400, message: "Invalid rel_time" }
    }
    return { fromDate, toDate }
}
