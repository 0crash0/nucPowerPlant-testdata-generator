package reactor

import (
	"math"
	"time"
)

type ReactorCore struct {
	CoreEnergy  float64
	CoreTemp    float64
	CoreRodsPos int
}
type PrimaryCoolant struct {
	PrimCoolHeatConductance float64
	//Prim_Cool_water_temp=25;
	PrimCoolPumpRate        int //0-100%
	PrimCoolRservPump       bool
	PrimCoolWaterLevel      int //%
	PrimCoolPressureRelease bool
}
type HeatExchanger struct {
	//HeatExchConduction int
	HeatExchWaterTemp float64
}

type SecondaryCoolant struct {
	SecCoolWaterTemp       float64
	SecCoolHeatConductance float64
	SecCoolPumpRate        int //0-100%
	SecCoolReservPump      bool
	SecCoolWaterLevel      int  //%
	SecCoolPressureRelease bool //pressure valve
	SecCoolTurbine         int  //% calculated by steam flow
}

type SteamCondencer struct {
	SteamCondencerConduction float64 //some heat conduction ratio
	SteamCondencerWaterTemp  float64
}

type ACPCoolant struct {
	AcpCoolWaterTemp       float64
	AcpCoolHeatConductance float64
	AcpCoolPumpRate        int //0-100%
	AcpCoolReservPump      bool
	AcpCoolWaterLevel      int  //%
	AcpCoolPressureRelease bool //pressure valve
	AcpCoolTurbine         int  //% calculated by steam flow
}

type CoolingTower struct {
	CoolingTowerConduction float64 //some heat conduction ratio
	CoolingTowerWaterTemp  float64
	//heat_capacity: P_pump_rate/Pwater_temp  + xxx*(reserv_pump:)
}

type PowerPlant struct {
	ReactorCore      ReactorCore
	PrimaryCoolant   PrimaryCoolant
	HeatExchanger    HeatExchanger
	SecondaryCoolant SecondaryCoolant
	SteamCondencer   SteamCondencer
	ACPCoolant       ACPCoolant
	CoolingTower     CoolingTower
}

type PowerPlantCtrl struct {
	PowerPlant               PowerPlant
	coreHeatInterval         *time.Ticker
	PrimaryCoolantInterval   *time.Ticker
	SecondaryCoolantInterval *time.Ticker
	ACPCoolantInterval       *time.Ticker
}

func NewReactorCore() ReactorCore {
	rctrCore := ReactorCore{}
	rctrCore.CoreEnergy = 1.15
	rctrCore.CoreTemp = 98
	rctrCore.CoreRodsPos = 5
	return rctrCore
}
func NewPrimaryCoolant() PrimaryCoolant {
	PrmClnt := PrimaryCoolant{}
	PrmClnt.PrimCoolHeatConductance = 4.5
	PrmClnt.PrimCoolPumpRate = 0
	PrmClnt.PrimCoolRservPump = false
	PrmClnt.PrimCoolPressureRelease = false
	return PrmClnt
}
func NewHeatExchanger() HeatExchanger {
	HtExcngr := HeatExchanger{}
	//HtExcngr.HeatExchConduction=10
	HtExcngr.HeatExchWaterTemp = 25
	return HtExcngr
}

func NewSecondaryCoolant() SecondaryCoolant {
	ScClnt := SecondaryCoolant{}
	ScClnt.SecCoolWaterTemp = 25
	ScClnt.SecCoolHeatConductance = 4.5
	ScClnt.SecCoolPumpRate = 0
	ScClnt.SecCoolReservPump = false
	ScClnt.SecCoolWaterLevel = 100
	ScClnt.SecCoolPressureRelease = false
	ScClnt.SecCoolTurbine = 0
	return ScClnt
}

func NewSteamCondencer() SteamCondencer {
	StmCndncr := SteamCondencer{}
	StmCndncr.SteamCondencerConduction = 10
	StmCndncr.SteamCondencerWaterTemp = 25
	return StmCndncr
}

func NewACPCoolant() ACPCoolant {
	ACPClnt := ACPCoolant{}
	ACPClnt.AcpCoolWaterTemp = 25
	ACPClnt.AcpCoolHeatConductance = 4.5
	ACPClnt.AcpCoolPumpRate = 0
	ACPClnt.AcpCoolReservPump = false
	ACPClnt.AcpCoolWaterLevel = 100
	ACPClnt.AcpCoolPressureRelease = false
	ACPClnt.AcpCoolTurbine = 0
	return ACPClnt
}
func NewCoolingTower() CoolingTower {
	ClngTwr := CoolingTower{}
	ClngTwr.CoolingTowerConduction = 10
	ClngTwr.CoolingTowerWaterTemp = 25
	return ClngTwr
}
func NewPowerPlant() PowerPlant {
	PwrPlnt := PowerPlant{}
	PwrPlnt.ReactorCore = NewReactorCore()
	PwrPlnt.PrimaryCoolant = NewPrimaryCoolant()
	PwrPlnt.HeatExchanger = NewHeatExchanger()
	PwrPlnt.SecondaryCoolant = NewSecondaryCoolant()
	PwrPlnt.SteamCondencer = NewSteamCondencer()
	PwrPlnt.ACPCoolant = NewACPCoolant()
	PwrPlnt.CoolingTower = NewCoolingTower()
	return PwrPlnt
}
func NewPowerPlantCtrl() PowerPlantCtrl {
	PwrPlntCtrl := PowerPlantCtrl{}
	PwrPlntCtrl.PowerPlant = NewPowerPlant()

	return PwrPlntCtrl
}

