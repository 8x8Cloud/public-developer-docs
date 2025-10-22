# Check the webhook signatures

## Verify the events sent to your webhook endpoints.

JaaS will sign each of the webhook events it sends to your endpoints by including a signature in each event’s `X-Jaas-Signature` header. This allows you to verify that the events were sent by JaaS, not by a third party. For this, you need to retrieve your endpoint’s secret from the Webhooks section in the JaaS Console. Select an endpoint that you want to obtain the secret for, then click the **`Reveal secret`** button.

We will generate a unique secret key for each endpoint. We will be signing each webhook we send using this secret.

The `X-Jaas-Signature` header included in each signed event contains a timestamp and one or more signatures. The timestamp is prefixed by `t=`, and each signature is prefixed by a scheme. Schemes start with `v`, followed by an integer. Currently, the only valid live signature scheme is `v1`.  

**`X-Jaas-Signature:t=1632490060,v1=xlzqEojlh4qb21sQpXYsWgyK8x9HVpz+RQldsv18rV0=`**  

JaaS generates signatures using a hash-based message authentication code (HMAC) with SHA-256. To prevent downgrade attacks, you should ignore all schemes that are not `v1`.

## Steps for verifying webhook event signatures.

1. Extract the timestamp and signatures from the header

Split the header, using the comma “,” symbol as the separator, to get a list of elements. Then split each element, using the equals sign “=” as the separator, to get a prefix and value pair.

The value for the prefix `t` corresponds to the timestamp, and `v1` corresponds to the signature (or signatures). You can discard all other elements. For example, for **`t=1632490060,v1=xlzqEojlh4qb21sQpXYsWgyK8x9HVpz+RQldsv18rV0=`**, the timestamp is `1632490060`, and the signature `xlzqEojlh4qb21sQpXYsWgyK8x9HVpz+RQldsv18rV0=`.

2. Prepare the `signed_payload` string

The `signed_payload` string is created by concatenating:

* the timestamp obtained from the header in the previous step (as a string).
* the character .
* the actual JSON payload (i.e., the request body). For example:

```json
{
   "eventType":"PARTICIPANT_JOINED",
   "sessionId":"9a441d60-ceaf-4eba-b0a8-a7d940a76e1b",
   "timestamp":1632490058278,
   "fqn":"vpaas-magic-cookie-96f0941768964ab380ed0fbada7a502f/sampleappromanticshiftsstripas",
   "idempotencyKey":"9e9e7420-562d-4659-8e22-44b9b22aaa49",
   "customerId":"96f0941768964ab380ed0fbada7a502f",
   "appId":"vpaas-magic-cookie-96f0941768964ab380ed0fbada7a502f",
   "data":{
      "avatar":"",
      "name":"Test User",
      "id":"auth0|5f903d7a77f3b4006eb8e67d",
      "participantJid":"fc1ea14a-9bca-4218-a563-8c627e803d56@8x8.vc",
      "moderator":true,
      "email":"test.user@company.com"
   }
}

```

3. Determine the expected signature

Compute an HMAC with the SHA256 hash function, and then encode the result using the base64 algorithm. Use the endpoint’s signing secret as the key, and use the `signed_payload` utf-8 string **converted to byte array** as the message. In our example, the `signed_payload` string would be `1632490060.{"eventType":"PARTICIPANT_JOINED","sessionId":"9a441d60-ceaf-4eba-b0a8-a7d940a76e1b","timestamp":1632490058278,"fqn":"vpaas-magic-cookie-96f0941768964ab380ed0fbada7a502f/sampleappromanticshiftsstripas","idempotencyKey":"9e9e7420-562d-4659-8e22-44b9b22aaa49","customerId":"96f0941768964ab380ed0fbada7a502f","appId":"vpaas-magic-cookie-96f0941768964ab380ed0fbada7a502f","data":{"avatar":"","name":"Test User","id":"auth0|5f903d7a77f3b4006eb8e67d","participantJid":"fc1ea14a-9bca-4218-a563-8c627e803d56@8x8.vc","moderator":true,"email":"test.user@company.com"}}`

Say the secret for the webhook target endpoint is `whsec_9635df66714a4cf088ee9d0979dd3bf6`. Then the expected signature is `xlzqEojlh4qb21sQpXYsWgyK8x9HVpz+RQldsv18rV0=`.

4. Compare the signatures

Compare the signature (or signatures) in the header to the expected signature. For an equality match, compute the difference between the current timestamp and the received timestamp, then decide if the difference is within your tolerance. To protect against timing attacks, use a constant-time string comparison to compare the expected signature to each of the received signatures.
