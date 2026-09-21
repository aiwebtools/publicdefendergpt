import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type FileUIPart } from 'ai';
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Loader2,
  Paperclip,
  Plus,
  Scale,
  Square,
  Trash2,
  Volume2,
  X,
} from 'lucide-react';
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
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputAttachments,
} from '@/components/ai-elements/prompt-input';
import { Shimmer } from '@/components/ai-elements/shimmer';
import { Button } from '@/components/ui/button';
import { useCaseThreads } from '@/hooks/useCaseThreads';
import { useToast } from '@/hooks/use-toast';
import emblem from '@/assets/defender-emblem.png';

const PUBLIC_DEFENDER_CHATGPT_URL = 'https://chatgpt.com/g/g-hwvpFOifW-public-defender-gpt';
const CONTRACT_REVIEW_CHATGPT_URL = 'https://chatgpt.com/g/g-Y8u3YrS1p-contract-review-bot';
const LEGAL_DRAFTSMITH_CHATGPT_URL = 'https://chatgpt.com/g/g-psFYnFC8P-legal-draftsmith-gpt';
const CREDIT_FALLBACK_TEXT =
  'Sorry — community credits have run out for today. Please try the Public Defender GPT (CHATGPT version) while the Public Defender GPT (INSITE version) is unavailable.';
