# Downloadable case file

## What will be added
- Add a **Download case** control to the Public Defender GPT case workspace.
- Export the current conversation as a readable text file, including message timestamps where available and uploaded-evidence filenames.
- Place a prominent notice at both the beginning and end of every export stating that it is AI-generated, for self-defense preparation, education, and research only; it is not legal advice, does not create an attorney-client relationship, may contain errors, and should be reviewed by a licensed attorney before use or filing.
- Disable the download when the current case has no saved material, and provide clear success feedback after export.

## Technical details
- Generate the file entirely in the browser so private case content is not sent elsewhere for export.
- Use the existing saved case-thread data and current design system.
- Add a focused automated test that verifies every export carries the required protective notice.
