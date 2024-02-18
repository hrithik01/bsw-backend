import ObjectsToCsv from 'objects-to-csv';

export async function convertToCSV(jsonData, title) {
    const modifiedData = jsonData.map(obj => {
        const newObj = { ...obj };
        for (const key in newObj) {
            if (typeof newObj[key] === 'boolean' || key === 'transaction_id') {
                delete newObj[key];
            } else if (key === 'created_at') {
                newObj[key] = newObj[key].toString();
                newObj[key] = newObj[key].split('GMT')[0];
            }
        }
        return newObj;
    });

    const csv = new ObjectsToCsv(modifiedData);
    await csv.toDisk(`./${title}.csv`);
    return csv;
}