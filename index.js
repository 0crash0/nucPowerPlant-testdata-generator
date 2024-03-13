import express from "express"
import cors from 'cors'
import NuclearPlant from './reactor.js'

//docker env configuring
const cfg = {
    port: process.env.NODE_PORT || 3001,
    url_prefix: process.env.URL_PREFIX || '/datagen/opc-server-3dpr'
};


const app= express();
app.use(cors());

app.get("/", function(request, response){

    response.send("<h1>Главная страница</h1>");
});

app.get('/set_rods_pos/:id', (req, res) => {
    res.send("GotIT");
    nuclear_plant.set_rods_pos(req.params.id);
});
app.get('/set_ppump_rate/:id', (req, res) => {
    res.send("GotIT");
    nuclear_plant.set_Ppump_rate(req.params.id);
});
app.get('/set_spump_rate/:id', (req, res) => {
    res.send("GotIT");
    nuclear_plant.set_Spump_rate(req.params.id);
});
app.get('/getdatajson', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify({
        'core_temp': nuclear_plant.core_temp,
        'core_rods_pos': nuclear_plant.core_rods_pos,
        'Prim_Cool_pump_rate': nuclear_plant.Prim_Cool_pump_rate,
        'Heat_EXCH_water_temp': nuclear_plant.Heat_EXCH_water_temp,
        'Prim_Cool_reserv_pump':nuclear_plant.Prim_Cool_reserv_pump,
        'Prim_Cool_pressure_release':nuclear_plant.Prim_Cool_pressure_release,
        'Sec_Cool_pump_rate':nuclear_plant.Sec_Cool_pump_rate,
        'Sec_Cool_reserv_pump':nuclear_plant.Sec_Cool_reserv_pump,
        'Sec_Cool_pressure_release':nuclear_plant.Sec_Cool_pressure_release,
        'Steam_Condencer_water_temp':nuclear_plant.Steam_Condencer_water_temp,
        'ACP_Cool_pump_rate': nuclear_plant.ACP_Cool_pump_rate,
        'Cooling_Tower_water_temp':nuclear_plant.Cooling_Tower_water_temp
    }));

});

let nuclear_plant = new NuclearPlant();

nuclear_plant.start_reactor()
/*
setInterval(()=>{nuclear_plant.core_rods_pos+=5},20000)
setInterval(()=>{nuclear_plant.Prim_Cool_pump_rate+=5},20000)
*/

app.listen(cfg.port, () => {
    console.log('Example app listening with prefix '+cfg.url_prefix+' on port:'+cfg.port)
})
/*
app.use(
    cfg.url_prefix+'/css',
    express.static(path.resolve(__dirname,"css"))
);
app.use(
    cfg.url_prefix+'/js',
    express.static(path.resolve(__dirname,"js"))
);

app.get(cfg.url_prefix+'/', (req, res) => {
    //res.send("GO to <a href='/datagen/opc-server-3dpr/'>new url</a>")
    res.sendFile('index.html',{ root: __dirname });
})

app.get(cfg.url_prefix+'/stop', (req, res) => {
    res.send("<a href='/datagen/opc-server-3dpr/start'>start</button>" +
        "<a href='/datagen/opc-server-3dpr/getdatajson'>Get Data</a>")
    my3dprinter.stop_machine();
})
app.get(cfg.url_prefix+'/start', (req, res) => {
    res.send("<a href='/datagen/opc-server-3dpr/stop'>stop</a>" +
        "<a href='/datagen/opc-server-3dpr/getdatajson'>Get Data</a>")
    my3dprinter.start_homing();
})*/
