# AI/LLM Integration Patterns for Angular

Based on [Angular.dev AI Design Patterns](https://angular.dev/ai/design-patterns)

## Overview

This guide demonstrates how to integrate AI and Large Language Model (LLM) APIs into your Angular application using modern patterns with signals and the resource API.

---

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [Triggering AI Requests](#triggering-ai-requests)
3. [Managing Response Data](#managing-response-data)
4. [Streaming Responses](#streaming-responses)
5. [Performance & UX](#performance--ux)
6. [Complete Examples](#complete-examples)
7. [Best Practices](#best-practices)

---

## Core Concepts

### Why Signals for AI?

AI/LLM APIs present unique challenges:

- **Slow responses**: Can take seconds or minutes
- **Streaming data**: Partial results arrive over time
- **Error-prone**: Network issues, rate limits, timeouts
- **Expensive**: Each request costs money and resources

Angular signals provide:

- ✅ Fine-grained reactivity
- ✅ Efficient change detection
- ✅ Built-in async handling with `resource`
- ✅ Stream support for real-time updates

---

## Triggering AI Requests

### Pattern: Separate Input from Submission

**Problem:** You don't want to trigger an expensive AI API call on every keystroke.

**Solution:** Use two signals - one for live input, one for submission.

```typescript
import { Component, signal, resource } from "@angular/core";
import { inject } from "@angular/core";

@Component({
  selector: "app-ai-prompt",
  templateUrl: "./ai-prompt.html",
  styleUrl: "./ai-prompt.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AIPrompt {
  private aiService = inject(AIService);

  // Live user input (updates on every keystroke)
  userInput = signal("");

  // Submitted prompt (only updates when user clicks submit)
  submittedPrompt = signal("");

  // Resource triggered ONLY when submittedPrompt changes
  aiResponse = resource({
    params: () => this.submittedPrompt(),
    loader: async ({ params }) => {
      if (!params) return null;
      return await this.aiService.generateResponse(params);
    },
  });

  onSubmit() {
    // Update submission signal to trigger the resource
    this.submittedPrompt.set(this.userInput());
  }
}
```

**Template:**

```html
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">AI Assistant</h2>

    <!-- Input that doesn't trigger AI -->
    <textarea class="textarea textarea-bordered" placeholder="Ask me anything..." [value]="userInput()" (input)="userInput.set($any($event.target).value)"></textarea>

    <!-- Submit button triggers the AI call -->
    <button class="btn btn-primary" (click)="onSubmit()" [disabled]="aiResponse.isLoading() || !userInput()">
      @if (aiResponse.isLoading()) {
      <span class="loading loading-spinner"></span>
      Generating... } @else { Send to AI }
    </button>

    <!-- Display response -->
    @if (aiResponse.hasValue() && aiResponse.value()) {
    <div class="alert alert-success">{{ aiResponse.value() }}</div>
    }

    <!-- Error handling -->
    @if (aiResponse.error()) {
    <div class="alert alert-error">
      <span>{{ aiResponse.error()?.message }}</span>
      <button class="btn btn-sm" (click)="aiResponse.reload()">Retry</button>
    </div>
    }
  </div>
</div>
```

---

## Managing Response Data

### Pattern: LinkedSignal for Accumulating Data

**Problem:** You need to build up a chat history or accumulate streaming results.

**Solution:** Use `linkedSignal` to append new data to existing data.

```typescript
import { linkedSignal } from "@angular/core";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

@Component({
  selector: "app-chat",
  templateUrl: "./chat.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chat {
  private aiService = inject(AIService);

  userMessage = signal("");
  sessionId = signal(crypto.randomUUID());

  // Resource for individual responses
  chatResource = resource({
    params: () => ({
      message: this.userMessage(),
      sessionId: this.sessionId(),
    }),
    loader: async ({ params }) => {
      if (!params.message) return null;
      return await this.aiService.chat(params);
    },
  });

  // LinkedSignal to accumulate chat history
  chatHistory = linkedSignal<ChatMessage[], ChatMessage | null>({
    source: () => this.chatResource.value(),
    computation: (newMessage, previous) => {
      const existing = previous?.value || [];

      if (!newMessage) return existing;

      // Add user message and AI response
      return [
        ...existing,
        {
          role: "user",
          content: this.userMessage(),
          timestamp: new Date(),
        },
        {
          role: "assistant",
          content: newMessage.content,
          timestamp: new Date(),
        },
      ];
    },
  });

  sendMessage() {
    if (!this.userMessage()) return;
    // This will trigger chatResource, which updates chatHistory
    this.userMessage.set(""); // Clear after sending
  }
}
```

**Template:**

```html
<div class="chat-container">
  <!-- Chat history -->
  <div class="messages">
    @for (msg of chatHistory(); track msg.timestamp) {
    <div class="chat" [class.chat-start]="msg.role === 'assistant'" [class.chat-end]="msg.role === 'user'">
      <div class="chat-bubble" [class.chat-bubble-primary]="msg.role === 'user'" [class.chat-bubble-secondary]="msg.role === 'assistant'">{{ msg.content }}</div>
    </div>
    }

    <!-- Loading indicator -->
    @if (chatResource.isLoading()) {
    <div class="chat chat-start">
      <div class="chat-bubble">
        <span class="loading loading-dots"></span>
      </div>
    </div>
    }
  </div>

  <!-- Input -->
  <div class="input-group">
    <input class="input input-bordered w-full" placeholder="Type a message..." [value]="userMessage()" (input)="userMessage.set($any($event.target).value)" (keyup.enter)="sendMessage()" />
    <button class="btn btn-primary" (click)="sendMessage()">Send</button>
  </div>
</div>
```

---

## Streaming Responses

### Pattern: Real-time Streaming with resource.stream

**Problem:** LLM responses can be slow. You want to show partial results as they arrive.

**Solution:** Use `resource.stream` to update a signal as data streams in.

```typescript
interface StreamedContent {
  value: string;
}

@Component({
  selector: "app-streaming-ai",
  templateUrl: "./streaming-ai.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamingAI {
  private aiService = inject(AIService);

  prompt = signal("Tell me a story about a space explorer");

  // Streaming resource
  streamingResponse = resource({
    params: () => this.prompt(),
    stream: async ({ params }) => {
      // Create a signal to hold the streaming data
      const data = signal<ResourceStreamItem<string>>({ value: "" });

      // Get the stream from your AI service
      const stream = await this.aiService.streamGenerate(params);

      // Process chunks asynchronously
      (async () => {
        try {
          for await (const chunk of stream) {
            data.update((prev) => {
              if ("value" in prev) {
                return { value: `${prev.value}${chunk}` };
              }
              return prev;
            });
          }
        } catch (error) {
          data.set({ error: error as Error });
        }
      })();

      return data;
    },
  });
}
```

**AI Service with Streaming:**

```typescript
@Injectable({
  providedIn: "root",
})
export class AIService {
  private http = inject(HttpClient);

  async *streamGenerate(prompt: string): AsyncGenerator<string> {
    const response = await fetch("/api/ai/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      yield chunk;
    }
  }
}
```

**Template with Streaming:**

```html
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Streaming AI Response</h2>

    @if (streamingResponse.isLoading()) {
    <div class="prose max-w-none">
      <!-- Show partial content as it streams -->
      <p class="animate-pulse">{{ streamingResponse.value() }}</p>
      <div class="text-sm text-base-content/50">
        <span class="loading loading-dots"></span>
        Generating...
      </div>
    </div>
    } @else if (streamingResponse.hasValue()) {
    <div class="prose max-w-none">
      <p>{{ streamingResponse.value() }}</p>
    </div>
    } @else if (streamingResponse.error()) {
    <div class="alert alert-error">
      <span>Error: {{ streamingResponse.error()?.message }}</span>
      <button class="btn btn-sm" (click)="streamingResponse.reload()">Retry</button>
    </div>
    }
  </div>
</div>
```

---

## Performance & UX

### Best Practices for AI Features

#### 1. Scoped Resources

Place resources in the component that uses them to limit change detection:

```typescript
// ✅ Good: Resource in component
@Component({...})
export class AIFeature {
  aiResource = resource({...}); // Scoped to this component
}

// ❌ Avoid: Global resource unless shared
@Injectable({ providedIn: 'root' })
export class GlobalAIService {
  // Only do this if multiple components need the same data
  sharedResource = resource({...});
}
```

#### 2. SSR with Hydration

Show placeholders during SSR, load AI content after hydration:

```html
<!-- Initial SSR render -->
<div class="skeleton-placeholder">
  <div class="skeleton h-4 w-full mb-2"></div>
  <div class="skeleton h-4 w-3/4"></div>
</div>

<!-- After hydration, load AI content -->
@defer (on viewport) {
<app-ai-content />
}
```

#### 3. Loading Indicators

Always show clear loading states:

```html
@if (aiResource.isLoading()) {
<div class="loading-state">
  <progress class="progress progress-primary w-full"></progress>
  <p class="text-sm">AI is processing your request...</p>
  <p class="text-xs text-base-content/50">This may take a moment</p>
</div>
}
```

#### 4. Error Handling with Retry

Make it easy to retry failed requests:

```html
@if (aiResource.error()) {
<div class="alert alert-error">
  <div>
    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div>
      <h3 class="font-bold">Error</h3>
      <div class="text-xs">{{ aiResource.error()?.message }}</div>
    </div>
  </div>
  <button class="btn btn-sm btn-ghost" (click)="aiResource.reload()">
    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
    Retry
  </button>
</div>
}
```

---

## Complete Examples

### Example 1: AI Image Generator

```typescript
@Component({
  selector: "app-ai-image-gen",
  templateUrl: "./ai-image-gen.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AIImageGen {
  private aiService = inject(AIService);

  prompt = signal("");
  submittedPrompt = signal("");

  imageResource = resource({
    params: () => this.submittedPrompt(),
    loader: async ({ params }): Promise<{ url: string; metadata: any }> => {
      return await this.aiService.generateImage(params);
    },
  });

  generate() {
    this.submittedPrompt.set(this.prompt());
  }
}
```

```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <!-- Input Panel -->
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Generate Image</h2>
      <textarea class="textarea textarea-bordered h-32" placeholder="Describe the image you want..." [value]="prompt()" (input)="prompt.set($any($event.target).value)"></textarea>
      <button class="btn btn-primary" (click)="generate()" [disabled]="imageResource.isLoading() || !prompt()">Generate</button>
    </div>
  </div>

  <!-- Output Panel -->
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      @if (imageResource.isLoading()) {
      <div class="flex items-center justify-center h-64">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
      } @else if (imageResource.hasValue()) {
      <figure>
        <img [src]="imageResource.value().url" alt="Generated" class="rounded-lg" />
      </figure>
      } @else {
      <div class="flex items-center justify-center h-64 text-base-content/50">Generated image will appear here</div>
      }
    </div>
  </div>
</div>
```

### Example 2: AI Code Assistant

```typescript
interface CodeSuggestion {
  code: string;
  explanation: string;
  language: string;
}

@Component({
  selector: "app-code-assistant",
  templateUrl: "./code-assistant.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeAssistant {
  private aiService = inject(AIService);

  codeInput = signal("");
  language = signal("typescript");
  submittedRequest = signal<{ code: string; language: string } | null>(null);

  suggestionResource = resource({
    params: () => this.submittedRequest(),
    loader: async ({ params }): Promise<CodeSuggestion | null> => {
      if (!params) return null;
      return await this.aiService.suggestCodeImprovements(params);
    },
  });

  getSuggestions() {
    this.submittedRequest.set({
      code: this.codeInput(),
      language: this.language(),
    });
  }
}
```

---

## Best Practices

### ✅ DO

1. **Separate input from submission** to avoid triggering API on every keystroke
2. **Use linkedSignal** for accumulating chat history or streaming responses
3. **Show loading indicators** - AI responses can be slow
4. **Provide retry mechanisms** - use `resource.reload()`
5. **Type your responses** - define interfaces for AI output
6. **Scope resources** to components that use them
7. **Handle errors gracefully** - show user-friendly messages
8. **Use streaming** for long-form content generation
9. **Implement session management** with signals for persistent conversations
10. **Test with loading delays** to ensure good UX

### ❌ DON'T

1. **Don't trigger AI requests on every input change**
2. **Don't use `any` types** - define proper interfaces
3. **Don't forget loading states** - users need feedback
4. **Don't ignore errors** - AI APIs can fail
5. **Don't block the UI** - keep resources scoped
6. **Don't skip retry logic** - network issues happen
7. **Don't hardcode API keys** - use environment variables
8. **Don't forget rate limiting** - implement debouncing/throttling
9. **Don't assume instant responses** - plan for delays
10. **Don't skip SSR optimization** - use defer and placeholders

---

## Integration Examples

### Google Gemini

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable({ providedIn: "root" })
export class GeminiService {
  private genAI = new GoogleGenerativeAI(environment.geminiApiKey);

  async generateContent(prompt: string) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  async *streamContent(prompt: string) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      yield chunk.text();
    }
  }
}
```

### Firebase Genkit

```typescript
import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

const ai = genkit({ plugins: [googleAI()] });

export const chatFlow = ai.defineFlow(
  {
    name: "chat",
    inputSchema: z.object({ message: z.string() }),
    outputSchema: z.string(),
  },
  async (input) => {
    const result = await ai.generate({
      model: "googleai/gemini-pro",
      prompt: input.message,
    });
    return result.text;
  }
);
```

---

## Resources

- [Angular AI Design Patterns](https://angular.dev/ai/design-patterns)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Resource API Documentation](https://angular.dev/api/core/resource)
- [Google Gemini API](https://ai.google.dev/)
- [Firebase Genkit](https://firebase.google.com/docs/genkit)

---

**Happy AI Integration!** 🤖✨
