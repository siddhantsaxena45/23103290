
# Stage 1 - API Design

REST APIs are used for notification management.

## APIs

- GET /notifications
- POST /notifications
- PATCH /notifications/:id/read

## Features

- pagination support
- filtering by notification type
- JSON responses

The backend implementation includes notification retrieval and priority notification APIs.

---

# Stage 2 - Database Design

PostgreSQL is proposed for reliable querying and indexing.

## Table Schema

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  student_id INT,
  type VARCHAR(20),
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP
);
````

## Indexes

Indexes can be added on:

* student_id
* is_read
* created_at

---

# Stage 3 - Query Optimization

The original query is slow because:

* SELECT * fetches unnecessary columns
* no composite index exists
* sorting large datasets is expensive

## Optimized Query

```sql
SELECT id, type, message, created_at
FROM notifications
WHERE student_id = 1042
AND is_read = false
ORDER BY created_at DESC
LIMIT 50;
```

## Composite Index

```sql
CREATE INDEX idx_notifications
ON notifications(student_id, is_read, created_at);
```

This optimization reduces unnecessary scans and improves sorting performance.

---

# Stage 4 - Scaling Improvements

To improve scalability:

* pagination can be used
* Redis caching can reduce DB load
* WebSockets can provide realtime updates
* read replicas can distribute traffic

These improvements help reduce latency and improve performance at scale.

---

# Stage 5 - Async Notification Architecture

Synchronous notification sending is slow and unreliable.

A queue-based architecture is recommended.

## Flow

Producer -> Queue -> Worker

## Advantages

* retry support
* failure isolation
* faster API response
* better scalability

Failed jobs can be moved to a dead-letter queue.

---

# Stage 6 - Priority Notification Logic

Priority notifications are implemented using weighted scoring.

## Weights

* Placement = 100
* Result = 80
* Event = 60

## Formula

Priority Score = Weight - Time Decay

Recent and important notifications receive higher priority scores.

The backend API returns the top notifications sorted by calculated priority score.



