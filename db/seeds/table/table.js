const tableSchema = require('../../models/table/table');

for(let i = 1; i <= 18; i++) {
    let table = new tableSchema({
        name: `Bàn ${i}`,
        countTable: 4,
        countPeople: 0,
        status: 0
    });
    
    table.save(err => {
        if(err) {
            console.log(err);
        } else {
            console.log(`${Date.now()} Table ${i} generated`);
        }
    });
}

// const table_19 = new tableSchema({
//     name: 'Bàn 19',
//     countTable: 4,
//     countPeople: 2,
//     status: 1
// });

// table_19.save(err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`${Date.now()} Table 19 generated`);
//     }
// });

// const table_20 = new tableSchema({
//     name: 'Bàn 20',
//     countTable: 4,
//     countPeople: 0,
//     status: 2
// });

// table_20.save(err => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(`${Date.now()} Table 20 generated`);
//     }
// });
