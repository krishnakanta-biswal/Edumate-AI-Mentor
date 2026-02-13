import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  onSpeak?: () => void;
}

export function ChatMessage({ role, content, onSpeak }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
      data-testid={`message-${role}`}
    >
      {!isUser && (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-primary text-primary-foreground text-sm">AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-lg px-4 py-3 space-y-2",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-card-border"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        {!isUser && onSpeak && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSpeak}
            className="h-7 px-2 text-xs no-default-hover-elevate"
            data-testid="button-speak"
          >
            <Volume2 className="w-3 h-3 mr-1" />
            Listen
          </Button>
        )}
      </div>
      {isUser && (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-sm">U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
