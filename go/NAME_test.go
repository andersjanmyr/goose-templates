package {{dromedarcase .NAME}}

import (
	"testing"
)

func Test{{camelcase .NAME}}(t *testing.T) {
	actual := {{camelcase .NAME}}()
	expected := "{{dromedarcase .NAME}}"
	if actual != expected {
		t.Errorf("main(): %v, expected %v", actual, expected)
	}
}
