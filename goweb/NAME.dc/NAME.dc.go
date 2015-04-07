package main

import "net/http"

func main() {
	http.HandleFunc("/", {{dromedarcase .NAME}})
	http.ListenAndServe(":8080", nil)
}

func {{dromedarcase .NAME}}(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("{{dromedarcase .NAME}}"))
}