func CoreHeating(plant *PowerPlantCtrl) {
	//console.log("core temp ",this.core_temp, this.core_energy*this.core_rods_pos,"rods ",this.core_rods_pos);

	plant.coreHeatInterval = time.NewTicker(time.Second)
	go func() {
		for ; ; <-plant.coreHeatInterval.C {
			//log.Println("CoreHeating!")
			plant.PowerPlant.ReactorCore.CoreTemp += plant.PowerPlant.ReactorCore.CoreEnergy * float64(plant.PowerPlant.ReactorCore.CoreRodsPos)
			//log.Println(plant.PowerPlant.ReactorCore.CoreTemp)
		}
	}()
}

func PrimaryCooling(plant *PowerPlantCtrl) {
	//console.log("core temp ",this.core_temp, this.core_energy*this.core_rods_pos,"rods ",this.core_rods_pos);

	plant.PrimaryCoolantInterval = time.NewTicker(time.Second)
	go func() {
		for ; ; <-plant.PrimaryCoolantInterval.C {
			//log.Println("PrCooling!")
			//plant.PowerPlant.HeatExchanger.HeatExchWaterTemp += plant.PowerPlant.ReactorCore.CoreEnergy * float64(plant.PowerPlant.ReactorCore.CoreRodsPos)
			//log.Println(plant.PowerPlant.HeatExchanger.HeatExchWaterTemp)

			if plant.PowerPlant.ReactorCore.CoreTemp > 90 {

				plant.PowerPlant.ReactorCore.CoreTemp -= math.Log(float64(plant.PowerPlant.PrimaryCoolant.PrimCoolPumpRate+1)) * plant.PowerPlant.PrimaryCoolant.PrimCoolHeatConductance

				plant.PowerPlant.HeatExchanger.HeatExchWaterTemp += math.Log(float64(plant.PowerPlant.PrimaryCoolant.PrimCoolPumpRate+1)) * plant.PowerPlant.PrimaryCoolant.PrimCoolHeatConductance

			}

		}
	}()
}
func SecondaryCooling(plant *PowerPlantCtrl) {
	//console.log("core temp ",this.core_temp, this.core_energy*this.core_rods_pos,"rods ",this.core_rods_pos);

	plant.SecondaryCoolantInterval = time.NewTicker(time.Second)
	go func() {
		for ; ; <-plant.SecondaryCoolantInterval.C {

			if plant.PowerPlant.HeatExchanger.HeatExchWaterTemp > 90 {

				plant.PowerPlant.HeatExchanger.HeatExchWaterTemp -= math.Log(float64(plant.PowerPlant.SecondaryCoolant.SecCoolPumpRate+1)) * plant.PowerPlant.SecondaryCoolant.SecCoolHeatConductance

				plant.PowerPlant.SteamCondencer.SteamCondencerWaterTemp += math.Log(float64(plant.PowerPlant.SecondaryCoolant.SecCoolPumpRate+1)) * plant.PowerPlant.SteamCondencer.SteamCondencerConduction

			}

		}
	}()
}

func AcpCooling(plant *PowerPlantCtrl) {
	//console.log("core temp ",this.core_temp, this.core_energy*this.core_rods_pos,"rods ",this.core_rods_pos);

	plant.ACPCoolantInterval = time.NewTicker(time.Second)
	go func() {
		for ; ; <-plant.ACPCoolantInterval.C {

			if plant.PowerPlant.SteamCondencer.SteamCondencerWaterTemp > 60 {

				plant.PowerPlant.SteamCondencer.SteamCondencerWaterTemp -= math.Log(float64(plant.PowerPlant.ACPCoolant.AcpCoolPumpRate+1)) * plant.PowerPlant.ACPCoolant.AcpCoolHeatConductance

				plant.PowerPlant.CoolingTower.CoolingTowerWaterTemp += math.Log(float64(plant.PowerPlant.ACPCoolant.AcpCoolPumpRate+1)) * plant.PowerPlant.CoolingTower.CoolingTowerConduction

			}

		}
	}()
}

func StartReactor(plant *PowerPlantCtrl) {
	CoreHeating(plant)
	PrimaryCooling(plant)
	SecondaryCooling(plant)
	AcpCooling(plant)
	/*this.PrimaryCoolantInterval = setInterval(this.primary_coolant.bind(this), 1000)
	this.SecondaryCoolantInterval = setInterval(this.secondary_coolant.bind(this), 1000)
	this.ACPCoolantInterval = setInterval(this.acp_coolant.bind(this), 1000)*/
}
func StopReactor(plant *PowerPlantCtrl) {
	plant.coreHeatInterval.Stop()
	plant.PrimaryCoolantInterval.Stop()
	plant.SecondaryCoolantInterval.Stop()
	plant.ACPCoolantInterval.Stop()
	/*this.PrimaryCoolantInterval = setInterval(this.primary_coolant.bind(this), 1000)
	this.SecondaryCoolantInterval = setInterval(this.secondary_coolant.bind(this), 1000)
	this.ACPCoolantInterval = setInterval(this.acp_coolant.bind(this), 1000)*/

}
