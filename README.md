# Hotel Orchid Bodhgaya

A production-ready Next.js App Router recreation of the supplied Hotel Orchid Bodhgaya reference design.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Notes

- The supplied reference image is the visual source of truth.
- All hotel/attraction imagery is centralized in `lib/images.ts` so the client can replace the placeholder photography without touching components.
- The enquiry form is frontend-functional with validation and a success state; connect the submit handler to an API/email provider when the backend is ready.
- The contact map is intentionally an embed-ready visual placeholder rather than a fake Google Maps screenshot. Replace the `.map` block with a real Google Maps iframe/API component when the exact property coordinates are confirmed.
- The design uses custom CSS for pixel-level layout control and Lucide React for icons.
