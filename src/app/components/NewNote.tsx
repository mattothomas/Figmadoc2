import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Mic, MicOff, Circle } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

export function NewNote() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [noteType, setNoteType] = useState("soap");
  const [patientName, setPatientName] = useState("");
  const [transcript, setTranscript] = useState("");
  const [generatedNote, setGeneratedNote] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRecordToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingTime(0);
      const interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
      
      setTimeout(() => {
        clearInterval(interval);
        setIsRecording(false);
        setTranscript(
          "Patient presents with chief complaint of persistent cough for the past week. " +
          "Reports dry cough, worse at night, no fever. Denies chest pain or shortness of breath. " +
          "Has been taking over-the-counter cough suppressant with minimal relief. " +
          "Past medical history includes seasonal allergies and hypertension, well controlled on lisinopril. " +
          "Physical exam reveals clear lung sounds bilaterally, no wheezing, normal respiratory rate. " +
          "Throat appears slightly erythematous. Vital signs within normal limits. " +
          "Assessment: likely viral upper respiratory infection. " +
          "Plan: Recommend increased fluid intake, honey for cough suppression, follow up if symptoms worsen or persist beyond two weeks."
        );
        toast.success("Recording completed");
      }, 5000);
    } else {
      setIsRecording(false);
    }
  };

  const handleGenerateNote = () => {
    if (!transcript || !patientName) {
      toast.error("Please provide patient name and transcript");
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const note = `SOAP NOTE

Patient: ${patientName}
Date: March 12, 2026
Provider: Dr. Sarah Johnson, MD

SUBJECTIVE:
Chief Complaint: Persistent dry cough for one week

History of Present Illness:
The patient presents with a one-week history of persistent dry cough. The cough is notably worse during nighttime hours. The patient denies any associated fever, chest pain, or shortness of breath. Has attempted self-treatment with over-the-counter cough suppressant medications with minimal symptomatic relief.

Past Medical History:
- Seasonal allergies
- Hypertension (well-controlled)

Current Medications:
- Lisinopril (for hypertension management)

OBJECTIVE:
Vital Signs: Within normal limits
Respiratory: Clear breath sounds bilaterally, no wheezing appreciated
ENT: Mild erythema of posterior pharynx
General: Alert and oriented, in no acute distress

ASSESSMENT:
Viral upper respiratory infection

PLAN:
1. Conservative management with increased oral fluid intake
2. Honey for natural cough suppression
3. Patient education provided regarding expected course of viral illness
4. Follow-up if symptoms worsen or persist beyond 2 weeks
5. Return precautions discussed

Patient verbalized understanding of diagnosis and treatment plan.`;
      
      setGeneratedNote(note);
      setIsGenerating(false);
      toast.success("Note generated");
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
        className="border-b border-slate-200"
      >
        <div className="max-w-[1600px] mx-auto px-12 py-16">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">New Documentation</p>
          <h1 className="text-5xl font-light text-slate-900 tracking-tight">Clinical Note</h1>
        </div>
      </motion.section>

      <div className="max-w-[1600px] mx-auto px-12 py-16">
        <div className="grid grid-cols-2 gap-px bg-slate-200">
          {/* Left Panel - Recording */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1.0, 0.22, 1.0] }}
            className="bg-white p-12"
          >
            {/* Patient Info */}
            <div className="mb-16 space-y-8">
              <div>
                <Label className="text-xs uppercase tracking-widest text-slate-500 mb-3 block">Patient Name</Label>
                <Input
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter name"
                  className="border-0 border-b border-slate-200 rounded-none px-0 focus:border-slate-900 focus:ring-0 text-lg"
                />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-widest text-slate-500 mb-3 block">Note Type</Label>
                <Select value={noteType} onValueChange={setNoteType}>
                  <SelectTrigger className="border-0 border-b border-slate-200 rounded-none px-0 focus:border-slate-900 focus:ring-0 text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soap">SOAP Note</SelectItem>
                    <SelectItem value="progress">Progress Note</SelectItem>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="procedure">Procedure Note</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Recording Interface */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs uppercase tracking-widest text-slate-500">Recording</span>
                <span className="font-mono text-2xl text-slate-900 tracking-tight">{formatTime(recordingTime)}</span>
              </div>
              
              <button
                onClick={handleRecordToggle}
                className="w-full py-16 border border-slate-200 hover:border-slate-900 transition-colors group"
              >
                <div className="flex flex-col items-center gap-6">
                  <AnimatePresence mode="wait">
                    {isRecording ? (
                      <motion.div
                        key="recording"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                      >
                        <MicOff className="w-8 h-8 text-slate-900" />
                        <motion.div
                          className="absolute -inset-4 border border-slate-900"
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Mic className="w-8 h-8 text-slate-400 group-hover:text-slate-900 transition-colors" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors">
                    {isRecording ? "Stop Recording" : "Start Recording"}
                  </span>
                </div>
              </button>
            </div>

            {/* Transcript */}
            <div>
              <Label className="text-xs uppercase tracking-widest text-slate-500 mb-4 block">Transcript</Label>
              <Textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Transcript will appear here..."
                className="min-h-[240px] border-slate-200 rounded-none resize-none focus:border-slate-900 focus:ring-0 text-sm leading-relaxed"
              />
            </div>

            {/* Generate Button */}
            <div className="mt-8">
              <Button
                onClick={handleGenerateNote}
                disabled={isGenerating || !transcript || !patientName}
                className="w-full h-14 bg-slate-900 hover:bg-slate-700 text-white disabled:bg-slate-200 disabled:text-slate-400 transition-colors text-sm uppercase tracking-widest"
              >
                {isGenerating ? "Generating..." : "Generate Note"}
              </Button>
            </div>
          </motion.div>

          {/* Right Panel - Generated Note */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1.0, 0.22, 1.0] }}
            className="bg-slate-50 p-12"
          >
            <div className="mb-8">
              <span className="text-xs uppercase tracking-widest text-slate-500">Generated Output</span>
            </div>

            <AnimatePresence mode="wait">
              {generatedNote ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <Textarea
                    value={generatedNote}
                    onChange={(e) => setGeneratedNote(e.target.value)}
                    className="min-h-[600px] border-0 bg-white font-mono text-xs leading-loose resize-none focus:ring-0 p-8"
                  />
                  <div className="flex gap-px">
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedNote);
                        toast.success("Copied");
                      }}
                      variant="outline"
                      className="flex-1 h-12 border-slate-200 hover:bg-slate-100 text-xs uppercase tracking-widest"
                    >
                      Copy
                    </Button>
                    <Button
                      onClick={() => toast.success("Saved")}
                      className="flex-1 h-12 bg-slate-900 hover:bg-slate-700 text-white text-xs uppercase tracking-widest"
                    >
                      Save
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-[600px]"
                >
                  <div className="text-center">
                    <Circle className="w-4 h-4 text-slate-300 mx-auto mb-4" />
                    <p className="text-sm text-slate-400">Awaiting generation</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
