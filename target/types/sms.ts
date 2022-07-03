export type Sms = {
  "version": "0.1.0",
  "name": "sms",
  "instructions": [
    {
      "name": "initializeChat",
      "accounts": [
        {
          "name": "chat",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeMessage",
      "accounts": [
        {
          "name": "message",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "chat",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "text",
          "type": "string"
        }
      ]
    },
    {
      "name": "closeChat",
      "accounts": [
        {
          "name": "chat",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "closeMessage",
      "accounts": [
        {
          "name": "message",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "chat",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "chat",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initializer",
            "type": "publicKey"
          },
          {
            "name": "receiver",
            "type": "publicKey"
          },
          {
            "name": "messageCount",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "message",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "mark",
            "type": "u8"
          },
          {
            "name": "chat",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidMessage"
    },
    {
      "code": 6001,
      "name": "InvalidChat"
    },
    {
      "code": 6002,
      "name": "IncorrectReceiver"
    }
  ]
};

export const IDL: Sms = {
  "version": "0.1.0",
  "name": "sms",
  "instructions": [
    {
      "name": "initializeChat",
      "accounts": [
        {
          "name": "chat",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeMessage",
      "accounts": [
        {
          "name": "message",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "chat",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "text",
          "type": "string"
        }
      ]
    },
    {
      "name": "closeChat",
      "accounts": [
        {
          "name": "chat",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "closeMessage",
      "accounts": [
        {
          "name": "message",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "chat",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "chat",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initializer",
            "type": "publicKey"
          },
          {
            "name": "receiver",
            "type": "publicKey"
          },
          {
            "name": "messageCount",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "message",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "mark",
            "type": "u8"
          },
          {
            "name": "chat",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidMessage"
    },
    {
      "code": 6001,
      "name": "InvalidChat"
    },
    {
      "code": 6002,
      "name": "IncorrectReceiver"
    }
  ]
};
