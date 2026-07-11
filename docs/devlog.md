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
HomePage