# CR8W WCAG Audit Page Integration Guide

## Scope and repository boundary

This guide applies only to the canonical CR8W source repository: `monnylog/create-well`. It does not apply to the separate Manus-generated `cr8w-accessibility-preview` project. The integrated route is `/wcag-results`, and the return destination is the CR8W dashboard route `/`.

## 1. Confirm the source repository

Clone or open the canonical repository:

```bash
gh repo clone monnylog/create-well
cd create-well
pnpm install --frozen-lockfile
```

Before making changes, confirm the application shell exists at `client/src/App.tsx`, the dashboard navigation exists at `client/src/components/Sidebar.tsx`, and the home dashboard is `client/src/pages/Home.tsx`.

## 2. Add the page component

Create `client/src/pages/WcagResults.tsx`. The page should contain an evidence-based record rather than an unqualified compliance claim. Use semantic HTML for the record: a single page heading, section headings, tables with `caption`, `scope="col"`, and `scope="row"`, status badges with text, and a clear note distinguishing implementation review from formal WCAG conformance.

The page should document the following two evidence groups:

| Group | Required evidence |
|---|---|
| Keyboard verification | Skip link, sequential focus, dashboard navigation, Escape behavior, dialog containment, and named interactive states. |
| Screen-reader readiness | Landmarks, headings, accessible names, form labels, active navigation, and the status of the native screen-reader session. |

Do not mark a native screen-reader session as passed until VoiceOver, NVDA, or Narrator has been used on the deployed CR8W dashboard. Record the operating system, browser, assistive technology, and test date when that session is completed.

## 3. Register the route

In `client/src/App.tsx`, import the new component and add the route before the fallback route:

```tsx
import WcagResults from "./pages/WcagResults";

<Route path="/wcag-results">
  <WcagResults />
</Route>
```

The page should remain inside the shared dashboard shell so the CR8W sidebar remains visible and the page can return to `/` without leaving the application.

## 4. Add dashboard navigation

In `client/src/components/Sidebar.tsx`, add a navigation item using an existing icon library icon:

```tsx
{ href: '/wcag-results', label: 'WCAG Test Results', icon: ShieldCheck },
```

The navigation item must use the existing route-aware active-state logic. Its visible label should remain present when the sidebar is expanded, and its icon should have a useful accessible name through the surrounding link text when collapsed.

## 5. Add return links

The page should include a visible `Back to dashboard` link near the top and a second return action near the release note. Both should target `/` and use normal links rather than click-only controls so browser history, keyboard navigation, and assistive technology remain predictable.

## 6. Preserve source-specific styling

Use the existing CR8W design tokens and utility classes from `client/src/index.css`. Do not copy the separate Manus preview stylesheet into this repository. The CR8W dashboard uses its own `terracotta`, `sage`, `sidebar`, `background`, `foreground`, `border`, and display/body font tokens.

## 7. Validate locally

Run the following checks from the repository root:

```bash
pnpm check
pnpm build
git diff --check
```

Open `/wcag-results` in the local preview and verify that:

1. The sidebar marks “WCAG Test Results” as active.
2. “Back to dashboard” returns to `/`.
3. The page heading is announced before the section headings.
4. Tables scroll horizontally on small screens without clipping their content.
5. Status badges communicate “Pass” and “Pending” in text, not color alone.

## 8. Complete the native screen-reader pass

Use a real assistive technology session against the deployed CR8W dashboard. Recommended combinations are VoiceOver with Safari on macOS, NVDA with Firefox or Chrome on Windows, or Narrator with Edge on Windows. Record the environment and test each route, sidebar item, heading, table, form, dialog, and return link.

The native session should verify that focus and reading order are understandable, the active navigation item is conveyed, dialog names are spoken, live status messages are not overly verbose, and the return link is announced with a useful destination.

## 9. Review and commit

Review the final diff to confirm that only the canonical CR8W repository changed:

```bash
git status --short
git diff -- client/src/App.tsx client/src/components/Sidebar.tsx client/src/pages/WcagResults.tsx docs/WCAG_AUDIT_PAGE_INTEGRATION.md
```

Create a focused branch and commit:

```bash
git switch -c accessibility/wcag-results-page
git add client/src/App.tsx client/src/components/Sidebar.tsx client/src/pages/WcagResults.tsx docs/WCAG_AUDIT_PAGE_INTEGRATION.md
git commit -m "Add WCAG accessibility test results page"
git push -u origin accessibility/wcag-results-page
```

Open a pull request for review rather than merging directly to `main` unless the repository’s normal release process explicitly permits direct merges.

## Maintenance rule

Update the evidence table whenever dashboard semantics or interaction behavior changes. A passing implementation check is not a permanent certification; it is a dated statement about the code and test environment that were actually reviewed.
