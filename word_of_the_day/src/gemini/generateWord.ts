import prisma from "../../prisma/prisma";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API!);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function generateWord() {
  const existingWords = await prisma.word.findMany({
    select: {
      word: true,
    },
  });

  const listOfWords = [];

  for (let i = 0; i < existingWords.length; i++) {
    listOfWords.push(existingWords[i].word);
  }

  const prompt = `You have already given me that word. Give me a unique interesting word that is not a part of ${listOfWords}, its meaning, and also an example sentence in json format such that it looks like {word, meaning, example}. The word should be understandable by children of age group 10-12. Send the response in json format and do not send backticks in the response. send pure json`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const jsonResponse = JSON.parse(text);

  const existingWord = await prisma.word.findFirst({
    where: {
      word: jsonResponse.word,
    },
  });

  if (!existingWord) {
    await prisma.word.create({
      data: {
        word: jsonResponse.word,
        meaning: jsonResponse.meaning,
        example: jsonResponse.example,
      },
    });

    console.log("Word added to the database");
  }
}
