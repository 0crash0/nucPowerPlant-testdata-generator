/*
class reactor_core{
    constructor() {
        this.energy=10;
        this.temp_core=30;
        this.rods_pos=0; // 0 down 100 up
        //radiation ??
    }
    heating_temp(time){
        this.temp_core = time* this.energy * this.rods_pos
    }
}
class primary_coolant{
    constructor() {
        this.water_temp=25;
        this.pump_rate=0; //0-100%
        this.reserv_pump=false;
        this.water_level=100 //%
        this.pressure_release=false; //pressure valve
        this.steam_by_pass=false;// turn steam around turbine
        //heat_capacity: P_pump_rate/Pwater_temp  + xxx*(this.reserv_pump:)
    }
}

class heat_exchanger{
    constructor() {
        this.heat_conduction=10;//some heat conduction ratio

    }

}

class secondary_coolant{
    constructor() {
        this.water_temp=25;
        this.pump_rate=0; //0-100%
        this.reserv_pump=false;
        this.water_level=100 //%
        this.pressure_release=false; //pressure valve
        this.turbine=0 //% calculated by steam flow

        //heat_capacity: P_pump_rate/Pwater_temp  + xxx*(this.reserv_pump:)
    }
}
*/
//export default class nuclear_plant extends reactor_core, primary_coolant, heat_exchanger, secondary_coolant{

/*
Maximum reactor values

Reactor Core        700°
Heat Exchanger      425°
Steam Condenser     210°
Generator Output    1500 MWe
Coolant Pumps       98% continuous

*/


export default class nuclear_plant{

    constructor() {
        //**************************************** REACTOR CORE
        this.core_energy=1.15;//1.12
        this.core_temp=98;
        this.core_rods_pos=5; // 0 down 100 up
        //core_radiation ??

        //**************************************** PRIMARY COOLANT
        this.Prim_Cool_heat_conductance=4.5;
        //this.Prim_Cool_water_temp=25;
        this.Prim_Cool_pump_rate=0; //0-100%
        this.Prim_Cool_reserv_pump=false;
        this.Prim_Cool_water_level=100 //%
        this.Prim_Cool_pressure_release=false; //pressure valve
        //heat_capacity: P_pump_rate/Pwater_temp  + xxx*(this.reserv_pump:)

        //**************************************** HEAT EXCHANGER
        this.Heat_EXCH_conduction=10;//some heat conduction ratio
        this.Heat_EXCH_water_temp=25;

        //**************************************** SECONDARY COOLANT
        this.Sec_Cool_water_temp=25;
        this.Sec_Cool_heat_conductance=4.5;
        this.Sec_Cool_pump_rate=0; //0-100%
        this.Sec_Cool_reserv_pump=false;
        this.Sec_Cool_water_level=100 //%
        this.Sec_Cool_pressure_release=false; //pressure valve
        this.Sec_Cool_turbine=0 //% calculated by steam flow

        //**************************************** STEAM CONDENCER
        this.Steam_Condencer_conduction=10;//some heat conduction ratio
        this.Steam_Condencer_water_temp=25;


        //**************************************** ACP COOLANT
        this.ACP_Cool_water_temp=25;
        this.ACP_Cool_heat_conductance=4.5;
        this.ACP_Cool_pump_rate=0; //0-100%
        this.ACP_Cool_reserv_pump=false;
        this.ACP_Cool_water_level=100 //%
        this.ACP_Cool_pressure_release=false; //pressure valve
        this.ACP_Cool_turbine=0 //% calculated by steam flow

        //**************************************** COOLING TOWER
        this.Cooling_Tower_conduction=10;//some heat conduction ratio
        this.Cooling_Tower_water_temp=25;

        //heat_capacity: P_pump_rate/Pwater_temp  + xxx*(this.reserv_pump:)

        this.coreHeatInterval=0;
        this.PrimaryCoolantInterval=0;
        this.SecondaryCoolantInterval=0;
        this.ACPCoolantInterval=0;
    }
    start_reactor(){
        this.coreHeatInterval = setInterval(this.core_heating.bind(this), 1000);
        this.PrimaryCoolantInterval = setInterval(this.primary_coolant.bind(this), 1000);
        this.SecondaryCoolantInterval = setInterval(this.secondary_coolant.bind(this), 1000);
        this.ACPCoolantInterval = setInterval(this.acp_coolant.bind(this), 1000);
    }
    core_heating(){
        console.log("core temp ",this.core_temp, this.core_energy*this.core_rods_pos,"rods ",this.core_rods_pos);
        this.core_temp+=this.core_energy*this.core_rods_pos;

    }

    primary_coolant(){
        //rate 50% -10
        //rate 100% -20
        //this.Prim_Cool_heat_conductance=this.Prim_Cool_water_temp
        if( this.core_temp>90){
            console.log("core temp ",this.core_temp,Math.log(this.Prim_Cool_pump_rate+1)*this.Prim_Cool_heat_conductance,"Prim_Cool_pump_rate ",this.Prim_Cool_pump_rate);
            this.core_temp-=Math.log(this.Prim_Cool_pump_rate+1)*this.Prim_Cool_heat_conductance;

            this.Heat_EXCH_water_temp+=Math.log(this.Prim_Cool_pump_rate+1)*this.Prim_Cool_heat_conductance;
            console.log("Heat Exchanger ",this.Heat_EXCH_water_temp)
        }
    }

    secondary_coolant(){
        //rate 50% -10
        //rate 100% -20
        //this.Prim_Cool_heat_conductance=this.Prim_Cool_water_temp
        if( this.Heat_EXCH_water_temp>90) {
            this.Heat_EXCH_water_temp -= Math.log(this.Sec_Cool_pump_rate + 1) * this.Sec_Cool_heat_conductance;

            this.Steam_Condencer_water_temp += Math.log(this.Sec_Cool_pump_rate + 1) * this.Steam_Condencer_conduction;
        }
    }


    acp_coolant(){
        //rate 50% -10
        //rate 100% -20
        //this.Prim_Cool_heat_conductance=this.Prim_Cool_water_temp
        if( this.Steam_Condencer_water_temp>60) {
            this.Steam_Condencer_water_temp -= Math.log(this.ACP_Cool_pump_rate + 1) * this.ACP_Cool_heat_conductance;
            this.Cooling_Tower_water_temp += Math.log(this.ACP_Cool_pump_rate + 1) * this.Cooling_Tower_conduction;
        }
    }


    set_rods_pos(pos){
        this.core_rods_pos=pos;
    }
    set_Ppump_rate(rate){
        this.Prim_Cool_pump_rate=rate;
    }
    set_Spump_rate(rate){
        this.Sec_Cool_pump_rate=rate;
        this.ACP_Cool_pump_rate=rate/2;
    }
}
