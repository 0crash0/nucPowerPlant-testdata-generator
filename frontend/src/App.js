import './App.css';
import {Slider} from "@mui/material";
import Table from '@mui/material/Table';
import axios from "axios";
import {useEffect, useState} from "react";
import  WaterPumpSvg from './components/WaterPump'
import  TurbineSvg from './components/turbine'
import NuclearPowerStation from './components/nuc_pwr_station'
//import  WaterPumpSvg from './WaterPump'

const SRV = "localhost:8890" //3001 nodejs  8890 Go

const JSONurl="http://"+SRV+"/getdatajson";
const SET_RODS_url="http://"+SRV+"/set_rods_pos";
const SET_Ppumprate_url="http://"+SRV+"/set_ppump_rate";
const SET_Spumprate_url="http://"+SRV+"/set_spump_rate";
const SET_Start_url="http://"+SRV+"/start";
const SET_Stop_url="http://"+SRV+"/stop";
const SET_ACPpumprate_url = "http://"+SRV+"/set_acppump_rate";


function App() {
    const [data,setData] = useState({
        "core_temp":247.5,
        "core_rods_pos":5,
        "Prim_Cool_pump_rate":0,
        "Heat_EXCH_water_temp":25,
        "Sec_Cool_pump_rate":0,
        "Sec_Cool_water_temp":25,
        "Steam_Condencer_water_temp":25,
        "ACP_Cool_pump_rate":0,
        "Cooling_Tower_water_temp":0
    });

    const [ppumpDur, setpPumpDur] = useState("20s");
    const [spumpDur, setsPumpDur] = useState("20s");
    const [acppumpDur, setacpPumpDur] = useState("20s");
    const [rodsPosition, setRodsPosition] = useState(0);
    const [TurbineValve, setTurbineValve1] = useState(0);

    useEffect(() => {
         setInterval(() => {
        axios
            .get(JSONurl)
            .then((response) => response.data)
            .then((json) => {
                //console.log('json', json);

                //setData(json);     //NODE JS
                setData(
                    {"core_temp":json.ReactorCore.CoreTemp,
                        "core_rods_pos":json.ReactorCore.CoreRodsPos,
                        "Prim_Cool_pump_rate":json.PrimaryCoolant.PrimCoolPumpRate,
                        "Heat_EXCH_water_temp":json.HeatExchanger.HeatExchWaterTemp,
                        "Sec_Cool_pump_rate":json.SecondaryCoolant.SecCoolPumpRate,
                        "Sec_Cool_water_temp":json.SecondaryCoolant.SecCoolWaterTemp,
                        "Steam_Condencer_water_temp":json.SteamCondencer.SteamCondencerWaterTemp,
                        "ACP_Cool_pump_rate":json.ACPCoolant.AcpCoolPumpRate,
                        "Cooling_Tower_water_temp":json.ACPCoolant.AcpCoolWaterTemp}
                ) // GO

                //console.log(json)
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
        setRodsPosition(newValue);
    };
    const setPpumprate = (event, newValue) => {
        axios
            .get(SET_Ppumprate_url+'/'+newValue)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
        setpPumpDur(20/(newValue+1));
    };
    const setSpumprate = (event, newValue) => {
        axios
            .get(SET_Spumprate_url+'/'+newValue)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
        setsPumpDur(20/(newValue+1));
    };
    const setACPpumprate = (event, newValue) => {
        axios
            .get(SET_ACPpumprate_url+'/'+newValue)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
        setacpPumpDur(20/(newValue+1));
    };

    const setStart = (event) => {
        axios
            .get(SET_Start_url)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
    };
    const setStop = (event) => {
        axios
            .get(SET_Stop_url)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });
    };

    const setTurbineValve = (event) => {
        /*axios
            .get(SET_Stop_url)
            .then((response) => response.data)
            .catch((error) => {
                console.log(error);
            });*/
        setTurbineValve1(event.target.value);
    }

  return (
      <div className="App">
        <NuclearPowerStation id="station" PpumpDuration={ppumpDur} SpumpDuration={spumpDur} ACpumpDuration={acppumpDur} RodsTranslate={data.core_rods_pos} ValveRotate={TurbineValve}  />
        <TurbineSvg id="turbine" width={50} duration={"5s"}/>
          <div name="paramsTable" style={{display: "flex", position: "absolute",  left:'25%', width: '50%'}} >
            <Table class={'table-param'} style={{ backgroundColor:'white', width: '100%',fontSize: '14px'}}>
                <tr>
                    <td>param</td>
                    <td style={{width: '30%'}}>slider</td>
                    <td>param</td>
                    <td style={{width: '30%'}}>slider</td>
                </tr>
                <tr>
                    <td>core_rods_pos</td>
                    <td><Slider value={data.core_rods_pos} aria-label="Default" valueLabelDisplay="auto"
                                onChange={setRods}/></td>
                    <td>Valve
                    </td>
                    <td><Slider defaultValue={0} aria-label="Default" valueLabelDisplay="auto" max={360}
                                onChange={setTurbineValve}/></td>
                </tr>
                <tr>
                    <td>Prim_Cool_pump_rate
                        <WaterPumpSvg id="pWaterPump" width={40} duration={ppumpDur}/>
                    </td>
                    <td><Slider value={data.Prim_Cool_pump_rate} aria-label="Default" valueLabelDisplay="auto"
                                onChange={setPpumprate}/></td>
                    <td>Sec_ACP_pump_rate

                        <WaterPumpSvg id="acpWaterPump" width={40} duration={acppumpDur}/>
                    </td>
                    <td><Slider defaultValue={data.ACP_Cool_pump_rate} aria-label="Default" valueLabelDisplay="auto"
                                onChange={setACPpumprate}/></td>

                </tr>
                <tr>
                    <td>Sec_Cool_pump_rate
                        <WaterPumpSvg id="sWaterPump" width={40} duration={spumpDur}/>
                    </td>
                    <td><Slider defaultValue={data.Sec_Cool_pump_rate} aria-label="Default" valueLabelDisplay="auto"
                                onChange={setSpumprate}/></td>
                    <td style={{}}>
                        <button onClick={setStart}>Start</button>
                    </td>
                    <td>
                        <button>Pause</button> &nbsp;
                        <button onClick={setStop}>Stop</button>
                    </td>
                </tr>

            </Table>

              <Table class={'table-param'} style={{backgroundColor: 'white',fontSize: '14px',width: '200px'}}>
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
                      <td>Sec_Cool_pump_rate</td>
                      <td>{data.Sec_Cool_pump_rate}</td>
                  </tr>
                  <tr>
                      <td>Sec_Cool_water_temp</td>
                      <td>{data.Sec_Cool_water_temp}</td>
                  </tr>
                  <tr>
                      <td>Steam_Condencer_water_temp</td>
                      <td>{data.Steam_Condencer_water_temp}</td>
                  </tr>
                  <tr>
                      <td>ACP_Cool_pump_rate</td>
                      <td>{data.ACP_Cool_pump_rate}</td>
                  </tr>
                  <tr>
                      <td>Cooling_Tower_water_temp</td>
                      <td>{data.Cooling_Tower_water_temp}</td>
                  </tr>
              </Table>
          </div>



      </div>
  );
}

export default App;
