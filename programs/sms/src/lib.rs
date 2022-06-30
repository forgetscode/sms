use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod sms {
    use super::*;
    pub fn initialize_chat(ctx: Context<InitializeChat>) -> Result<()> {
        let chat = &mut ctx.accounts.chat;
        chat.initializer = ctx.accounts.initializer.key();
        chat.receiver = ctx.accounts.receiver.key();
        Ok(())
    }

    pub fn initialize_message(ctx: Context<InitializeMessage>, text:String) -> Result<()> {
        let message = &mut ctx.accounts.message;
        let chat = &mut ctx.accounts.chat;

        require!(text.len() < 255, MessageError::InvalidMessage);

        require!(chat.initializer == ctx.accounts.initializer.key() 
        || chat.initializer == ctx.accounts.receiver.key(), MessageError::InvalidMessage);

        require!(chat.receiver == ctx.accounts.initializer.key() 
        || chat.receiver == ctx.accounts.receiver.key(), MessageError::InvalidMessage);

        if ctx.accounts.initializer.key() == chat.initializer {
            message.mark = 0;
            //chat initializer sent message
        }
        else {
            message.mark = 1;
            //chat recepient sent message
        }

        message.chat = chat.key();
        message.message = text;

        Ok(())
    }

    pub fn close_chat(_ctx: Context<CloseChat>) -> Result<()> {
        Ok(())
    }

    pub fn close_message(ctx: Context<CloseMessage>) -> Result<()> {
        let message = &mut ctx.accounts.message;
        let chat = &mut ctx.accounts.chat;
        match message.mark {
            0 => require!(chat.initializer == ctx.accounts.receiver.key(), MessageError::IncorrectReceiver),
            1 => require!(chat.receiver == ctx.accounts.receiver.key(), MessageError::IncorrectReceiver),
            _ => require!(true, MessageError::InvalidMessage),
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeChat<'info>  {
    #[account(
        init,
        payer = initializer,
        space = 8 + 32 + 32,
    )]
    pub chat: Account<'info, Chat>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub receiver: SystemAccount<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct CloseChat<'info> {
    #[account(
        mut, 
        close = initializer,
        constraint = chat.initializer.key() == initializer.key(),
    )]
    pub chat: Account<'info, Chat>,
    #[account(mut)]
    pub initializer: Signer<'info>,
}

#[derive(Accounts)]
pub struct CloseMessage<'info> {
    #[account(
        mut, 
        close = receiver,
        constraint = message.chat.key() == chat.key(),
        constraint = initializer.key() == chat.initializer.key() || 
        initializer.key() == chat.receiver.key(),
    )]
    pub message: Account<'info, Message>,
    pub chat: Account<'info, Chat>,
    pub initializer: Signer<'info>,
    #[account(mut)]
    pub receiver: SystemAccount<'info>,
}

#[derive(Accounts)]
#[instruction(text:String)]
pub struct InitializeMessage<'info>  {
    #[account(
        init,
        payer = initializer,
        space = Message::space(&text),
    )]
    pub message: Account<'info, Message>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub receiver: SystemAccount<'info>,
    pub chat: Account<'info, Chat>,
    pub system_program: Program<'info, System>
}

#[account]
pub struct Chat {         //8
    initializer: Pubkey,  //32
    receiver: Pubkey,     //32
}

impl Message {
    fn space(text: &str) -> usize {
        // discriminator
        8 +
        // String
        4 + text.len() +
        // u8
        1 +
        //chat key
        32
    }
}

#[account]
pub struct Message {
    message: String,    //255 max
    mark: u8,           //1
    chat: Pubkey,       //32
}

#[error_code]
pub enum MessageError {
    InvalidMessage,
    InvalidChat,
    IncorrectReceiver,
}