---
date: 2025-05-13T23:06:24+08:00
lastmod: 2025-05-13T23:06:42+08:00
---
## 任务总览

```dataview
TABLE status, deadline, priority
FROM "tasks"
WHERE contains(tags, "task")
SORT deadline ASC
```

## 本周耗时统计

```dataview
TASK 
FROM "2024-08-01" OR "2024-08-02" OR "2024-08-03"
WHERE !completed
GROUP BY file.day
```

## 高优先级任务

```dataview
TASK 
FROM "tasks"
WHERE priority = "high" AND !completed
```
