import { describe, expect, test } from 'bun:test';
import { buildCaseExport, CASE_EXPORT_NOTICE } from './caseExport';

describe('case export notice', () => {
  test('places the complete protective notice at the beginning and end', () => {
    const messages = [
      { id: 'one', role: 'user', parts: [{ type: 'text', text: 'Case details' }] },
    ];
    const output = buildCaseExport('My case', messages, new Date('2026-10-06T00:00:00Z'));

    expect(output.split(CASE_EXPORT_NOTICE)).toHaveLength(3);
    expect(output).toContain('generated with artificial intelligence');
    expect(output).toContain('self-defense preparation, educational, and research purposes only');
    expect(output).toContain('not legal advice');
    expect(output).toContain('does not create an attorney-client relationship');
    expect(output).toContain('may be incomplete, inaccurate, or outdated');
    expect(output).toContain('licensed attorney before relying on, sharing, submitting, or filing');
  });
});