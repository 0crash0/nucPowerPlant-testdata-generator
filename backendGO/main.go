package main

import (
	"encoding/json"
	"fmt"
	"github.com/rs/cors"
	"log/slog"
	"main/powerplant"
	"net/http"
	"strconv"
	"strings"
)

func main() {
	core := powerplant.NewPowerPlantCtrl()
	mux := http.NewServeMux()
	/// to json

	jsonToSend, err := json.Marshal(core.PowerPlant)
	///jsonToSend1, err := json.Marshal(core)
	if err != nil {
		fmt.Printf("Error: %s", err)
		return
	}

	mux.HandleFunc("/getdatajson", func(w http.ResponseWriter, r *http.Request) {
		//slog.Info("Received request to /json endpoint")

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		jsonToSend, err = json.Marshal(core.PowerPlant)
		//fmt.Fprintln(w, "Hello 123!")

		if err != nil {
			fmt.Printf("Error: %s", err)
			return
		}
		fmt.Fprintln(w, string(jsonToSend))
	})
	mux.HandleFunc("/start", func(w http.ResponseWriter, r *http.Request) {
		slog.Info("Received request to /start endpoint")

		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Started!")

		powerplant.StartReactor(&core)
	})
	mux.HandleFunc("/stop", func(w http.ResponseWriter, r *http.Request) {
		slog.Info("Received request to /start endpoint")

		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Stoped!")
		powerplant.StopReactor(&core)
	})
	mux.HandleFunc("/set_rods_pos/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/set_rods_pos/")
		core.PowerPlant.ReactorCore.CoreRodsPos, _ = strconv.Atoi(id)
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "rods set!")
	})
	mux.HandleFunc("/set_ppump_rate/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/set_ppump_rate/")
		core.PowerPlant.PrimaryCoolant.PrimCoolPumpRate, _ = strconv.Atoi(id)
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Ppump set!")
	})
	mux.HandleFunc("/set_spump_rate/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/set_spump_rate/")
		core.PowerPlant.SecondaryCoolant.SecCoolPumpRate, _ = strconv.Atoi(id)
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Spump set!")
	})

	mux.HandleFunc("/set_acppump_rate/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/set_acppump_rate/")
		core.PowerPlant.ACPCoolant.AcpCoolPumpRate, _ = strconv.Atoi(id)
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "ACPpump set!")
	})

	slog.Info("Starting server on port 8890")
	handler := cors.Default().Handler(mux)
	err = http.ListenAndServe(":8890", handler)
	if err != nil {
		slog.Error("Application finished with an error", "error", err)

	}
}
