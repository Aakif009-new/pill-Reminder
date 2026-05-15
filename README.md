📌 PillGuard – Smart Medication Reminder System
A full-stack medication reminder system that helps patients take medicines on time using physical alerts (buzzer + LED), web interface, and AI-powered assistant.

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Web Serial API](https://img.shields.io/badge/Web_Serial_API-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)

### Hardware
![Arduino](https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white)

### AI
![Gemini AI](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)

 --------------------------------------------------------------
 
**📌 Project Overview**

This project helps users:

Connect to Arduino via Web Serial API

Set daily medication schedules

Receive physical alerts (buzzer + LED) at exact times

Mark doses as taken

Track adherence with activity logs

Ask AI chatbot about medication side effects & timing

Built using React.js, Arduino (C++), Web Serial API, and Google Gemini AI.

---------------------------------------

**🚀 Features**

**🔌 Hardware Integration**

Connect to Arduino Uno via Web Serial API

Real‑time communication at 9600 baud rate

Physical alerts: Buzzer + LED activate at scheduled times

---------------------------------------

**💊 Medication Management**

Add / edit / delete medicine doses

Set custom times for morning, afternoon, evening

Mark doses as Taken or see Pending status

------------------

📊 Adherence Tracking

Daily progress percentage (0–100%)

Complete activity log with timestamps

Missed dose detection

-------------------------------------------------------------------------

**🤖 AI Chat Assistant**

Powered by Google Gemini 1.0 Pro API

Answers questions like:

"What are side effects of Atorvastatin?"

"When is my next dose?"

"Did I miss any medicine today?"

Fallback responses when offline

 -------------------------------
 
🎨 User Interface

Clean dark‑theme dashboard

Real‑time clock sync with Arduino

One‑click "Sync to Arduino" for alarms


-------------------------------------------------

🛠️ Technologies Used

Frontend

React.js (18.2.0)

HTML5, CSS3

JavaScript (ES6)

Web Serial API

-----------------------------------------------------

**Backend / AI**

Google Gemini API (gemini-pro model)

REST API integration

**Hardware**

Arduino Uno

Buzzer (5V Active)

LED (5mm Red)

220Ω Resistor

Breadboard & Jumper Wires

-------------------------------------------------------


**Tools**

Arduino IDE

Node.js / npm

Git

Chrome/Edge Browser (Web Serial API support)

--------------------------------------------

📂 Project Structure

````bash
pill-reminder/
│
├── public/
├── src/
│   ├── App.js                 # Main React component
│   ├── App.css                # Styling
│   └── index.js               # Entry point
├── arduino/
│   └── pillguard.ino          # Arduino firmware
├── package.json
└── README.md

`````
--------------------------------------------------------------------------------

🔧 Hardware Setup (Circuit Diagram)

| Arduino Pin | Component     | Connection                      |
| ----------- | ------------- | ------------------------------- |
| 5V          | Buzzer (+)    | Positive terminal               |
| GND         | Buzzer (−)    | Negative terminal               |
| Pin 9       | Buzzer (SIG)  | Signal pin                      |
| Pin 13      | LED (Anode)   | Connected through 220Ω resistor |
| GND         | LED (Cathode) | Short leg / Ground connection   |


<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/6c7ab0c9-86ed-4f57-86db-67dffec14e71" />

----------------------------------------------------------

⚙️ How to Run This Project

````bash
⚙️ How to Run This Project
1️⃣ Install Requirements
Node.js & npm

Arduino IDE

Chrome or Edge browser

USB cable for Arduino

2️⃣ Upload Arduino Firmware
Open arduino/pillguard.ino in Arduino IDE

Select Board: Arduino Uno

Select Port: (your COM port)

Click Upload

3️⃣ Run React App

npm install
npm start
App will open at http://localhost:3000

4️⃣ Connect to Arduino
Click "Connect to Arduino" button in web app

Select the correct COM port

Check badge turns ● CONNECTED

5️⃣ Set Your Medication Schedule
Edit medicine names and times

Click "Sync to Arduino"

Wait for alarm time – buzzer + LED will activate

6️⃣ Try AI Chatbot
Click the 💬 button at bottom-right and ask:


What are side effects of Atorvastatin?
When is my next dose?
Test buzzer

````
-------------------------------------------

 🧪 Test Results

 | Feature            | Status          |
| ------------------ | --------------- |
| Arduino Connection | ✅ Pass          |
| Time Sync          | ✅ Pass (±1 sec) |
| Alarm Trigger      | ✅ Pass          |
| Buzzer + LED       | ✅ Pass          |
| AI Chat            | ✅ Pass          |
| Dose Tracking      | ✅ Pass          |


----------------------


**🔮 Future Enhancements**

Mobile app (React Native)

Push notifications & WhatsApp alerts

Snooze button

Voice alerts (medicine name)

Multiple patient profiles

Medicine stock tracker

Email reports for doctors

Smart pill dispenser (servo motor)

------------------------------------------

**📸 Screenshots**


<img width="1897" height="922" alt="Screenshot 2026-04-14 203920" src="https://github.com/user-attachments/assets/09dced98-6990-484c-a2c8-5af36b17eb90" />

<img width="361" height="523" alt="Screenshot 2026-04-14 204053" src="https://github.com/user-attachments/assets/3b5d7d62-7ecb-4d16-b7f5-3f051891e1e5" />


--------

🎥 Working Video

Drive link:

```bash
https://drive.google.com/drive/folders/1DfB0busA8JdsLG4scq97plL7yZ
2uM7Zy?usp=sharing

````
---------------------

👨‍💻 Team Details

S Mohammed Aakif

Mohammed Ammar Ghani S

Mohammed Danish B

**Guided By

Prof. Dr. Nirmala M**

-----------------------


**References**

World Health Organization. (2003). "Adherence to Long-Term Therapies: Evidence
for Action." WHO Press.

Arduino Documentation. (2024). "Arduino Uno Rev3." https://docs.arduino.cc/

Google AI. (2024). "Gemini API Documentation." https://ai.google.dev/

MDN Web Docs. (2024). "Web Serial API." https://developer.mozilla.org/en- US/docs/Web/API/Web_Serial_API

React Documentation. (2024). "React Quick Start." https://react.dev/

Brown, M. T., & Bussell, J. K. (2011). "Medication Adherence: WHO Cares?" Mayo
Clinic Proceedings, 86(4), 304-314. 

Sabaté, E. (2003). "Adherence to long-term therapies: evidence for action." World
Health Organization.

---------------

📄 License

Academic Project – For educational purposes only

--------------------------

⭐ Show Your Support
If this project helps you, give it a ⭐ on GitHub!

Mail for Suggestion: syedmdaakif007@gmail.com
