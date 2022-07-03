import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
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

    await program.provider.connection.confirmTransaction(
      await program.provider.connection.requestAirdrop(receiver.publicKey, 10000000000),
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

    let balancebeforemessage = await program.provider.connection.getBalance(initializer.publicKey);
    console.log("balance before message: ", balancebeforemessage* (10**-9));


    /*
    await program.provider.connection.confirmTransaction(
      await program.provider.connection.requestAirdrop(message.publicKey, 100),
      "confirmed"
    );
    */

    /*
    const tx2 = await program.methods.initializeMessage
    ("max is 222 o avoid passing any charajjjjcter limits). Unfortunately, I could not think of a quick way to do so on my macbook and I therefore turned to the Internet.")
    .accounts(
      {
        message: message.publicKey,
        initializer: initializer.publicKey,
        receiver: receiver.publicKey,
        chat: chat.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }
    ).signers([message, initializer]).transaction();
    */

    //let balanceaftermessage = await program.provider.connection.getBalance(initializer.publicKey);
    //console.log("balance after message: ", balanceaftermessage* (10**-9));

    //let balancecost = (balancebeforemessage* (10**-9) - balanceaftermessage* (10**-9));
    //console.log("balance cost: ", balancecost);

    //const chatAccounts = await program.provider.connection.getProgramAccounts(chat.publicKey);
    //console.log("chat account", chatAccounts); 

    //let messagedata = await program.account.message.fetch(message.publicKey);
    //console.log("message data", messagedata);

    /*
    transaction building example

    const tx2 = await program.methods.initializeMessage
    ("max is 222 o avoid passing any charajjjjcter limits). Unfortunately, I could not think of a quick way to do so on my macbook and I therefore turned to the Internet.")
    .accounts(
      {
        message: message.publicKey,
        initializer: initializer.publicKey,
        receiver: receiver.publicKey,
        chat: chat.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }
    ).signers([message, initializer]).transaction();

    const tx3 = await program.methods.updateChat().accounts(
      {
        chat: chat.publicKey,
        message: message.publicKey,
        initializer: initializer.publicKey,
      }
    ).signers([initializer]).transaction();

    const transaction = new Transaction().add(tx2, tx3);

    //Account cannot be init in a transaction builder because it 
    //const result = await sendAndConfirmTransaction(program.provider.connection, transaction, [message, initializer]);

    */

    const tx2 = await program.methods.initializeMessage
    ("max is 222 o avoid passing any charajjjjcter limits). Unfortunately, I could not think of a quick way to do so on my macbook and I therefore turned to the Internet.")
    .accounts(
      {
        message: message.publicKey,
        initializer: initializer.publicKey,
        receiver: receiver.publicKey,
        chat: chat.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }
    ).signers([message, initializer]).rpc();

    let chatdata = await program.account.chat.fetch(chat.publicKey);
    console.log("chat data", chatdata);

    //get account info
    //let messageinfo = await program.provider.connection.getAccountInfo(message.publicKey);
    //console.log("message info", messageinfo.owner.toBase58());

    //program accounts, gets all accounts owned by our program in an array

    //toBase58 - Binary -> readable
    //get owner of our chat account which is the programID
    //const programAccounts = await program.provider.connection.getProgramAccounts(program.programId);
    //console.log(programAccounts[0].account.owner.toBase58());

    /*
    const tx3 = await program.methods.closeMessage()
    .accounts(
      {
        message: message.publicKey,
        chat: chat.publicKey,
        initializer: initializer.publicKey,
        receiver: initializer.publicKey,
      }
    ).signers([initializer]).rpc();

    const tx4 = await program.methods.closeChat()
    .accounts(
      {
        chat: chat.publicKey,
        initializer: initializer.publicKey,
      }
    ).signers([initializer]).rpc();
    */

  });
});
