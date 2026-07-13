# Changelog

## 2026-07-11

### Refactor

- extracted provider utils
- extracted rosterTime utils
- extracted query utils
- extracted filterRoster utils
- extracted rosterOptions utils
- extracted toggleSelection utils
- extracted shuffle utils
- extracted buildRoster()

### Improvements

- reduced Roster.tsx from ~370 to ~270 lines
- extracted RosterTabs component
- tomorrow roster hidden before 7 PM
- Sydney timezone support
- shop day rollover changed to 5 AM

그리고 맥북에서 이어서 할 리스트ㅋㅋ

우선순위:

✅ Roster.tsx 275줄 → 180줄 정도까지
RosterFilters.tsx 검사 (왠지 얘도 300줄 넘을 냄새ㅋㅋ)
ModelProfilePage
Layout
HomePageㅎㄹㅎㅎ

개발노트
## 2026-07-13

UX idea (future)⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐

Investigate opening model profiles as a modal from the homepage instead of navigating away.

Benefits:

No back navigation required.
Preserve homepage scroll position, filters, and search state.
Faster browsing between models.

Possible implementation:

Clicking a model opens a modal and updates the URL using ?girl={id} or ?model={slug} via history.pushState.
Refreshing or visiting the shared URL automatically reopens the same profile.
Keep /girls/[slug] as a standalone page for SEO and direct access.

한국어:

모달은 가로 전체 화면의 90%, 세로 전체화면의 80%, 뒷배경이 보일것. 
booknow button:
<div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#bfa663]/40 bg-[#0b0b0b] p-4 shadow-[0_-4px_20px_rgba(191,166,99,0.2)] lg:hidden">
        <a
          href="tel:+61498100011"
          className="flex w-full items-center justify-center gap-3 border border-[#bfa663]/50 bg-[#14120f]/80 px-6 py-4 font-serif font-bold tracking-wide text-[#e8d6a8]"
        >
          <Phone className="h-5 w-5" />
          {t("common.bookNow")}
        </a>
      </div>
도 굉장히 이상함 지금ㅋㅋ  

