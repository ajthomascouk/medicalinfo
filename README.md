#   Me d i c a l I n f o 
## Intent Schema

```
{
  "intents": [
    {
      "intent": "SymptomsIntent",
      "slots": [
        {
          "name": "condition",
          "type": "LIST_OF_CONDITIONS"
        }
      ]
    },
    {
      "intent": "TreatmentIntent",
      "slots": [
        {
          "name": "condition",
          "type": "LIST_OF_CONDITIONS"
        }
      ]
    },
    {
      "intent": "PreventionIntent",
      "slots": [
        {
          "name": "condition",
          "type": "LIST_OF_CONDITIONS"
        }
      ]
    },
    {
      "intent": "HelpIntent",
      "slots": []
    }
  ]
}
```
## Custom Slot Types
```
LIST_OF_CONDITIONS	malaria | hay fever
```

## Sample Utterances

```
SymptomsIntent what are the symptoms of {condition}

TreatmentIntent how do i treat {condition}

PreventionIntent how do i prevent getting {condition}

HelpIntent help
HelpIntent help me
HelpIntent what can I ask you
HelpIntent get help
HelpIntent to help
HelpIntent to help me
HelpIntent what commands can I ask
HelpIntent what commands can I say
HelpIntent what can I do
HelpIntent what can I use this for
HelpIntent what questions can I ask
HelpIntent what can you do
HelpIntent what do you do
HelpIntent how do I use you
HelpIntent how can I use you
HelpIntent what can you tell me
HelpIntent how do i find a bus
```
