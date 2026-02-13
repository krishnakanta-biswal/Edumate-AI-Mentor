import { ChatMessage } from "../ChatMessage";

export default function ChatMessageExample() {
  return (
    <div className="p-8 bg-background max-w-2xl">
      <ChatMessage
        role="user"
        content="What is the Pythagorean theorem?"
      />
      <ChatMessage
        role="assistant"
        content="The Pythagorean theorem states that in a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of squares of the other two sides. It can be written as: a² + b² = c²"
        onSpeak={() => console.log("Speak clicked")}
      />
    </div>
  );
}
