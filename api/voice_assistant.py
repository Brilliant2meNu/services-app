
import speech_recognition as sr
from gtts import gTTS
import os
import requests

# Initialize recognizer
recognizer = sr.Recognizer()

def capture_audio():
    """
    Capture audio input from the microphone and convert it to text.
    """
    with sr.Microphone() as source:
        print("Listening... Press Ctrl+C to stop.")
        try:
            audio = recognizer.listen(source, timeout=5)
            text = recognizer.recognize_google(audio)
            print(f"Recognized Text: {text}")
            return text
        except sr.UnknownValueError:
            print("Could not understand the audio.")
            return None
        except sr.RequestError as e:
            print(f"Error with speech recognition service: {e}")
            return None

def send_to_gpt(text):
    """
    Send the recognized text to the GPT API and get a response.
    """
    API_KEY = "YOUR_OPENAI_API_KEY"
    endpoint = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "gpt-4",
        "messages": [{"role": "user", "content": text}]
    }

    try:
        response = requests.post(endpoint, headers=headers, json=payload)
        if response.status_code == 200:
            response_data = response.json()
            reply = response_data["choices"][0]["message"]["content"]
            print(f"GPT Response: {reply}")
            return reply
        else:
            print(f"Error from GPT API: {response.status_code}, {response.text}")
            return None
    except Exception as e:
        print(f"Error communicating with GPT API: {e}")
        return None

def speak_response(response_text):
    """
    Convert GPT's text response into speech and play it.
    """
    if response_text:
        tts = gTTS(response_text)
        tts.save("response.mp3")
        os.system("start response.mp3" if os.name == "nt" else "afplay response.mp3")
    else:
        print("No response to convert to speech.")

def main():
    """
    Main function to tie everything together.
    """
    print("Voice Assistant Ready. Press the mic button or speak a command!")
    while True:
        try:
            text = capture_audio()
            if text:
                gpt_response = send_to_gpt(text)
                speak_response(gpt_response)
        except KeyboardInterrupt:
            print("Exiting voice assistant.")
            break

if __name__ == "__main__":
    main()
