# Specification

## Summary
**Goal:** Fix the “Failed to load work items” issue so the My Work section reliably shows work videos, and ensure the provided YouTube links render as embedded videos.

**Planned changes:**
- Debug and fix the underlying cause of the “Failed to load work items” state in the My Work section.
- Add a frontend fallback so if the backend work-items query fails, a seeded/default non-empty list of work items is still rendered (while logging the error details to the browser console).
- Add the user-provided YouTube URLs as work items and render them as embedded YouTube iframes (including Shorts links), with an external link opening the original URL in a new tab.

**User-visible outcome:** The portfolio page’s My Work section loads without showing “Failed to load work items” under normal conditions, and it displays embedded players for the provided YouTube videos (with a link to open each video on YouTube).
