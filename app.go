package main

import (
	"context"
	"errors"
	"os"
	"path/filepath"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// GetSavedConfig returns the path to the saved config file
func (a *App) GetSavedConfig() string {
	configDir, _ := os.UserConfigDir()
	dirPath := filepath.Join(configDir, "ploutos")
	confFilePath := filepath.Join(dirPath, "config.json")

	if _, err := os.Stat(dirPath); errors.Is(err, os.ErrNotExist) {
		os.MkdirAll(dirPath, 0750)
	}

	return confFilePath
}

// OpenJsonFile opens a JSON file using a file dialog and returns its content as a string.
func (a *App) OpenJsonFile() (*string, error) {
	filename, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{})
	if err != nil {
		return nil, err
	}

	data, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	stringData := string(data)
	return &stringData, nil
}

// CreateNewJsonFile creates a new JSON file and returns its selected directory.
func (a *App) CreateNewJsonFile() (*string, error) {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return nil, err
	}

	options := runtime.SaveDialogOptions{
		DefaultDirectory: homeDir,
		DefaultFilename:  "ploutos.json",
	}

	selectedDir, err := runtime.SaveFileDialog(a.ctx, options)
	if err != nil {
		return nil, err
	}

	return &selectedDir, nil
}
