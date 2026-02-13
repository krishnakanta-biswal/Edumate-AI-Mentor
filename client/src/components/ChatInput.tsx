import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Send, Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
  onVoiceInput?: () => void;
  isRecording?: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, onVoiceInput, isRecording, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() || files.length > 0) {
      onSendMessage(message, files);
      setMessage("");
      setFiles([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(f => f.size <= 10 * 1024 * 1024);
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="border-t border-border bg-background p-4 space-y-2">
      {files.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="bg-secondary rounded-md px-3 py-1 text-sm flex items-center gap-2"
              data-testid={`file-preview-${idx}`}
            >
              <span className="text-secondary-foreground truncate max-w-[200px]">{file.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 hover:bg-secondary-foreground/10"
                onClick={() => removeFile(idx)}
                data-testid={`button-remove-file-${idx}`}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question here..."
            className="resize-none min-h-[48px] max-h-[120px] pr-24"
            disabled={disabled}
            data-testid="input-message"
          />
          <div className="absolute right-2 bottom-2 flex gap-1">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*,video/*"
              multiple
              className="hidden"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              data-testid="button-attach"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onVoiceInput}
              disabled={disabled}
              className={cn(isRecording && "text-destructive animate-pulse")}
              data-testid="button-voice"
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Button
          onClick={handleSend}
          disabled={disabled || (!message.trim() && files.length === 0)}
          data-testid="button-send"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
