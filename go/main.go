package main

import (
	"fmt"
)

func {{camelcase .NAME}}() string {
	return "{{dromedarcase .NAME}}"
}

func main() {
	fmt.Println({{camelcase .NAME}}())
}
