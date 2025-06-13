# Frontend Requirements

## Component Tree
- `App`
  - `AuthProvider`
  - `ChatPage`
    - `MessageList`
    - `InputBar`
  - `HistoryPage`
  - `MobileNav`

## Breakpoints
- Mobile: <640px single column
- Tablet: 641-1024px two-column layout
- Desktop: >1024px wide chat + sidebar

## Accessibility
- Semantic HTML for chat messages
- Keyboard navigation for input bar
- High-contrast mode using CSS variables
- aria-live region for new message announcements
