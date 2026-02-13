import { ChatInput } from "../ChatInput";

export default function ChatInputExample() {
  return (
    <div className="bg-background">
      <ChatInput
        onSendMessage={(msg, files) => console.log("Message:", msg, "Files:", files)}
        onVoiceInput={() => console.log("Voice input clicked")}
        isRecording={false}
      />
    </div>
  );
}
