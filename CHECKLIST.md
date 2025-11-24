# Gangneung Vibes Expansion Checklist

## Goals
- [ ] Add approximately 200 tourist spots in Gangneung.
- [ ] Ensure "Yujin Makguksu" remains removed.
- [ ] Ensure data diversity (Food, Cafe, Activity, Stay, etc.).
- [ ] Verify all image URLs are functional (HTTP 200).
- [ ] Update Routes to reflect the new data.
- [ ] Complete Verification (Automated + Visual).

## Data Quality Steps
- [ ] **Volume:** Target ~200 entries.
- [ ] **Content:**
    - [ ] Real place names where possible.
    - [ ] Realistic metadata (tags, ratings 3.0-5.0).
    - [ ] Correct categorization.
- [ ] **Images:**
    - [ ] No broken links.
    - [ ] Thematic relevance (e.g., Cafe gets coffee image).

## Verification Steps
- [ ] JSON Syntax Check.
- [ ] Unique ID Check.
- [ ] Image Link Health Check (Python script).
- [ ] Frontend Render Check (Playwright).
