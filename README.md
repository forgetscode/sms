# sms
Serverless messaging protocol v0.1

Implementation currently requires all program account data to be queried resulting in poor scalability.

Intended optimization features

- Split up message and chat program to prefetch chat accounts with offset. Drastically improves indexing.
- Consider borsch serialization for compact and more private data. Improves loading.
