package main

import (
	"encoding/json"
	"fmt"
	"log/slog"
	"main/reactor"
	"net/http"
	"reflect"
	"time"
)

func main() {
	core := reactor.NewPowerPlant()

	/// to json

	jsonToSend, err := json.Marshal(core)
	if err != nil {
		fmt.Printf("Error: %s", err)
		return
	}

	http.HandleFunc("/json", func(w http.ResponseWriter, r *http.Request) {
		slog.Info("Received request to /json endpoint")

		w.WriteHeader(http.StatusOK)
		w.Header().Set("Content-Type", "application/json")
		//fmt.Fprintln(w, "Hello 123!")
		fmt.Fprintln(w, string(jsonToSend))
	})

	slog.Info("Starting server on port 8890")

	err = http.ListenAndServe(":8890", nil)
	if err != nil {
		slog.Error("Application finished with an error", "error", err)
	}
}

func setInterval(p interface{}, interval time.Duration) chan<- bool {
	ticker := time.NewTicker(interval)
	stopIt := make(chan bool)
	go func() {

		for {

			select {
			case <-stopIt:
				fmt.Println("stop setInterval")
				return
			case <-ticker.C:
				reflect.ValueOf(p).Call([]reflect.Value{})
			}
		}

	}()

	// return the bool channel to use it as a stopper
	return stopIt
}
