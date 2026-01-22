# Area-Specific Guidelines

## Actions & Events - Streaming API (`docs/actions-events/docs/streaming/`)

- **Sample Code Repository:** https://github.com/8x8/pulsar-demo-client
- **CRITICAL:** Documentation in this repository and sample code in pulsar-demo-client must be kept in sync. The pulsar-demo-client repo
  should be regarded as the **source of truth**, the master copy.
- **Syncing Process:**
    * The developer must have tested clients using the docker-compose file in pulsar-demo-client. Changes may then be propagated into **this**  repo.
    * _Most_ code should be copied over, but exclude excessively verbose code that doesn't help with understanding the fundamentals: sanitizing URLs, printing Usage etc.
