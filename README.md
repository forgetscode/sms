# sms
Serverless messaging protocol v0.1

Implementation currently requires all program account data to be queried resulting in poor scalability.

Intended optimization features

- Construct Chat accounts with Initializer and incrementer as seed. Generate PDA's until an increment value has failed meaning when the chat initializer 
looks for chats they created they will do so in exact time without a centralized reference.

- Include message counter into chat account. 

- Make message accounts use chat account and last chat counter as seed. Every message in a chat CPI increments the chat counter data. 
This chat counter will tell the client to derive addresses until the chat counter has been reached allowing messages to be queryed 
for a specific chat in almost exact time.

- Split chat and message account into different programs. Without a reference and the one way nature of seed creation, the receiver of a chat
must query all program accounts to find their chats. Splitting up the message program and the chat program would drastically improve the
scalability of the receiver chat query as find program accounts could isolate the chat accounts instead of both chat and message accounts.

- Refresh button for chats. Without a centralized server to update chats have to be manually resfreshed so this should be made obvious to users.

- Reclaim button. Delete messages to reclaim Sol making the protocol have an actual reasonable cost for usage. Rent costs for messages would normally be too high for real usage otherwise.

End result of optimizations:

From:

Query all chats and messages everytime(n+m scalability)

Load all data at once

To:

Query exact amount of chats and basically exact amount of messages for chat initializer(exact n + exact m)

Query all chats but just exact amount of messages for chat receiver(n + exact m)

Load message data when user requests
