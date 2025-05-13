---
date: 2025-05-13T23:07:58+08:00
lastmod: 2025-05-13T23:08:26+08:00
---
```dataview
TABLE conference, deadline
FROM "papers"
WHERE status != "submitted"
SORT deadline ASC
```
