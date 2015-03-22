package main

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"
)

func Test{{camelcase .NAME}}(t *testing.T) {
	req, err := http.NewRequest("GET", "http://example.com/{{camelcase .NAME}}", nil)
	if err != nil {
		log.Fatal(err)
	}

	w := httptest.NewRecorder()
	{{dromedarcase .NAME}}(w, req)

	fmt.Printf("%d - %s", w.Code, w.Body.String())
	actualCode := w.Code
	expectedCode := 200
	if actualCode != expectedCode {
		t.Errorf("w.Code: %v, expected %v", actualCode, expectedCode)
	}
	actualBody := w.Body.String()
	expectedBody := "{{dromedarcase .NAME}}"
	if actualBody != expectedBody {
		t.Errorf("w.Body: %v, expected %v", actualBody, expectedBody)
	}
}
