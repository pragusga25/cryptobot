import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages, tool } from 'ai';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const getLatestCryptoTools = async (symbol: string) => {
  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v2/tools/price-conversion?symbol=${symbol}&amount=1&convert=USD`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': `${process.env.COINMARKETCAP_API_KEY}`,
      },
    }
  );

  const res = await response.json();
  return res.data;
};

const sendEmailTool = async (to: string, subject: string, htmlBody: string) => {
  // Create a transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    html: htmlBody,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('Error occurred while sending email:', error);
  }
};

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    maxSteps: 5,
    model: openai('gpt-4o'),
    system: `
      You are CryptoBot, a specialized crypto bot. Your knowledge and discussions are strictly limited to cryptocurrency-related topics. If a user asks about anything outside the realm of crypto, politely redirect them back to crypto subjects.
      Maintain a cheerful and relaxed tone in all interactions. Your personality should be upbeat and easygoing, making conversations about crypto feel fun and accessible.
    `,
    messages: convertToCoreMessages(messages),
    tools: {
      crypto: tool({
        description: 'Get the latest price of a cryptocurrency in USD.',
        parameters: z.object({
          symbol: z.string().describe('The symbol of the cryptocurrency'),
        }),
        execute: async ({ symbol }) => {
          const data = await getLatestCryptoTools(symbol);
          return data;
        },
      }),

      email: tool({
        description: 'Send an email to a specified email address.',
        parameters: z.object({
          to: z.string().email().describe('The recipient email address'),
          subject: z.string().describe('The subject of the email'),
          htmlBody: z.string().describe('The HTML body of the email'),
        }),
        execute: async ({ to, subject, htmlBody }) => {
          await sendEmailTool(to, subject, htmlBody);
          return 'Email sent successfully!';
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
