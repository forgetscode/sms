import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { Sms } from "../target/types/sms";

describe("sms", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Sms as Program<Sms>;


  const receiver = anchor.web3.Keypair.generate();

  const initializer = anchor.web3.Keypair.generate();

  const chat = anchor.web3.Keypair.generate();

  const message = anchor.web3.Keypair.generate();
  

  it("Is initialized!", async () => {
    // Add your test here.

    //airdrop lamports to accounts
    await program.provider.connection.confirmTransaction(
      await program.provider.connection.requestAirdrop(initializer.publicKey, 10000000000),
      "confirmed"
    );


    //if you don't have lamports you will get error 0x1
    let balancebefore = await program.provider.connection.getBalance(initializer.publicKey);
    console.log("initializer balance: ", balancebefore* (10**-9));

    const tx = await program.methods.initializeChat()
    .accounts(
      {
        chat: chat.publicKey,
        initializer: initializer.publicKey,
        receiver: receiver.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
    ).signers([chat, initializer]).rpc();



    //get account data
    let chatAccount = await program.account.chat.fetch(chat.publicKey);
    console.log("chat account", chatAccount);

    //let balancebeforemessage = await program.provider.connection.getBalance(initializer.publicKey);
    //console.log("balance before message: ", balancebeforemessage* (10**-9));

    const tx2 = await program.methods.initializeMessage
    ("max is 254 A while back I needed to count the amount of letters that a piece of text in an email template had (to avoid passing any charajjjjcter limits). Unfortunately, I could not think of a quick way to do so on my macbook and I therefore turned to the Internet.")
    .accounts(
      {
        message: message.publicKey,
        initializer: initializer.publicKey,
        receiver: receiver.publicKey,
        chat: chat.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }
    ).signers([message, initializer]).rpc();

    //let balanceaftermessage = await program.provider.connection.getBalance(initializer.publicKey);
    //console.log("balance after message: ", balanceaftermessage* (10**-9));

    //let balancecost = (balancebeforemessage* (10**-9) - balanceaftermessage* (10**-9));
    //console.log("balance cost: ", balancecost);

    //const chatAccounts = await program.provider.connection.getProgramAccounts(chat.publicKey);
    //console.log("chat account", chatAccounts); 

    let messagedata = await program.account.message.fetch(message.publicKey);
    console.log("message data", messagedata);

    //get account info
    //let messageinfo = await program.provider.connection.getAccountInfo(message.publicKey);
    //console.log("message info", messageinfo.owner.toBase58());

    //program accounts, gets all accounts owned by our program in an array

    //toBase58 - Binary -> readable
    //get owner of our chat account which is the programID
    //const programAccounts = await program.provider.connection.getProgramAccounts(program.programId);
    //console.log(programAccounts[0].account.owner.toBase58());
  });
});
