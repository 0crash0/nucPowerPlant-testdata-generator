package main

import (
	"encoding/json"
	"fmt"
	"github.com/rs/cors"
	"log/slog"
	"main/powerplant"
	"net/http"
	"os"
	"strconv"
	"strings"
)

func main() {
	var backend_prefix = os.Getenv("backend_prefix")
	var port = os.Getenv("PORT")
	if port == "" {
		port = "8890"
		//log.Fatal("Please specify the HTTP port as environment variable, e.g. env PORT=8081 go run http-server.go")
	}

	core := powerplant.NewPowerPlantCtrl()
	mux := http.NewServeMux()
	/// to json

	jsonToSend, err := json.Marshal(core.PowerPlant)
	///jsonToSend1, err := json.Marshal(core)
	if err != nil {
		fmt.Printf("Error: %s", err)
		return
	}

	//server
	blank := http.HandlerFunc(func(_ http.ResponseWriter, _ *http.Request) {})
	//mux.Handle("/static", blank)
	mux.Handle("/static/js", blank)
	mux.Handle("/static/css", blank)
	mux.HandleFunc(backend_prefix+"/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "build/index.html")
	})
	mux.Handle("/static/js/", http.StripPrefix("/static/js", http.FileServer(http.Dir("./build/static/js/"))))
	mux.Handle("/static/css/", http.StripPrefix("/static/css", http.FileServer(http.Dir("./build/static/css/"))))

	mux.HandleFunc(backend_prefix+"/getdatajson", func(w http.ResponseWriter, r *http.Request) {
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
	mux.HandleFunc(backend_prefix+"/start", func(w http.ResponseWriter, r *http.Request) {
		slog.Info("Received request to /start endpoint")

		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Started!")

		powerplant.StartReactor(&core)
	})
	mux.HandleFunc(backend_prefix+"/stop", func(w http.ResponseWriter, r *http.Request) {
		slog.Info("Received request to /start endpoint")

		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Stoped!")
		powerplant.StopReactor(&core)
	})
	mux.HandleFunc(backend_prefix+"/set_rods_pos/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/set_rods_pos/")
		core.PowerPlant.ReactorCore.CoreRodsPos, _ = strconv.Atoi(id)
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "rods set!")
	})
	mux.HandleFunc(backend_prefix+"/set_ppump_rate/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/set_ppump_rate/")
		core.PowerPlant.PrimaryCoolant.PrimCoolPumpRate, _ = strconv.Atoi(id)
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Ppump set!")
	})
	mux.HandleFunc(backend_prefix+"/set_spump_rate/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/set_spump_rate/")
		core.PowerPlant.SecondaryCoolant.SecCoolPumpRate, _ = strconv.Atoi(id)
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Spump set!")
	})

	mux.HandleFunc(backend_prefix+"/set_acppump_rate/", func(w http.ResponseWriter, r *http.Request) {
		id := strings.TrimPrefix(r.URL.Path, "/set_acppump_rate/")
		core.PowerPlant.ACPCoolant.AcpCoolPumpRate, _ = strconv.Atoi(id)
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "ACPpump set!")
	})

	slog.Info("Starting server on port " + port)
	handler := cors.Default().Handler(mux)
	err = http.ListenAndServe(":"+port, handler)
	if err != nil {
		slog.Error("Application finished with an error", "error", err)

	}
}
