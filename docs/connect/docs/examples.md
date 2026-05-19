# Examples

> 🚧 **[BETA]**
>
> This product is currently in early access. Please reach out to your account manager to get more information.
>

## Examples

Chat Apps auto reply:

```json
{
  "subAccountId": "acme_corp_chatapps",
  "trigger": "inbound_chat_apps",
  "status": "enabled",
  "definition": {
    "name": "Auto Reply ChatApps",
    "steps": [
      {
        "id": "send_CA",
        "stepType": "ChatAppsMessage",
        "inputs": {
          "subAccountId": "acme_corp_chatapps",
          "user": {
            "msisdn": "{{data.payload.user.msisdn}}"
          },
          "type": "text",
          "content": {
            "text": "Hello, thank you for your message!"
          }
        }
      }
    ]
  }
}
```

SMS auto reply:

```json
{
  "subAccountId": "acme_corp",
  "trigger": "inbound_sms",
  "status": "enabled",
  "definition": {
    "name": "Auto Reply SMS",
    "steps": [
      {
        "id": "send_sms",
        "stepType": "SMS",
        "inputs": {
          "subAccountId": "acme_corp",
          "source": "Acme Corp",
          "destination": "{{data.payload.source}}",
          "text": "Hello, thank you for your message!",
          "encoding": "Auto"
        }
      }
    ]
  }
}
```

Out of Office with country branch:

```json
{
  "subAccountId": "acme_corp_chatapps",
  "trigger": "inbound_chat_apps",
  "status": "enabled",
  "definition": {
    "name": "Out of Office",
    "steps": [
      {
        "id": "branch_on_msg_country",
        "stepType": "Branch",
        "selectNextStep": {
          "message_from_ID": "{{isCountryCode(data.payload.user.channelUserId, 'ID')}}",
          "message_from_PH": "{{isCountryCode(data.payload.user.channelUserId, 'PH')}}",
          "message_from_Others": null
        }
      },
      {
        "id": "message_from_ID",
        "stepType": "If",
        "inputs": {
          "condition": "{{!isTimeOfDayBetween(data.payload.timestamp, '09:00:00', '18:00:00', 'SE Asia Standard Time')}}"
        },
        "do": [
          [
            {
              "id": "message_from_ID_out_of_business_hours",
              "stepType": "ChatAppsMessage",
              "inputs": {
                "subAccountId": "InternalDemoCPaaS_ChatApps",
                "user": {
                  "msisdn": "{{data.payload.user.channelUserId}}"
                },
                "type": "text",
                "content": {
                  "text": "Halo, terima kasih atas pesan Anda! Kami akan menghubungi Anda kembali besok."
                }
              }
            }
          ]
        ]
      },
      {
        "id": "message_from_PH",
        "stepType": "If",
        "inputs": {
          "condition": "{{!isTimeOfDayBetween(data.payload.timestamp, '09:00:00', '18:00:00', 'North Asia East Standard Time')}}"
        },
        "do": [
          [
            {
              "id": "message_from_PH_out_of_business_hours",
              "stepType": "ChatAppsMessage",
              "inputs": {
                "subAccountId": "acme_corp_chatapps",
                "user": {
                  "msisdn": "{{data.payload.user.channelUserId}}"
                },
                "type": "text",
                "content": {
                  "text": "Kumusta, salamat sa iyong mensahe! Babalikan ka namin bukas. \r\n Hello, thanks for your message! We will get back to you tomorrow."
                }
              }
            }
          ]
        ]
      },
      {
        "id": "message_from_Others",
        "stepType": "ChatAppsMessage",
        "inputs": {
          "subAccountId": "acme_corp_chatapps",
          "user": {
            "msisdn": "{{data.payload.user.channelUserId}}"
          },
          "type": "text",
          "content": {
            "text": "Hello, thanks for your message! We will get back to you as soon as possible."
          }
        }
      }
    ]
  }
}
```

Keyword detection:

```json
{
  "subAccountId": "acme_corp",
  "trigger": "inbound_sms",
  "status": "enabled",
  "definition": {
    "name": "Promo_register",
    "steps": [
      {
        "id": "keyword",
        "stepType": "branch",
        "selectNextStep": {
          "register_flow_1": "{{stringContains(data.payload.content.text, 'Register')}}",
          "others": null
        }
      },
      {
        "id": "register_flow_1",
        "stepType": "HttpRequest",
        "inputs": {
          "url": "https://sample.api.com/newrecord/",
          "method": "POST",
          "headers": {
            "Authorization": "Bearer 4f5b6f29654s36654xsvdc895b469dc0"
          },
          "body": {
            "register": 1,
            "user": "{{'umid: ' + data.payload.source}}",
            "time": "{{data.receivedAt}}"
          },
          "outputs": {
            "httpCode": "{{step.responseCode}}"
          }
        },
        "selectNextStep": {
          "register_flow_2": "{{step.responseCode == '200'}}",
          "register_flow_fail": null
        }
      },
      {
        "id": "register_flow_2",
        "stepType": "ChatAppsMessage",
        "inputs": {
          "subAccountId": "acme_corp_chatapps",
          "user": {
            "msisdn": "{{data.payload.user.msisdn}}"
          },
          "type": "text",
          "content": {
            "text": "Hello, you are now registered, thanks !"
          }
        }
      },
      {
        "id": "register_flow_fail",
        "stepType": "ChatAppsMessage",
        "inputs": {
          "subAccountId": "acme_corp_chatapps",
          "user": {
            "msisdn": "{{data.payload.user.msisdn}}"
          },
          "type": "text",
          "content": {
            "text": "Hello, something went wrong, please try again later"
          }
        }
      }
    ]
  }
}
```

