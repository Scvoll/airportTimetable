const osmosis = require('osmosis');


const grabData = function (type) {
    return new Promise((resolve => {
        osmosis
            .get(`https://avia.tutu.ru/airport/0eadeb/timetable/${type}/`)
            .set({'Title': 'tbody'})
            .data((listing) => (resolve(listing['Title']
                .replace(/\r?\t/g, "")
                .split(/\r?\n+/))));
    }));
};

function normalizeData(list) {
    let start = 1;
    let end = 7;
    let arrivalList = [];
    let id = 0;
    while (end < list.length + 2) {
        let middle = list.slice(start,end);
        let mas = {
            id: ++id,
            number: middle[0],
            city: middle[1],
            planTime: middle[2],
            status: middle[3],
            terminal: middle[4],
        };
        arrivalList.push(mas);
        start += 5;
        end += 5;
    }
    return arrivalList;
}

module.exports.grabData = grabData;
module.exports.normalize = normalizeData;