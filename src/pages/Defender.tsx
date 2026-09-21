import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { ArrowLeft, Plus, Scale, Trash2 } from 'lucide-react';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from '@/components/ai-elements/prompt-input';
import { Shimmer } from '@/components/ai-elements/shimmer';
import { useCaseThreads } from '@/hooks/useCaseThreads';
import { useToast } from '@/hooks/use-toast';
import emblem from '@/assets/defender-emblem.png';

const SUGGESTIONS = [
  'I was arrested last night — where do we start?',
  'The police searched my car without a warrant.',
  'Help me draft a motion to suppress.',
  'Should I take the plea deal I was offered?',
];

const DefenderChat: React.FC<{ threadId: string }> = ({ threadId }) => {
  const { threads, saveMessages } = useCaseThreads();
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);

  const initialMessages = useMemo(
    () => threads.find((t) => t.id === threadId)?.messages ?? [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [threadId],
  );

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/defender-chat`,
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      }),
    [],
  );

  const { messages, sendMessage, status, stop } = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
    onError: (error) =>
      toast({
        title: 'Your defender could not respond',
        description: error.message || 'Please try again in a moment.',
        variant: 'destructive',
      }),
  });

  useEffect(() => {
    if (messages.length > 0) saveMessages(threadId, messages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, threadId]);

  const focusInput = useCallback(() => {
    formRef.current?.querySelector('textarea')?.focus();
  }, []);

  useEffect(() => {
    focusInput();
  }, [threadId, status, focusInput]);

  const isBusy = status === 'submitted' || status === 'streaming';

  const submit = (text: string) => {
    const value = text.trim();
    if (!value || isBusy) return;
    sendMessage({ text: value });
  };

  return (
    <div className="flex h-full flex-col">
      <Conversation className="flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl">
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={
                <img
                  src={emblem}
                  alt="Public Defender GPT emblem"
                  width={96}
                  height={96}
                  loading="lazy"
                  className="h-24 w-24 drop-shadow-[0_0_20px_hsl(var(--primary)/0.5)]"
                />
              }
              title="Your defender is ready"
              description="Tell me what you're charged with and what happened. Everything you share here stays in this browser."
            >
              <div className="mt-6 grid w-full gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => submit(s)}
                    className="rounded-lg border border-border bg-card/60 px-4 py-3 text-left text-sm text-foreground/80 transition-colors hover:border-primary/60 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </ConversationEmptyState>
          ) : (
            messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, index) =>
                    part.type === 'text' ? (
                      <MessageResponse key={`${message.id}-${index}`}>{part.text}</MessageResponse>
                    ) : null,
                  )}
                </MessageContent>
              </Message>
            ))
          )}
          {status === 'submitted' && (
            <Shimmer className="px-2 text-sm">Reviewing your case...</Shimmer>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="mx-auto w-full max-w-3xl px-2 pb-4" ref={formRef}>
        <PromptInput
          onSubmit={(message) => {
            submit(message.text ?? '');
          }}
        >
          <PromptInputTextarea placeholder="Tell your defender what happened..." />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} onStop={stop} />
          </PromptInputFooter>
        </PromptInput>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Public Defender GPT is an AI assistant, not a licensed attorney. This is legal
          information, not legal advice.
        </p>
      </div>
    </div>
  );
};

const Defender: React.FC = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const { threads, createThread, ensureThread, deleteThread } = useCaseThreads();

  useEffect(() => {
    if (!threadId) {
      const thread = ensureThread();
      navigate(`/defender/${thread.id}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId]);

  useEffect(() => {
    document.title = 'Your Digital Public Defender | Public Defender GPT';
  }, []);

  const handleNew = () => {
    const thread = createThread();
    navigate(`/defender/${thread.id}`);
  };

  const handleDelete = (id: string) => {
    const remaining = deleteThread(id);
    if (id !== threadId) return;
    if (remaining.length > 0) navigate(`/defender/${remaining[0].id}`, { replace: true });
    else navigate('/defender', { replace: true });
  };

  return (
    <div className="flex h-screen flex-col bg-cyber-black text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
        <div className="flex items-center gap-2">
          <img src={emblem} alt="" width={28} height={28} className="h-7 w-7" />
          <span className="text-sm font-semibold tracking-tight">
            Public Defender<span className="text-cyber-purple">GPT</span>
          </span>
        </div>
        <button
          type="button"
          onClick={handleNew}
          className="flex items-center gap-1.5 rounded-lg bg-cyber-blue px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-cyber-blue/90"
        >
          <Plus className="h-3.5 w-3.5" /> New case
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 md:flex">
          <div className="px-4 py-3 text-xs uppercase tracking-widest text-white/40">
            Your cases
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-4">
            {threads.length === 0 && (
              <p className="px-2 text-sm text-white/40">No cases yet.</p>
            )}
            {threads.map((thread) => (
              <div
                key={thread.id}
                className={`group mb-1 flex items-center gap-1 rounded-lg px-2 transition-colors ${
                  thread.id === threadId ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <button
                  type="button"
                  onClick={() => navigate(`/defender/${thread.id}`)}
                  className="flex min-w-0 flex-1 items-center gap-2 py-2.5 text-left"
                >
                  <Scale className="h-3.5 w-3.5 shrink-0 text-cyber-blue" />
                  <span className="truncate text-sm text-white/80">{thread.title}</span>
                </button>
                <button
                  type="button"
                  aria-label="Delete case"
                  onClick={() => handleDelete(thread.id)}
                  className="rounded p-1 text-white/30 opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {threadId ? <DefenderChat key={threadId} threadId={threadId} /> : null}
        </main>
      </div>
    </div>
  );
};

export default Defender;
