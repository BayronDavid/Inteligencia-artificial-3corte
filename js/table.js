import initial_data from '../data/BN_data.json' assert {type: 'json'} 

const data =[];

initial_data.forEach(item =>{
    data.push([item.input.r, item.input.r, item.input.b, item.output.class])
})

export const grid = new gridjs.Grid({
    columns: ["R", "G", "B", 'Class'],
    data,
    resizable: true,
    width : '100'
});

