---
created: {{date}}
tags: task
status: todo  # 可选：todo/doing/done
priority: high/medium/low
deadline: {{date+7d}}  # 使用自然语言日期（如"2025-08-01"）
date: 2025-05-13T22:54:56+08:00
lastmod: 2025-05-13T22:55:07+08:00
---

### **任务描述**

{{填写具体任务，例如："完成MIT 6.S081 Lab3"}}

### **执行记录**

```dataview
task 
from "tasks" 
where file.name = this.file.name 
```

### **时间消耗**

- 预计耗时：{{X}}小时
- 实际耗时：{{用Toggl记录后填写}}
