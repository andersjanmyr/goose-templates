package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"github.com/andersjanmyr/{{lowercaseletters .NAME}}/pkg/{{lowercaseletters .NAME}}"
)

var rootCmd = &cobra.Command{
	Use:   "{{lowercaseletters .NAME}}",
	Short: "{{lowercaseletters .NAME}} ...",
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println("{{.NAME}} ", {{lowercaseletters .NAME}}.Version)
		return nil
	},
}

var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "version",
	RunE: func(cmd *cobra.Command, args []string) error {
		fmt.Println({{lowercaseletters .NAME}}.Version)
		return nil
	},
}

func initialize() {
	rootCmd.AddCommand(versionCmd)
}


func main() {
	initialize()
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