const SPEAK_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/defender-speak`;

const SUGGESTIONS = [
  'I was arrested last night — where do we start?',
  'The police searched my car without a warrant.',
  'Help me draft a motion to suppress.',
  'Should I take the plea deal I was offered?',
];

const AttachmentStrip: React.FC = () => {
  const attachments = usePromptInputAttachments();
  if (attachments.files.length === 0) return null;

  return (
    <PromptInputHeader>
      {attachments.files.map((file) => (
        <div
          key={file.id}
          className="relative flex items-center gap-2 rounded-md border border-border bg-card/70 px-2 py-1 text-xs text-foreground/80"
        >
          {file.mediaType?.startsWith('image/') && file.url ? (
            <img src={file.url} alt={file.filename ?? 'attachment'} className="h-8 w-8 rounded object-cover" />
          ) : (
            <FileText className="h-4 w-4 text-cyber-blue" />
          )}
          <span className="max-w-[10rem] truncate">{file.filename ?? 'file'}</span>
          <button
            type="button"
            aria-label="Remove attachment"
            onClick={() => attachments.remove(file.id)}
            className="rounded p-0.5 text-foreground/50 hover:text-destructive"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </PromptInputHeader>
  );
};

const AttachButton: React.FC = () => {
  const attachments = usePromptInputAttachments();
  return (
    <button
      type="button"
      onClick={attachments.openFileDialog}
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-foreground/70 transition-colors hover:bg-white/10 hover:text-foreground"
    >
      <Paperclip className="h-3.5 w-3.5" /> Upload evidence
    </button>
  );
};

const DefenderChat: React.FC<{ threadId: string }> = ({ threadId }) => {
  const { threads, saveMessages } = useCaseThreads();
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showCreditFallback, setShowCreditFallback] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [loadingVoiceId, setLoadingVoiceId] = useState<string | null>(null);

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
    onError: (error) => {
      const message = error.message || 'Please try again in a moment.';
      const lower = message.toLowerCase();
      if (
        lower.includes('credit') ||
        lower.includes('402') ||
        lower.includes('billing') ||
        lower.includes('quota') ||
        lower.includes('limit') ||
        lower.includes('unavailable')
      ) {
        setShowCreditFallback(true);
      }

      toast({
        title: 'Your defender could not respond',
        description: message,
        variant: 'destructive',
      });
    },
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

  useEffect(
    () => () => {
      audioRef.current?.pause();
      audioRef.current = null;
    },
    [],
  );

  const stopAudio = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    setSpeakingId(null);
  }, []);

  const speak = useCallback(
    async (messageId: string, text: string) => {
      if (speakingId === messageId) {
        stopAudio();
        return;
      }
      stopAudio();
      if (!text.trim()) return;

      setLoadingVoiceId(messageId);
      try {
        const response = await fetch(SPEAK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text }),
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body.error || 'The voice could not be generated right now.');
        }

        const blob = await response.blob();
        const audio = new Audio(URL.createObjectURL(blob));
        audioRef.current = audio;
        audio.onended = () => setSpeakingId(null);
        setSpeakingId(messageId);
        await audio.play();
      } catch (error) {
        setSpeakingId(null);
        toast({
          title: 'Voice unavailable',
          description: error instanceof Error ? error.message : 'Please try again in a moment.',
          variant: 'destructive',
        });
      } finally {
        setLoadingVoiceId(null);
      }
    },
    [speakingId, stopAudio, toast],
  );

  const isBusy = status === 'submitted' || status === 'streaming';

  const submit = (text: string, files?: FileUIPart[]) => {
    const value = text.trim();
    if ((!value && !files?.length) || isBusy) return;
    setShowCreditFallback(false);
    sendMessage({ text: value || 'Please analyze the attached evidence.', files });
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
              description="Tell me what you're charged with and what happened. Upload police reports, photos or documents and I'll read them line by line. Everything you share here stays in this browser."
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
            messages.map((message) => {
              const spokenText = message.parts
                .filter((part) => part.type === 'text')
                .map((part) => (part as { text: string }).text)
                .join('\n');

              return (
                <Message from={message.role} key={message.id}>
                  <MessageContent>
                    {message.parts.map((part, index) => {
                      if (part.type === 'text') {
                        return (
                          <MessageResponse key={`${message.id}-${index}`}>{part.text}</MessageResponse>
                        );
                      }
                      if (part.type === 'file') {
                        const file = part as { url: string; mediaType?: string; filename?: string };
                        return file.mediaType?.startsWith('image/') ? (
                          <img
                            key={`${message.id}-${index}`}
                            src={file.url}
                            alt={file.filename ?? 'Uploaded evidence'}
                            className="mt-2 max-h-72 rounded-lg border border-border object-contain"
                          />
                        ) : (
                          <a
                            key={`${message.id}-${index}`}
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-2 rounded-md border border-border px-2 py-1 text-xs text-foreground/80"
                          >
                            <FileText className="h-3.5 w-3.5 text-cyber-blue" />
                            {file.filename ?? 'Attached document'}
                          </a>
                        );
                      }
                      return null;
                    })}
                    {message.role === 'assistant' && spokenText.trim() && (
                      <button
                        type="button"
                        onClick={() => speak(message.id, spokenText)}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-cyber-blue/40 px-2 py-1 text-xs text-cyber-blue transition-colors hover:bg-cyber-blue/10"
                      >
                        {loadingVoiceId === message.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : speakingId === message.id ? (
                          <Square className="h-3.5 w-3.5" />
                        ) : (
                          <Volume2 className="h-3.5 w-3.5" />
                        )}
                        {speakingId === message.id ? 'Stop' : 'Listen'}
                      </button>
                    )}
                  </MessageContent>
                </Message>
              );
            })
          )}
          {status === 'submitted' && (
            <Shimmer className="px-2 text-sm">Reviewing your case...</Shimmer>
          )}
          {showCreditFallback && (
            <div className="mx-2 mt-4 rounded-lg border border-cyber-blue/40 bg-card/80 p-4 text-sm shadow-lg blue-glow">
              <p className="font-medium text-foreground">{CREDIT_FALLBACK_TEXT}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" className="bg-cyber-blue text-white hover:bg-cyber-blue/90">
                  <a href={PUBLIC_DEFENDER_CHATGPT_URL} target="_blank" rel="noopener noreferrer">
                    Public Defender GPT (CHATGPT version)
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="border-cyber-purple/50 bg-transparent text-white hover:bg-cyber-purple/20 hover:text-white">
                  <a href={CONTRACT_REVIEW_CHATGPT_URL} target="_blank" rel="noopener noreferrer">
                    Contract Review Bot (CHATGPT version)
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline" className="border-cyber-purple/50 bg-transparent text-white hover:bg-cyber-purple/20 hover:text-white">
                  <a href={LEGAL_DRAFTSMITH_CHATGPT_URL} target="_blank" rel="noopener noreferrer">
                    Legal Draftsmith AI (CHATGPT version)
                  </a>
                </Button>
              </div>
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="mx-auto w-full max-w-3xl px-2 pb-4" ref={formRef}>
        <PromptInput
          accept="image/*,application/pdf"
          multiple
          maxFiles={6}
          maxFileSize={20 * 1024 * 1024}
          onError={(err) =>
            toast({ title: 'Upload problem', description: err.message, variant: 'destructive' })
          }
          onSubmit={(message) => {
            submit(message.text ?? '', message.files);
          }}
        >
          <AttachmentStrip />
          <PromptInputTextarea placeholder="Tell your defender what happened, or attach a police report or photo..." />
          <PromptInputFooter>
            <PromptInputTools>
              <AttachButton />
            </PromptInputTools>
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
