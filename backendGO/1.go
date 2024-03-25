package main

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"main/reactor"
	"net/http"
)

func main() {
	core := reactor.NewPowerPlantCtrl()

	/// to json

	jsonToSend, err := json.Marshal(core.PowerPlant)
	///jsonToSend1, err := json.Marshal(core)
	if err != nil {
		fmt.Printf("Error: %s", err)
		return
	}

	http.HandleFunc("/json", func(w http.ResponseWriter, r *http.Request) {
		slog.Info("Received request to /json endpoint")

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
	http.HandleFunc("/start", func(w http.ResponseWriter, r *http.Request) {
		slog.Info("Received request to /start endpoint")

		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Started!")
		reactor.StartReactor(&core)
	})
	http.HandleFunc("/stop", func(w http.ResponseWriter, r *http.Request) {
		slog.Info("Received request to /start endpoint")

		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Stoped!")
		reactor.StopReactor(&core)
	})

	slog.Info("Starting server on port 8890")

	err = http.ListenAndServe(":8890", nil)
	if err != nil {
		slog.Error("Application finished with an error", "error", err)

	}
}
