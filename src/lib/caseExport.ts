import type { UIMessage } from 'ai';

export const CASE_EXPORT_NOTICE = [
  'IMPORTANT NOTICE',
  'This document was generated with artificial intelligence for self-defense preparation, educational, and research purposes only.',
  'It is not legal advice, is not a substitute for a licensed attorney, and does not create an attorney-client relationship.',
  'AI-generated material may be incomplete, inaccurate, or outdated. Laws and procedures vary by jurisdiction.',
  'Verify all facts, citations, deadlines, and legal conclusions with a qualified licensed attorney before relying on, sharing, submitting, or filing this document.',
  'No outcome is promised or guaranteed. You remain responsible for how this material is used.',
].join('\n');

const textFromMessage = (message: UIMessage) =>
  (message.parts ?? [])
    .map((part) => {
      if (part.type === 'text') return part.text;
      if (part.type === 'file') {
        const file = part as { filename?: string; mediaType?: string };
        return `[Attached evidence: ${file.filename ?? 'unnamed file'}${
          file.mediaType ? ` — ${file.mediaType}` : ''
        }]`;
      }
      return '';
    })
    .filter(Boolean)
    .join('\n');

const timestampFromMessage = (message: UIMessage) => {
  const metadata = message.metadata as { createdAt?: string | number | Date } | undefined;
  if (!metadata?.createdAt) return '';
  const date = new Date(metadata.createdAt);
  return Number.isNaN(date.getTime()) ? '' : ` — ${date.toLocaleString()}`;
};

export const buildCaseExport = (
  title: string,
  messages: UIMessage[],
  exportedAt = new Date(),
) => {
  const transcript = messages
    .map((message) => {
      const speaker = message.role === 'assistant' ? 'PUBLIC DEFENDER GPT (AI)' : 'USER';
      return `${speaker}${timestampFromMessage(message)}\n${textFromMessage(message) || '[No text]'}`;
    })
    .join('\n\n');

  return [
    'PUBLIC DEFENDER GPT — CASE RESEARCH EXPORT',
    `Case: ${title || 'Untitled case'}`,
    `Exported: ${exportedAt.toLocaleString()}`,
    '',
    CASE_EXPORT_NOTICE,
    '',
    'CASE CONVERSATION',
    '=================',
    transcript,
    '',
    'END OF CASE EXPORT',
    '',
    CASE_EXPORT_NOTICE,
  ].join('\n');
};

export const caseExportFilename = (title: string) => {
  const safeTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
  return `${safeTitle || 'public-defender-case'}-ai-research.txt`;
};