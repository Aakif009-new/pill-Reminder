import { useState, useRef, useEffect, useCallback } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080c14;
    --card: #0f1623;
    --card2: #131c2e;
    --border: #1e2d45;
    --accent: #00d4ff;
    --accent2: #0099bb;
    --green: #00e676;
    --amber: #ffab40;
    --red: #ff5252;
    --text: #e8f0fe;
    --muted: #6b7a99;
    --font: 'DM Sans', system-ui, sans-serif;
    --mono: 'JetBrains Mono', monospace;
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font); min-height: 100vh; }

  #root { max-width: 1100px; margin: 0 auto; padding: 24px 16px 48px; }

  .header {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 32px; padding-bottom: 20px;
    border-bottom: 1px solid var(--border);
  }
  .header-icon {
    width: 44px; height: 44px; border-radius: 12px;
    background: linear-gradient(135deg, #00d4ff22, #0099bb44);
    border: 1px solid #00d4ff44;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
  }
  .header h1 { font-size: 22px; font-weight: 600; letter-spacing: -0.3px; }
  .header p { font-size: 13px; color: var(--muted); font-weight: 300; }
  .badge {
    margin-left: auto; font-family: var(--mono); font-size: 11px;
    padding: 4px 10px; border-radius: 20px; font-weight: 500;
    letter-spacing: 0.5px;
  }
  .badge-connected { background: #00e67622; color: var(--green); border: 1px solid #00e67644; }
  .badge-disconnected { background: #ff525222; color: var(--red); border: 1px solid #ff525244; }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px; }

  @media (max-width: 700px) {
    .grid-2 { grid-template-columns: 1fr; }
    .grid-3 { grid-template-columns: 1fr; }
  }

  .card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; padding: 20px;
  }
  .card-title {
    font-size: 11px; font-weight: 500; letter-spacing: 1.2px;
    text-transform: uppercase; color: var(--muted); margin-bottom: 16px;
  }

  .section-label {
    font-size: 11px; font-weight: 500; letter-spacing: 1.2px;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 12px; margin-top: 24px;
  }

  .status-row { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .dot-green { background: var(--green); box-shadow: 0 0 8px var(--green); }
  .dot-red { background: var(--red); }
  .dot-amber { background: var(--amber); animation: pulse-amber 1.5s infinite; }
  @keyframes pulse-amber { 0%,100%{opacity:1} 50%{opacity:.4} }

  .status-text { font-size: 14px; color: var(--muted); }
  .status-text strong { color: var(--text); font-weight: 500; }

  .btn {
    font-family: var(--font); font-size: 13px; font-weight: 500;
    padding: 9px 18px; border-radius: 8px; cursor: pointer;
    border: 1px solid transparent; transition: all 0.15s; letter-spacing: 0.2px;
    white-space: nowrap;
  }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .btn-primary {
    background: var(--accent); color: #080c14; border-color: var(--accent);
  }
  .btn-primary:hover:not(:disabled) { background: #33ddff; }
  .btn-ghost {
    background: transparent; color: var(--muted); border-color: var(--border);
  }
  .btn-ghost:hover:not(:disabled) { background: var(--card2); color: var(--text); border-color: #2e4060; }
  .btn-danger {
    background: transparent; color: var(--red); border-color: #ff525244;
  }
  .btn-danger:hover:not(:disabled) { background: #ff525215; }
  .btn-success {
    background: #00e67622; color: var(--green); border-color: #00e67644;
  }
  .btn-sm { font-size: 12px; padding: 6px 12px; border-radius: 6px; }
  .btn-row { display: flex; gap: 8px; flex-wrap: wrap; }

  .pill-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; padding: 18px; position: relative; overflow: hidden;
  }
  .pill-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  }
  .pill-morning::before { background: linear-gradient(90deg, #ffab40, #ff7043); }
  .pill-afternoon::before { background: linear-gradient(90deg, #00d4ff, #00bcd4); }
  .pill-evening::before { background: linear-gradient(90deg, #7c4dff, #651fff); }

  .pill-label { font-size: 11px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .pill-name { font-size: 15px; font-weight: 500; color: var(--text); margin-bottom: 12px; }
  .pill-name input {
    background: var(--card2); border: 1px solid var(--border);
    border-radius: 6px; padding: 4px 8px; font-family: var(--font);
    font-size: 14px; font-weight: 500; color: var(--text); width: 100%;
    outline: none; transition: border-color 0.15s;
  }
  .pill-name input:focus { border-color: var(--accent); }

  .time-row { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
  .time-display {
    font-family: var(--mono); font-size: 22px; font-weight: 600;
    color: var(--accent); letter-spacing: -0.5px;
  }
  .time-input {
    background: var(--card2); border: 1px solid var(--border); border-radius: 6px;
    padding: 4px 8px; font-family: var(--mono); font-size: 16px;
    color: var(--text); outline: none; transition: border-color 0.15s;
    color-scheme: dark;
  }
  .time-input:focus { border-color: var(--accent); }

  .status-pill {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 500; padding: 3px 10px;
    border-radius: 20px; letter-spacing: 0.3px;
  }
  .status-pending { background: #ffab4022; color: var(--amber); border: 1px solid #ffab4044; }
  .status-taken { background: #00e67622; color: var(--green); border: 1px solid #00e67644; }

  .alarm-banner {
    background: var(--red); border-radius: 12px;
    padding: 16px 20px; margin-bottom: 16px;
    display: flex; align-items: center; gap: 14px;
    animation: blink-banner 0.7s infinite;
  }
  @keyframes blink-banner { 0%,100%{opacity:1} 50%{opacity:.6} }
  .alarm-icon { font-size: 24px; }
  .alarm-text { font-size: 15px; font-weight: 600; color: #fff; }
  .alarm-sub { font-size: 12px; color: rgba(255,255,255,0.75); margin-top: 2px; }
  .alarm-close {
    margin-left: auto; background: rgba(255,255,255,0.2); border: none;
    color: #fff; border-radius: 6px; padding: 4px 10px; cursor: pointer;
    font-size: 12px; font-family: var(--font);
  }

  .log-box {
    background: #060a10; border: 1px solid var(--border); border-radius: 10px;
    height: 200px; overflow-y: auto; padding: 12px; font-family: var(--mono);
    font-size: 11.5px; line-height: 1.8;
    scrollbar-width: thin; scrollbar-color: var(--border) transparent;
  }
  .log-entry { display: flex; gap: 10px; }
  .log-time { color: #3a5070; flex-shrink: 0; }
  .log-msg-normal { color: #7a9fc0; }
  .log-msg-send { color: var(--accent); }
  .log-msg-alarm { color: var(--red); font-weight: 600; }
  .log-msg-ok { color: var(--green); }
  .log-msg-warn { color: var(--amber); }

  .arduino-time {
    font-family: var(--mono); font-size: 32px; font-weight: 600;
    color: var(--text); letter-spacing: -1px; text-align: center;
    padding: 8px 0;
  }
  .arduino-time-label { text-align: center; font-size: 11px; color: var(--muted); margin-top: 4px; letter-spacing: 1px; text-transform: uppercase; }

  .divider { border: none; border-top: 1px solid var(--border); margin: 20px 0; }

  .sync-confirm {
    font-size: 12px; color: var(--green); margin-top: 8px;
    font-family: var(--mono);
  }

  .info-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
  .info-key { font-size: 12px; color: var(--muted); }
  .info-val { font-size: 12px; font-family: var(--mono); color: var(--text); }

  @keyframes typingBounce {
    0%,60%,100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-5px); opacity: 1; }
  }
`;

const QUICK_REPLIES = [
  { label: "⏰ Next dose", text: "When is my next dose?" },
  { label: "📊 Today's progress", text: "How am I doing today?" },
  { label: "💊 My medicines", text: "What medicines do I have?" },
  { label: "🔔 Test buzzer", text: "Test buzzer" },
  { label: "❌ Missed doses", text: "Did I miss any dose?" },
  { label: "📈 Adherence", text: "My adherence rate?" },
];

const DEFAULT_DOSES = [
  { id: "morning", label: "Morning Dose", color: "morning", icon: "🌅", name: "Metformin 500mg", time: "08:00", status: "pending" },
  { id: "afternoon", label: "Afternoon Dose", color: "afternoon", icon: "☀️", name: "Lisinopril 10mg", time: "14:00", status: "pending" },
  { id: "evening", label: "Evening Dose", color: "evening", icon: "🌙", name: "Atorvastatin 20mg", time: "22:43", status: "pending" },
];

// Gemini API Key 
const GEMINI_API_KEY = "AIzaSyCMZnHcHnCMjmre_eWBHY2nccfA6QuUIb0";

function timestamp() {
  return new Date().toLocaleTimeString("en-US", { hour12: false });
}

function timeToMins(t = "") {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function getCurrentHHMM() {
  return new Date().toTimeString().slice(0, 5);
}

// AI Question Box Component with Gemini API
function AIQuestionBox({ connected, doses, alarmSetTo, sendCommand, markTaken }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [useGemini, setUseGemini] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const detectIntent = useCallback((text) => {
    const t = text.toLowerCase();
    if (/next dose|next med|when to take|next pill/.test(t)) return "NEXT_DOSE";
    if (/how am i|my progress|today|doing/.test(t)) return "TODAY_SUMMARY";
    if (/list med|what med|my pills|my medicines/.test(t)) return "LIST_MEDICINES";
    if (/test buzzer|check buzzer|beep|buzzer/.test(t)) return "TEST_BUZZER";
    if (/missed|forgot|skip/.test(t)) return "MISSED_DOSE";
    if (/adherence|rate|percentage/.test(t)) return "ADHERENCE_RATE";
    if (/took |taken /.test(t)) return "MARK_TAKEN";
    if (/help|what can you do|commands/.test(t)) return "HELP";
    return "UNKNOWN";
  }, []);

  const getRuleBasedResponse = useCallback((intent, rawText) => {
    const nowMins = timeToMins(getCurrentHHMM());
    const hour = new Date().getHours();
    const lateNight = hour >= 22;
    const alarmActive = alarmSetTo === getCurrentHHMM();

    let reply = "";

    switch (intent) {
      case "NEXT_DOSE": {
        const pending = doses.filter((d) => d.status === "pending").sort((a, b) => timeToMins(a.time) - timeToMins(b.time));
        if (!pending.length) {
          reply = "🎉 All doses completed for today! Great job staying on track!";
        } else {
          const next = pending[0];
          const diff = timeToMins(next.time) - nowMins;
          const timeStr = diff > 0 && diff <= 60 ? `\n⏱ That's in about ${diff} minute${diff === 1 ? "" : "s"}.` : diff <= 0 ? "\n⚠️ This dose is overdue!" : "";
          reply = `💊 Your next dose is ${next.name} at ${next.time} (${next.label}).${timeStr}`;
        }
        break;
      }
      case "TODAY_SUMMARY": {
        const total = doses.length;
        const taken = doses.filter((d) => d.status === "taken").length;
        const pct = Math.round((taken / total) * 100);
        const list = doses.map((d) => `  ${d.status === "taken" ? "✅" : "⏳"} ${d.name} — ${d.time}`).join("\n");
        reply = `📊 Today's Summary\nYou've taken ${taken} of ${total} doses (${pct}%).\n\n${list}`;
        if (taken === total) reply += "\n\n🎉 Perfect adherence today!";
        break;
      }
      case "LIST_MEDICINES": {
        const list = doses.map((d, i) => `${i + 1}. ${d.name} at ${d.time} — ${d.status === "taken" ? "✅ Taken" : "⏳ Pending"}`).join("\n");
        reply = `💊 Your Medicines (${doses.length} total):\n${list}`;
        break;
      }
      case "TEST_BUZZER": {
        if (connected) {
          sendCommand("TEST_BEEP\n");
          reply = "🔔 Buzzer test sent! Did you hear the beep?\n\nIf not, check your Arduino connection.";
        } else {
          reply = "❌ Arduino not connected. Please click 'Connect to Arduino' first, then try again.";
        }
        break;
      }
      case "MISSED_DOSE": {
        const missed = doses.filter((d) => d.status === "pending" && timeToMins(d.time) < nowMins);
        if (!missed.length) {
          reply = "✅ No missed doses so far! You're right on schedule.";
        } else {
          const list = missed.map((d) => `  ⚠️ ${d.name} was scheduled at ${d.time}`).join("\n");
          reply = `❌ You have ${missed.length} missed dose${missed.length > 1 ? "s" : ""}:\n${list}\n\nPlease take them as soon as possible.`;
        }
        break;
      }
      case "ADHERENCE_RATE": {
        const total = doses.length;
        const taken = doses.filter((d) => d.status === "taken").length;
        const pct = Math.round((taken / total) * 100);
        const emoji = pct === 100 ? "🌟" : pct >= 75 ? "👍" : pct >= 50 ? "⚠️" : "🔴";
        reply = `📈 Adherence Rate: ${pct}% ${emoji}\nBased on today: ${taken}/${total} doses taken.\n\n${pct === 100 ? "Perfect! Keep it up!" : pct >= 75 ? "Good job — just a few left!" : "Try to stay on schedule for best results."}`;
        break;
      }
      case "MARK_TAKEN": {
        const lower = rawText.toLowerCase();
        const match = doses.find((d) => lower.includes(d.name.toLowerCase().split(" ")[0]));
        if (match) {
          markTaken(match.id);
          reply = `✅ Marked ${match.name} as taken! Great job.`;
        } else {
          reply = 'I couldn\'t identify which medicine. Try: "took Metformin" or tap 💊 My medicines to see full names.';
        }
        break;
      }
      case "HELP":
        reply = "🤖 What I can do:\n• ⏰ Tell you your next dose\n• 📊 Summarize today's progress\n• 💊 List all your medicines\n• 🔔 Test the Arduino buzzer\n• ❌ Check for missed doses\n• 📈 Show your adherence rate\n• ✅ Mark a dose as taken\n\nJust type naturally or use the quick-reply chips!";
        break;
      default:
        reply = null;
    }

    if (reply && (alarmActive || lateNight)) {
      if (alarmActive) reply += "\n\n⚠️ Alarm is currently active! Please take your medicine now.";
      if (lateNight) reply += "\n\n💡 Tip: Don't forget your medicines before sleeping!";
    }

    return reply;
  }, [connected, doses, alarmSetTo, sendCommand, markTaken]);

  // ✅ FIXED: Changed gemini-1.5-flash to gemini-pro
  const callGemini = async (userQuestion) => {
    try {
      const context = {
        currentTime: new Date().toLocaleTimeString(),
        doses: doses.map(d => ({
          name: d.name,
          time: d.time,
          status: d.status
        })),
        alarmSetTo: alarmSetTo,
        arduinoConnected: connected
      };

      const prompt = `You are PillGuard AI, a friendly medication reminder assistant. 
      
Context about user's medications:
- Current time: ${context.currentTime}
- Medicines: ${JSON.stringify(context.doses)}
- Alarm set for: ${context.alarmSetTo || "No alarm set"}
- Arduino connected: ${context.arduinoConnected ? "Yes" : "No"}

User question: "${userQuestion}"

Provide a helpful, concise response (max 2-3 sentences) about their medication schedule. Be encouraging and use emojis occasionally.`;

      // ✅ FIXED: Using correct model name "gemini-pro"
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }]
          })
        }
      );

      const data = await response.json();
      
      if (data.error) {
        console.error("Gemini API Error:", data.error);
        return getFallbackAnswer(userQuestion);
      }
      
      return data.candidates?.[0]?.content?.parts?.[0]?.text || getFallbackAnswer(userQuestion);
    } catch (error) {
      console.error("Gemini API Error:", error);
      return getFallbackAnswer(userQuestion);
    }
  };

  // Fallback answers when API fails
  const getFallbackAnswer = (question) => {
    const q = question.toLowerCase();
    
    if (q.includes("atorvastatin") && q.includes("side")) {
      return "⚠️ Atorvastatin side effects: muscle pain, headache, nausea, diarrhea, joint pain. Serious side effects (rare): muscle damage, liver problems. Consult your doctor if you experience unexplained muscle pain or dark urine.";
    }
    if (q.includes("metformin") && q.includes("side")) {
      return "⚠️ Metformin side effects: nausea, vomiting, diarrhea, stomach upset, metallic taste. Taking with food can help. Serious (rare): lactic acidosis - seek immediate care if you feel very weak or have muscle pain.";
    }
    if (q.includes("lisinopril") && q.includes("side")) {
      return "⚠️ Lisinopril side effects: dry cough, dizziness, headache, fatigue. Serious (rare): angioedema (swelling of face/lips/throat), kidney problems. Seek help if you have trouble breathing.";
    }
    if (q.includes("side effect")) {
      return "💊 For medication side effects, please consult your doctor or pharmacist. I can help with reminders and schedule questions!";
    }
    
    return "🤖 I'm your medication assistant! Ask me about your next dose, medicines list, or side effects!";
  };

  useEffect(() => {
    const hour = new Date().getHours();
    const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    setMessages([{
      role: "ai",
      text: `${greet} 👋 I'm PillGuard AI — your personal medication assistant.\n\nAsk me anything about your doses, or tap a quick-reply below!`,
      ts: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const addMessage = useCallback((role, text) => {
    setMessages((prev) => {
      const next = [...prev, { role, text, ts: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }];
      return next.slice(-50);
    });
  }, []);

  const handleSend = useCallback(async (text) => {
    const msg = (text ?? inputText).trim();
    if (!msg || isTyping) return;
    setInputText("");
    addMessage("user", msg);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 300));

    const intent = detectIntent(msg);
    const ruleResponse = getRuleBasedResponse(intent, msg);
    
    let finalReply;
    
    if (ruleResponse) {
      finalReply = ruleResponse;
    } else if (useGemini) {
      finalReply = await callGemini(msg);
    } else {
      finalReply = "🤔 I didn't catch that. Try a quick-reply chip, or ask things like:\n• \"When is my next dose?\"\n• \"Did I miss anything?\"\n• \"Test the buzzer\"";
    }
    
    setIsTyping(false);
    addMessage("ai", finalReply);
  }, [inputText, isTyping, detectIntent, getRuleBasedResponse, useGemini, addMessage]);

  const clearChat = () => {
    setMessages([{ role: "ai", text: "Chat cleared. What can I help you with? 💊", ts: new Date().toLocaleTimeString() }]);
  };

  return (
    <>
      <div style={{
        position: "fixed", bottom: 90, right: 24,
        width: 300, height: 400,
        background: "#13161e",
        border: "1px solid #1e2330",
        borderRadius: 16,
        display: "flex", flexDirection: "column",
        boxShadow: "0 16px 60px rgba(0,0,0,0.5)",
        transformOrigin: "bottom right",
        transform: isOpen ? "scale(1)" : "scale(0)",
        opacity: isOpen ? 1 : 0,
        transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s",
        pointerEvents: isOpen ? "all" : "none",
        zIndex: 1000,
        fontFamily: "'Courier New', monospace",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "#0d0f14", borderBottom: "1px solid #1e2330", borderRadius: "16px 16px 0 0", flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#00c896,#0077ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>💊</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: "0.05em", textTransform: "uppercase" }}>PillGuard AI</div>
            <div style={{ fontSize: 10, color: "#00c896", marginTop: 1 }}>● Powered by Gemini AI</div>
          </div>
          <button onClick={() => setUseGemini(!useGemini)} style={{ background: useGemini ? "#00c89622" : "#ff525222", border: `1px solid ${useGemini ? "#00c89644" : "#ff525244"}`, color: useGemini ? "#00c896" : "#ff5252", borderRadius: 6, width: 26, height: 26, cursor: "pointer", fontSize: 10 }}>🤖</button>
          <button onClick={clearChat} style={{ background: "transparent", border: "1px solid #1e2330", color: "#8892a4", borderRadius: 6, width: 26, height: 26, cursor: "pointer", fontSize: 11 }}>🗑</button>
          <button onClick={() => setIsOpen(false)} style={{ background: "transparent", border: "1px solid #1e2330", color: "#8892a4", borderRadius: 6, width: 26, height: 26, cursor: "pointer", fontSize: 11 }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "12px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ maxWidth: "88%", alignSelf: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                padding: "8px 11px",
                borderRadius: 11,
                fontSize: 11.5,
                lineHeight: 1.55,
                whiteSpace: "pre-wrap",
                ...(m.role === "ai"
                  ? { background: "#1a1e2a", border: "1px solid #1e2330", color: "#c8d3e6", borderBottomLeftRadius: 3 }
                  : { background: "linear-gradient(135deg,#003d7a,#005fa3)", border: "1px solid #0077cc44", color: "#e8f4ff", borderBottomRightRadius: 3 }),
              }}>
                {m.text}
              </div>
              <div style={{ fontSize: 9, color: "#4a5568", marginTop: 3, textAlign: m.role === "user" ? "right" : "left" }}>{m.ts}</div>
            </div>
          ))}
          {isTyping && (
            <div style={{ display: "flex", gap: 4, padding: "8px 11px", background: "#1a1e2a", border: "1px solid #1e2330", borderRadius: 11, borderBottomLeftRadius: 3, width: "fit-content" }}>
              {[0, 1, 2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#00c896", display: "inline-block", animation: `typingBounce 1.1s ${i * 0.15}s infinite` }} />)}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: "6px 10px 4px", display: "flex", flexWrap: "wrap", gap: 4, borderTop: "1px solid #1a1e2a", flexShrink: 0 }}>
          {QUICK_REPLIES.map((q) => (
            <button key={q.text} onClick={() => handleSend(q.text)} style={{ background: "#1a1e2a", border: "1px solid #1e2330", color: "#8892a4", borderRadius: 20, padding: "3px 9px", fontSize: 10, cursor: "pointer", fontFamily: "'Courier New', monospace", whiteSpace: "nowrap" }}>{q.label}</button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 6, padding: "8px 10px", background: "#0d0f14", borderTop: "1px solid #1e2330", borderRadius: "0 0 16px 16px", flexShrink: 0 }}>
          <input
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about your meds…"
            style={{ flex: 1, background: "#1a1e2a", border: "1px solid #1e2330", borderRadius: 7, color: "#e2e8f0", fontSize: 11.5, fontFamily: "'Courier New',monospace", padding: "7px 9px", outline: "none" }}
          />
          <button onClick={() => handleSend()} disabled={isTyping} style={{ background: "linear-gradient(135deg,#00c896,#0077ff)", border: "none", borderRadius: 7, width: 32, height: 32, cursor: "pointer", color: "#fff", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", opacity: isTyping ? 0.4 : 1 }}>➤</button>
        </div>
      </div>

      <button
        onClick={() => setIsOpen((o) => !o)}
        style={{
          position: "fixed", bottom: 24, right: 24,
          width: 52, height: 52, borderRadius: "50%",
          background: isOpen ? "linear-gradient(135deg,#ff4466,#cc2244)" : "linear-gradient(135deg,#00c896,#0077ff)",
          border: "none", cursor: "pointer", fontSize: 22,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,200,150,0.35)",
          transition: "background 0.3s, transform 0.2s",
          zIndex: 1001,
        }}
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </>
  );
}

// Main App Component
export default function App() {
  const [connected, setConnected] = useState(false);
  const [doses, setDoses] = useState(DEFAULT_DOSES);
  const [log, setLog] = useState([{ ts: timestamp(), msg: "PillGuard ready. Connect to Arduino to begin.", type: "normal" }]);
  const [arduinoTime, setArduinoTime] = useState("--:--:--");
  const [alarmBanner, setAlarmBanner] = useState(false);
  const [syncConfirm, setSyncConfirm] = useState("");
  const [alarmSetTo, setAlarmSetTo] = useState("");

  const portRef = useRef(null);
  const writerRef = useRef(null);
  const readerRef = useRef(null);
  const logBoxRef = useRef(null);
  const bannerTimerRef = useRef(null);

  const addLog = useCallback((msg, type = "normal") => {
    setLog(prev => [...prev.slice(-199), { ts: timestamp(), msg, type }]);
  }, []);

  useEffect(() => {
    if (logBoxRef.current) {
      logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
    }
  }, [log]);

  const sendCommand = useCallback(async (cmd) => {
    if (!writerRef.current) return;
    try {
      const enc = new TextEncoder();
      await writerRef.current.write(enc.encode(cmd));
      addLog(`→ ${cmd.trim()}`, "send");
    } catch (e) {
      addLog(`Send error: ${e.message}`, "warn");
    }
  }, [addLog]);

  const handleLine = useCallback((line) => {
    if (!line.trim()) return;
    if (line.startsWith("TIME:")) {
      const t = line.replace("TIME:", "");
      setArduinoTime(t);
      return;
    }
    if (line === "PillGuard ready. Connect to Arduino to begin.") {
      addLog("Arduino: PillGuard ready!", "ok");
      return;
    }
    if (line === "ALARM_TRIGGERED") {
      addLog("🔔 ALARM! Time to take medication!", "alarm");
      setAlarmBanner(true);
      clearTimeout(bannerTimerRef.current);
      bannerTimerRef.current = setTimeout(() => setAlarmBanner(false), 10000);
      return;
    }
    if (line.startsWith("ALARM_SET_TO:")) {
      const t = line.replace("ALARM_SET_TO:", "");
      setAlarmSetTo(t);
      addLog(`Arduino: Alarm set to ${t}`, "ok");
      return;
    }
    if (line === "BEEPING_COMPLETE") {
      addLog("Buzzer finished beeping", "ok");
      return;
    }
    addLog(`← ${line}`, "normal");
  }, [addLog]);

  const startReading = useCallback(async (port) => {
    const decoder = new TextDecoderStream();
    port.readable.pipeTo(decoder.writable);
    const reader = decoder.readable.getReader();
    readerRef.current = reader;
    let buf = "";
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += value;
        const lines = buf.split("\n");
        buf = lines.pop();
        lines.forEach(l => handleLine(l.trim()));
      }
    } catch (e) {
      if (!e.message.includes("cancel")) addLog(`Read error: ${e.message}`, "warn");
    }
  }, [handleLine, addLog]);

  const connect = async () => {
    try {
      if (!navigator.serial) {
        addLog("Web Serial API not supported. Use Chrome or Edge.", "warn");
        return;
      }
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });
      portRef.current = port;
      const writer = port.writable.getWriter();
      writerRef.current = writer;
      setConnected(true);
      addLog("Connected to Arduino at 9600 baud.", "ok");
      startReading(port);
    } catch (e) {
      if (e.name !== "NotFoundError") addLog(`Connection error: ${e.message}`, "warn");
    }
  };

  const disconnect = async () => {
    try {
      readerRef.current?.cancel().catch(() => {});
      writerRef.current?.releaseLock();
      await portRef.current?.close();
    } catch (_) {}
    portRef.current = null;
    writerRef.current = null;
    readerRef.current = null;
    setConnected(false);
    setArduinoTime("--:--:--");
    addLog("Disconnected from Arduino.", "normal");
  };

  const syncAlarm = async () => {
    const evening = doses.find(d => d.id === "evening");
    if (!evening) return;
    await sendCommand(`SET_ALARM:${evening.time}\n`);
    setSyncConfirm(`Sent: SET_ALARM:${evening.time}`);
    setTimeout(() => setSyncConfirm(""), 4000);
  };

  const markTaken = (id) => {
    setDoses(prev => prev.map(d => d.id === id ? { ...d, status: "taken" } : d));
    const dose = doses.find(d => d.id === id);
    addLog(`✓ ${dose?.name || id} marked as taken.`, "ok");
  };

  const resetAll = () => {
    setDoses(prev => prev.map(d => ({ ...d, status: "pending" })));
    addLog("Daily statuses reset to Pending.", "normal");
  };

  const updateDose = (id, field, value) => {
    setDoses(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  useEffect(() => {
    if (!connected || !writerRef.current) return;

    const interval = setInterval(() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      sendCommand(`TIME:${hh}:${mm}:${ss}\n`);
    }, 1000);

    return () => clearInterval(interval);
  }, [connected, sendCommand]);

  return (
    <>
      <style>{STYLES}</style>

      <div className="header">
        <div className="header-icon">💊</div>
        <div>
          <h1>PillGuard</h1>
          <p>Smart medication reminder system</p>
        </div>
        <span className={`badge ${connected ? "badge-connected" : "badge-disconnected"}`}>
          {connected ? "● CONNECTED" : "○ OFFLINE"}
        </span>
      </div>

      {alarmBanner && (
        <div className="alarm-banner">
          <span className="alarm-icon">🔔</span>
          <div>
            <div className="alarm-text">Time to take your medication!</div>
            <div className="alarm-sub">Check your schedule and mark the dose as taken.</div>
          </div>
          <button className="alarm-close" onClick={() => setAlarmBanner(false)}>Dismiss</button>
        </div>
      )}

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Arduino Connection</div>
          <div className="status-row">
            <div className={`dot ${connected ? "dot-green" : "dot-red"}`} />
            <span className="status-text">
              {connected ? <><strong>Connected</strong> — receiving data</> : <><strong>Disconnected</strong> — click to connect</>}
            </span>
          </div>
          <div className="btn-row">
            {!connected
              ? <button className="btn btn-primary" onClick={connect}>Connect to Arduino</button>
              : <button className="btn btn-danger" onClick={disconnect}>Disconnect</button>
            }
          </div>
          {connected && (
            <>
              <hr className="divider" />
              <div className="arduino-time">{arduinoTime}</div>
              <div className="arduino-time-label">Current Time from React</div>
            </>
          )}
        </div>

        <div className="card">
          <div className="card-title">Alarm Control</div>
          <div className="info-row">
            <span className="info-key">Synced alarm</span>
            <span className="info-val">{alarmSetTo || "—"}</span>
          </div>
          <div className="info-row">
            <span className="info-key">Trigger source</span>
            <span className="info-val">Evening Dose</span>
          </div>
          <div className="info-row">
            <span className="info-key">Current value</span>
            <span className="info-val" style={{ color: "var(--accent)" }}>
              {doses.find(d => d.id === "evening")?.time}
            </span>
          </div>
          <hr className="divider" />
          <div className="btn-row">
            <button className="btn btn-primary" onClick={syncAlarm} disabled={!connected}>
              Sync to Arduino
            </button>
            <button className="btn btn-ghost" onClick={resetAll}>Reset Daily</button>
          </div>
          {syncConfirm && <div className="sync-confirm">{syncConfirm}</div>}
        </div>
      </div>

      <div className="section-label">Medicine Schedule</div>
      <div className="grid-3">
        {doses.map(dose => (
          <div key={dose.id} className={`pill-card pill-${dose.color}`}>
            <div className="pill-label">{dose.icon} {dose.label}</div>
            <div className="pill-name">
              <input
                value={dose.name}
                onChange={e => updateDose(dose.id, "name", e.target.value)}
                placeholder="Medicine name"
              />
            </div>
            <div className="time-row">
              <input
                type="time"
                className="time-input"
                value={dose.time}
                onChange={e => updateDose(dose.id, "time", e.target.value)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
              <span className={`status-pill ${dose.status === "taken" ? "status-taken" : "status-pending"}`}>
                {dose.status === "taken" ? "✓ Taken" : "● Pending"}
              </span>
              <button
                className={`btn btn-sm ${dose.status === "taken" ? "btn-ghost" : "btn-success"}`}
                onClick={() => markTaken(dose.id)}
                disabled={dose.status === "taken"}
              >
                {dose.status === "taken" ? "Done" : "Mark Taken"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="section-label">Activity Log</div>
      <div className="card" style={{ padding: 12 }}>
        <div className="log-box" ref={logBoxRef}>
          {log.map((entry, i) => (
            <div key={i} className="log-entry">
              <span className="log-time">{entry.ts}</span>
              <span className={`log-msg-${entry.type}`}>{entry.msg}</span>
            </div>
          ))}
        </div>
      </div>

      <AIQuestionBox
        connected={connected}
        doses={doses}
        alarmSetTo={alarmSetTo}
        sendCommand={sendCommand}
        markTaken={markTaken}
      />
    </>
  );
}