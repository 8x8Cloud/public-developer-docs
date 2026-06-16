---
slug: /connect/docs/rcs/compliance
---

# Compliance

## Required message templates

Your agent must automatically respond to the following keywords with compliant messages. These are verified during carrier approval — missing or incorrect responses will block launch.

### CTA (Call-to-Action) / Opt-in disclosure

Every opt-in touchpoint (web form, SMS keyword, in-app prompt) must include all of the following:

- What the user is signing up for
- Message and data rates disclosure
- Message frequency disclosure
- Instructions to reply STOP to opt out
- A support contact (phone, email, or URL)
- A link to your privacy policy

**Example:**

```text
Message and data rates may apply. Message frequency varies. Reply STOP to opt-out.
For support, visit [URL]. Privacy Policy: [URL]
```

### Welcome / opt-in confirmation

Sent immediately after a user opts in. Must include:

- Your brand name and confirmation of opt-in
- Message frequency
- Data rates disclosure
- Instructions to reply HELP for help
- Instructions to reply STOP to cancel
- A customer care contact

**Example:**

```text
Welcome to [Brand]! You are opted in. Msg freq varies. Msg & data rates may apply.
Text HELP for help, STOP to unsubscribe. For support, visit [URL].
```

### HELP response

Sent when a user replies `HELP`. Must include:

- A direct support contact — phone, email, or URL (no "we'll get back to you")
- A reminder that the user can reply STOP

**Example:**

```text
For support, please visit [URL] or call [phone number]. To stop receiving messages, reply STOP.
```

### STOP response

Sent when a user replies `STOP`. Your agent must also handle: `QUIT`, `CANCEL`, `END`, `STOPALL`, `UNSUBSCRIBE`. Must include:

- Your brand name
- Confirmation that no further messages will be sent
- An offer to reply START to resubscribe

**Example:**

```text
You have successfully unsubscribed from [Brand] messages.
You will no longer receive messages. Reply START to resubscribe.
```

:::note
Replace `[Brand]`, `[URL]`, and `[phone number]` with your actual values before submitting for carrier approval.
:::

---

## Opt-in & opt-out

All RCS messaging must follow opt-in best practices:

- Users must explicitly consent (opt-in) before receiving RCS messages.
- You must document and maintain proof of consent (e.g., timestamp, source).
- Include an option to opt-out (e.g., responding STOP) in your campaign design.
- For interactive flows, use suggested replies for opt-out ("Stop", "Unsubscribe").

## Prohibited Content

The RCS channel must not be used to transmit restricted or inappropriate content. The following examples represent, but do not fully encompass, the types of content that are not allowed::

**Counterfeit goods**

Products described as knock off, replica, imitation, clone, faux, fake, mirror image, or similar terms when referring to a brand name in an attempt to pass themselves off as genuine products of the brand owner.

**Dangerous products or services**

Products or services that cause damage, harm, or injury. These include, but are not limited to, illegal drugs, equipment to facilitate illegal drug use, explosive materials, fireworks, weapons, instructions for making explosives, or other harmful products.

**Products, services, or content that enable dishonest behaviors**

Products, services, or content that help users to mislead others such as fake documents, aids to pass drug tests, paper-writing or exam taking services; products, services, or instruction that enable unauthorized access to systems, devices, or property.

**Dangerous or derogatory content**

Content, products, or services that:

- Incite hatred against, promote discrimination of, or disparage an individual or group on the basis of their race or ethnic origin, religion, disability, age, nationality, veteran status, sexual orientation, gender, gender identity, or other characteristic that is associated with systemic discrimination or marginalization
- Harass, intimidate, or bully an individual or group of individuals
- Threaten or advocate for harm on oneself or others
- Seek to exploit others (e.g. blackmail, soliciting, or promoting dowries)
- Inappropriate use of flags, national emblems, or religious icons and imagery

**Shocking content**

Content, products, or services that:

- Contain violent language, gruesome or disgusting imagery, or graphic images or accounts of physical trauma
- Contain gratuitous portrayal of bodily fluids or waste
- Contain obscene or profane language
- Likely cause shock, scare, or disgust

**Capitalizing on sensitive events**

Content which may be deemed as capitalizing on or lacking reasonable sensitivity towards a natural disaster, conflict, death, political violence, or other tragic event with no discernible benefit to the victims.

**Animal cruelty**

Content that promotes or depicts cruelty or gratuitous violence towards animals, or which may be interpreted as trading in or selling products derived from threatened or extinct species.

**Adult content**

Content, products, or services that are sexually explicit, sexually suggestive, or promote sexual themes, activities or escort services. Content promoting the sexual exploitation of minors (such as child sexual abuse imagery) is strictly prohibited.

**Tobacco**

Content, products or services that promote sales or consumption of tobacco, products containing tobacco, component parts of tobacco or products designed to simulate smoking behaviors.

**Political content**Business to consumer messages (e.g., RCS Business Messages) may not include content or services related to political campaigns such as those that promote or undermine a political figure or party, conduct opinion polls or political surveys, discuss election integrity, or predict election results. Any other political content that is not prohibited by this policy must comply with local laws and regulations.

**Unauthorized content**

Content, products, or services that are unauthorized to use copyrighted or trademarked content, or other legally prohibited content.

## Restricted Content

Some types of content may be subject to additional review or compliance measures when delivered over the RCS channel. The following categories are examples of content that may require extra scrutiny, though this list is not exhaustive:

**Alcohol**

Content, products, or services that promote branding, sales, promotion, or consumption of alcoholic beverages. Content that promotes irresponsible alcohol consumption is prohibited.

**Gambling and games**

Gambling related content, products, or services, which include but are not limited to legal gambling activities such as: physical casinos, offline and online gambling activities, national or private lottery, promotional offers for gambling sites, and social casino games.
