# Overview

The **API Keys** provide the means to generate the JWTs used for authenticating user endpoints when joining a meeting. JaaS only stores the Public Key, it is your responsability to generate and sign the JWTs using the Private Key in your integrations. The **API Keys** management is done through the JaaS console's [**API Keys**](/jaas/docs/jaas-console-api-keys) page.

To enable participation in your AppID meetings, you must generate a [**JWT**](/jaas/docs/api-keys-jwt) for each participant and sign it with the Private Key.
