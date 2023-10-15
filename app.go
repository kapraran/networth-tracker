package main

import (
	"context"
	"errors"
	"fmt"
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

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) GetSavedConfig() string {
	configDir, _ := os.UserConfigDir()
	dirPath := filepath.Join(configDir, "ploutos")
	confFilePath := filepath.Join(dirPath, "config.json")

	if _, err := os.Stat(dirPath); errors.Is(err, os.ErrNotExist) {
		os.MkdirAll(dirPath, 0750)
	}

	return confFilePath
}

func (a *App) OpenJsonFile() string {
	filename, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{})
	if err != nil {
		return ""
	}

	data, err := os.ReadFile(filename)
	if err != nil {
		return ""
	}

	return string(data)
}
