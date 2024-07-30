const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Yash...");
    } 
    else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Yash...");
    }
    else {
        speak("Good Evening Yash...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } 
    else if(message.includes('what do you mean JARVIS?') || message.includes('Tell me something about your name')){
        speak('Jarvis is a unit testing framework written in JavaScript. It’s based heavily off of the API of NUnit, which is a rewrite of a port of JUnit which is a port of SUnit.');
    }
    else if(message.includes('who are you?') || message.includes('what is your name?')){
        speak('I am JARVIS,  a virtual assistant...');
    }
    else if(message.includes('What can you do?') || message.includes('what you do?')){
        speak('I do search, whatever you speak...');
    }
    else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } 
    else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    }
    else if (message.includes("open instagram")) {
        window.open("https://instagram.com", "_blank");
        speak("Opening Instagram...");
    }
    else if (message.includes("open linkedin")) {
        window.open("https://linkedin.com", "_blank");
        speak("Opening LinkedIn...");
    }
    else if (message.includes("open chatgpt")) {
        window.open("https://chatgpt.com", "_blank");
        speak("Opening ChatGPT3.5...");
    }
    else if (message.includes("open leetcode")) {
        window.open("https://leetcode.com", "_blank");
        speak("Opening LeetCode...");
    }
    else if (message.includes("open Coding Ninjas")) {
        window.open("https://codingninjas.com", "_blank");
        speak("Opening Coding Ninjas...");
    }
    else if (message.includes("open CodeHelp")) {
        window.open("https://codehelp.com", "_blank");
        speak("Opening CodeHelp...");
    }
    else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } 
    else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } 
    else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } 
    else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } 
    else if (message.includes('open calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator...";
        speak(finalText);
    } 
    else if (message.includes('open Whatsapp')) {
        window.open('Whatsapp:///');
        const finalText = "Opening Whatsapp...";
        speak(finalText);
    } 
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}