Menu using WaitForReply:

```json
{
  "trigger": "inbound_chat_apps",
  "subAccountId": "acme_corp",
  "status": "enabled",
  "definition": {
    "name": "ChatBot-123",
    "steps": [
      {
        "stepType": "ChatAppsMessage",
        "id": "Hello",
        "inputs": {
          "subAccountId": "acme_corp",
          "user": {
            "msisdn": "{{data.payload.user.channelUserId}}"
          },
          "type": "text",
          "content": {
            "text": "Hello, 👋\r\nThanks for contacting our team 🤖\r\n Please choose one of the option below: 🤓 \r\n 1️⃣ Technical Support \r\n 2️⃣ Product Questions \r\n 3️⃣ Sales Support \r\n 4️⃣ Billing Qestions \r\n 5️⃣ Other"
          }
        },
        "outputs": {
          "user_msisdn": "{{data.payload.user.channelUserId}}"
        },
        "nextStepId": "wait1"
      },
      {
        "stepType": "WaitForReply",
        "id": "wait1",
        "inputs": {
          "timeout": "00:05:00",
          "channel": "whatsapp",
          "from": "{{data.user_msisdn}}"
        },
        "outputs": {
          "reply1": "{{step.reply}}"
        },
        "selectNextStep": {
          "success": "{{data.reply1 != null}}",
          "failure": "{{data.reply1 == null}}"
        }
      },
      {
        "stepType": "Branch",
        "id": "success",
        "selectNextStep": {
          "branch1": "{{ data.reply1.payload.content.text == '1'}}",
          "branch2": "{{ data.reply1.payload.content.text == '2'}}",
          "branch3": "{{ data.reply1.payload.content.text == '3'}}",
          "branch4": "{{ data.reply1.payload.content.text == '4'}}",
          "branch5": "{{ data.reply1.payload.content.text == '5'}}"
        }
      },
      {
        "stepType": "ChatAppsMessage",
        "id": "branch1",
        "inputs": {
          "subAccountId": "acme_corp",
          "user": {
            "msisdn": "{{data.user_msisdn}}"
          },
          "type": "text",
          "content": {
            "text": "Thanks for choosing 1️⃣ Technical Support! \r\n This department will get back to you shortly"
          }
        }
      },
      {
        "stepType": "ChatAppsMessage",
        "id": "branch2",
        "inputs": {
          "subAccountId": "acme_corp",
          "user": {
            "msisdn": "{{data.user_msisdn}}"
          },
          "type": "text",
          "content": {
            "text": "Thanks for choosing 2️⃣ Product Questions! \r\n This department will get back to you shortly"
          }
        }
      },
      {
        "stepType": "ChatAppsMessage",
        "id": "branch3",
        "inputs": {
          "subAccountId": "acme_corp",
          "user": {
            "msisdn": "{{data.user_msisdn}}"
          },
          "type": "text",
          "content": {
            "text": "Thanks for choosing 3️⃣ Sales Support! \r\n This department will get back to you shortly"
          }
        }
      },
      {
        "stepType": "ChatAppsMessage",
        "id": "branch4",
        "inputs": {
          "subAccountId": "acme_corp",
          "user": {
            "msisdn": "{{data.user_msisdn}}"
          },
          "type": "text",
          "content": {
            "text": "Thanks for choosing 4️⃣ Billing Support! \r\n This department will get back to you shortly"
          }
        }
      },
      {
        "stepType": "ChatAppsMessage",
        "id": "branch5",
        "inputs": {
          "subAccountId": "acme_corp",
          "user": {
            "msisdn": "{{data.user_msisdn}}"
          },
          "type": "text",
          "content": {
            "text": "Thanks for choosing 5️⃣ other! \r\n This department will get back to you shortly"
          }
        }
      },
      {
        "stepType": "ChatAppsMessage",
        "id": "failure",
        "inputs": {
          "subAccountId": "acme_corp",
          "user": {
            "msisdn": "{{data.user_msisdn}}"
          },
          "type": "text",
          "content": {
            "text": "Ok if you don't reply I will chat with someone else 😥 Feel free to contact me again 👨‍💻"
          }
        }
      }
    ]
  }
}
```
