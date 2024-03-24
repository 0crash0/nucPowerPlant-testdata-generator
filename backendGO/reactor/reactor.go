package reactor

type ReactorCore struct {
	CoreEnergy  float32
	CoreTemp    float32
	CoreRodsPos int
}
type PrimaryCoolant struct {
	PrimCoolHeatConductance float32
	//Prim_Cool_water_temp=25;
	PrimCoolPumpRate        int //0-100%
	PrimCoolRservPump       bool
	PrimCoolWaterLevel      int //%
	PrimCoolPressureRelease bool
}
type HeatExchanger struct {
	//HeatExchConduction int
	HeatExchWaterTemp int
}

type SecondaryCoolant struct {
	SecCoolWaterTemp       int
	SecCoolHeatConductance float32
	SecCoolPumpRate        int //0-100%
	SecCoolReservPump      bool
	SecCoolWaterLevel      int  //%
	SecCoolPressureRelease bool //pressure valve
	SecCoolTurbine         int  //% calculated by steam flow
}

type SteamCondencer struct {
	SteamCondencerConduction int //some heat conduction ratio
	SteamCondencerWaterTemp  int
}

type ACPCoolant struct {
	AcpCoolWaterTemp       int
	AcpCoolHeatConductance float32
	AcpCoolPumpRate        int //0-100%
	AcpCoolReservPump      bool
	AcpCoolWaterLevel      int  //%
	AcpCoolPressureRelease bool //pressure valve
	AcpCoolTurbine         int  //% calculated by steam flow
}

type CoolingTower struct {
	CoolingTowerConduction int //some heat conduction ratio
	CoolingTowerWaterTemp  int
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
