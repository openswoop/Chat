package main

import (
	"log"
	"context"
	"net/http"
	"encoding/json"
	"os"
	openai "github.com/sashabaranov/go-openai"
	"github.com/rs/cors"
	"io/ioutil"
)
type ChatRequest struct {
	Action     string `json:"action"`
	Parameters struct {
		Message string `json:"message"`
	} `json:"parameters"`
}
type Character struct {
	Name             string   `json:"name"`
	Description      string   `json:"description"`
	Purpose          string   `json:"purpose"`
	Backstory        string   `json:"backstory"`
	Motivations      []string `json:"motivations"`
	ShortTermGoals   []string `json:"short_term_goals"`
	LongTermGoals    []string `json:"long_term_goals"`
	PersonalityTraits []string `json:"personality_traits"`
}

func main() {
	http.HandleFunc("/chat", chatHandler)

	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	handler := corsMiddleware.Handler(http.DefaultServeMux)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server is listening on port %s...", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

func chatHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	bodyBytes, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	bodyString := string(bodyBytes)
	// Call ChatGPT API
	chatResponse := chatGPTRequest(bodyString)

	response := map[string]string{
		"response": chatResponse, // Replace with the actual AI-generated response
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
func chatGPTRequest(prompt string) string {
	
	KEY := os.Getenv("OPENAI_API_KEY")
    ctx := context.Background()
    client := openai.NewClient(KEY)

    resp, err := client.CreateChatCompletion(
		ctx,
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: prompt,
				},
			},
    })
    if err != nil {
        log.Fatalln(err)
    }
   
	return resp.Choices[0].Message.Content
	
}

