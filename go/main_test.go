package main

import (
	"testing"
)

func Test{{camelcase .NAME}}(t *testing.T) {
	actual := {{camelcase .NAME}}()
	expected := "prefixMyNamesuffix"
	if actual != expected {
		t.Errorf("main(): %v, expected %v", actual, expected)
	}
}
