Nightshade Website (Roster-First Build)
=======================================

This project is a **lean, roster-centric website** designed to prioritise daily browsing and fast navigation, without unnecessary marketing layers getting in the way.

Unlike the No5 site, this build intentionally strips things back and focuses on **what users actually click**.

* * * * *

Current Features
----------------

### ✅ Roster-First Homepage

-   Homepage opens **directly to the roster**

-   No hero sections, no banners pushing content down

-   Designed for fast scanning and minimal scrolling

### ✅ Advanced Filtering

-   Filter by:

    -   Nationality

    -   Services

-   Filters apply instantly to the roster grid

### ✅ Smart Navigation (The Good Stuff)

-   When a user:

    1.  Selects filters

    2.  Clicks a girl profile

    3.  Clicks **Back to Roster**

-   👉 **All filters are preserved**

-   No reset, no rage, no re-clicking

This is done via browser history navigation rather than re-routing, keeping state intact.

### ✅ Individual Profile Pages

-   Dedicated profile page per model

-   Image carousel

-   Rates (30 / 45 / 60)

-   Services availability

-   Clean back navigation to roster

* * * * *

Intentionally Not Included (For Now)
------------------------------------

### ❌ News Banner

-   No homepage news banner

-   Reason:

    -   Not all venues need constant announcements

    -   Avoids pushing roster content below the fold

-   Can be added later **without refactoring core layout**

### ❌ "Our Girls" Carousel

-   No separate carousel section

-   Reason:

    -   This site relies on **daily rosters**, not weekly marketing

    -   Carousel makes more sense once:

        -   Weekly roster data exists

        -   Or static "featured girls" become relevant

-   Planned as a **future enhancement**, not removed permanently

* * * * *

Design Philosophy
-----------------

-   **Roster over marketing**

-   **Speed over decoration**

-   **State preserved > fancy routing**

-   Features are added **only when justified by real usage**

This keeps the site:

-   Easier to maintain

-   Faster to load

-   Less fragile when requirements change

* * * * *

Future Enhancements (Optional)
------------------------------

-   Weekly roster support

-   Re-introduce girl carousel when weekly data exists

-   Optional news banner module (plug-and-play)

-   Deep-linked filtered URLs (if SEO becomes a priority)