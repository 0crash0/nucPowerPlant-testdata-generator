import './App.css';
import {Slider} from "@mui/material";
import Table from '@mui/material/Table';
import { HexGrid, Layout, Hexagon, GridGenerator } from 'react-hexgrid';
import axios from "axios";
import {useEffect, useState} from "react";

const JSONurl="http://localhost:3001/getdatajson";
const SET_RODS_url="http://localhost:3001/set_rods_pos";
const SET_Ppumprate_url="http://localhost:3001/set_ppump_rate";
const SET_Spumprate_url="http://localhost:3001/set_spump_rate";

const marks = [
    {        value: 0,        label: '0°C',
    },
    {        value: 20,         label: '20°C',
    },
    {        value: 37,        label: '37°C',
    },
    {        value: 100,        label: '100°C',
    },
];
function valuetext(value: number) {
    return `${value}°C`;
}

function App() {
    const hexagons = GridGenerator.hexagon(3);
    const [data,setData] = useState({"core_temp":247.5,"core_rods_pos":5,"Prim_Cool_pump_rate":0,"Heat_EXCH_water_temp":25,"Sec_Cool_pump_rate":0,"Steam_Condencer_water_temp":25});
    useEffect(() => {
         setInterval(() => {
        axios
            .get(JSONurl)
            .then((response) => response.data)
            .then((json) => {
                console.log('json', json);
                setData(json);

                console.log(json)
            })
            .catch((error) => {
                console.log(error);
            });
    },1000)}, []);
    const setRods = (event, newValue) => {
        axios
            .get(SET_RODS_url+'/'+newValue)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
    };
    const setPpumprate = (event, newValue) => {
        axios
            .get(SET_Ppumprate_url+'/'+newValue)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
    };
    const setSpumprate = (event, newValue) => {
        axios
            .get(SET_Spumprate_url+'/'+newValue)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
    };
  return (
    <div className="App">
        <Table class={'table-param'}>
            <tr>
                <td>param</td>
                <td>slider</td>
            </tr>
            <tr>
                <td>core_rods_pos</td>
                <td><Slider value={data.core_rods_pos} aria-label="Default" valueLabelDisplay="auto" onChange={setRods}/></td>
            </tr>
            <tr>
                <td>Prim_Cool_pump_rate</td>
                <td><Slider value={data.Prim_Cool_pump_rate} aria-label="Default" valueLabelDisplay="auto"
                            onChange={setPpumprate}/></td>


            </tr>
            <tr>
                <td>Sec_Cool_pump_rate</td>
                <td><Slider defaultValue={data.Sec_Cool_pump_rate} aria-label="Default" valueLabelDisplay="auto"
                            onChange={setSpumprate}/></td>
            </tr>
        </Table>
        <Table>
            <tr>
                <td>
                    <HexGrid width={500} height={500} fill={'red'} stroke={'black'} strokeWidth={'0.25'}>
                        <Layout size={{ x: 7, y: 7 }}>
                            { hexagons.map((hex, i) => <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} />) }
                        </Layout>
                    </HexGrid>
                </td>
                <td>
                    <Table class={'table-param'}>
                        <tr>
                            <td>core_temp</td>
                            <td>{data.core_temp}</td>
                        </tr>
                        <tr>
                            <td>core_rods_pos</td>
                            <td>{data.core_rods_pos}</td>
                        </tr>
                        <tr>
                            <td>Prim_Cool_pump_rate</td>
                            <td>{data.Prim_Cool_pump_rate}</td>
                        </tr>
                        <tr>
                            <td>Heat_EXCH_water_temp</td>
                            <td>{data.Heat_EXCH_water_temp}</td>
                        </tr>
                        <tr>
                            <td>Prim_Cool_pump_rate</td>
                            <td>{data.Sec_Cool_pump_rate}</td>
                        </tr>
                        <tr>
                            <td>Steam_Condencer_water_temp</td>
                            <td>{data.Steam_Condencer_water_temp}</td>
                        </tr>
                    </Table>
                </td>
            </tr>
        </Table>

        <Slider
            aria-label="Custom marks"
            defaultValue={20}
            getAriaValueText={valuetext}
            step={10}
            valueLabelDisplay="auto"
            marks={marks}
        />

    </div>
  );
}

export default App;
