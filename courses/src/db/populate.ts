import prisma from "../../prisma/prisma";

export async function populate() {
  await addEnglishCourse();
  await addNumberCourse();
  await addWords();
}

async function addEnglishCourse() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const words = [
    "Apple",
    "Ball",
    "Cat",
    "Dog",
    "Elephant",
    "Fish",
    "Goat",
    "Hat",
    "Ice cream",
    "Jug",
    "Kite",
    "Lion",
    "Monkey",
    "Nest",
    "Orange",
    "Parrot",
    "Queen",
    "Rabbit",
    "Snake",
    "Tiger",
    "Umbrella",
    "Van",
    "Whale",
    "X-ray",
    "Yak",
    "Zebra",
  ];

  // Create a new course
  const course = await prisma.course.create({
    data: {
      title: "English Alphabet",
    },
  });

  // Create course contents for each letter
  for (let i = 0; i < alphabet.length; i++) {
    await prisma.courseContent.create({
      data: {
        title: alphabet[i],
        description: `${alphabet[i]} is for ${words[i]}`,
        courseId: course.id,
        category: "alphabet",
      },
    });
  }

  console.log("Added [ENGLISH ALPHABET] course to courses_db");
}

async function addNumberCourse() {
  // Create a new course
  const course = await prisma.course.create({
    data: {
      title: "Numbers 1-10",
    },
  });

  // Create course contents for each number
  for (let i = 1; i <= 10; i++) {
    await prisma.courseContent.create({
      data: {
        title: `Number ${i}`,
        description: `This is number ${i}`,
        courseId: course.id,
        category: "numbers",
      },
    });
  }

  console.log("Added [NUMBERS 1-10] course to courses_db");
}

async function addWords() {
  const words = [
    {
      title: "abolish",
      description: "to officially end something, especially a system or institution",
    },
    {
      title: "abortion",
      description:
        "the ending of a pregnancy by removing the embryo or fetus from the womb before it is able to survive on its own",
    },
    {
      title: "absence",
      description: "the state of not being present",
    },
    {
      title: "absent",
      description: "not present; away",
    },
    {
      title: "absorb",
      description: "to take in liquid or gas",
    },
    {
      title: "abstract",
      description: "not concrete; theoretical",
    },
    {
      title: "absurd",
      description: "completely unreasonable or silly",
    },
    {
      title: "abundance",
      description: "a large quantity of something",
    },
    {
      title: "abuse",
      description: "to treat someone or something badly",
    },
    {
      title: "academy",
      description: "a school or institution for higher or specialized learning",
    },
    {
      title: "accelerate",
      description: "to make something move or happen faster",
    },
    {
      title: "accent",
      description:
        "a way of pronouncing a language that is characteristic of a particular region or social group",
    },
    {
      title: "acceptance",
      description: "the action of accepting something as true or happening",
    },
    {
      title: "accessible",
      description: "easy to reach or use",
    },
    {
      title: "accidentally",
      description: "by chance; not deliberately",
    },
    {
      title: "accommodate",
      description: "to provide someone with what they need",
    },
    {
      title: "accomplish",
      description: "to achieve something that you have been trying to do",
    },
    {
      title: "accomplishment",
      description: "something that has been successfully achieved",
    },
    {
      title: "accordance",
      description: "agreement with something",
    },
    {
      title: "accordingly",
      description: "as a result of something",
    },
    {
      title: "accountability",
      description: "the state of being responsible for something",
    },
    {
      title: "accountable",
      description: "responsible for something",
    },
    {
      title: "accountant",
      description: "a person whose job is to keep financial records",
    },
    {
      title: "accumulate",
      description: "to collect or gather over time",
    },
    {
      title: "accumulation",
      description: "a collection of something that has been gathered over time",
    },
    {
      title: "accuracy",
      description: "the quality of being correct or exact",
    },
    {
      title: "accurately",
      description: "in a correct or exact way",
    },
    {
      title: "accusation",
      description: "a statement that someone has done something wrong",
    },
    {
      title: "accused",
      description: "someone who has been charged with a crime or wrongdoing",
    },
    {
      title: "acid",
      description: "a sour liquid that can dissolve metals",
    },
    {
      title: "acquisition",
      description: "the action of getting or obtaining something",
    },
    {
      title: "acre",
      description: "a unit of area equal to 4,840 square yards",
    },
    {
      title: "activate",
      description: "to make something start working",
    },
    {
      title: "activation",
      description: "the action of making something start working",
    },
    {
      title: "activist",
      description: "someone who campaigns to bring about political or social change",
    },
    {
      title: "acute",
      description: "severe or critical",
    },
    {
      title: "adaptation",
      description: "the process of changing to fit new circumstances",
    },
    {
      title: "addiction",
      description:
        "the fact of being unable to stop using a substance or doing an activity that is harmful",
    },
    {
      title: "additionally",
      description: "as well; besides",
    },
    {
      title: "adequate",
      description: "enough for a particular purpose",
    },
    {
      title: "adequately",
      description: "to a satisfactory or sufficient degree",
    },
    {
      title: "adhere",
      description: "to stick",
    },
  ];

  const course = await prisma.course.create({
    data: {
      title: "English Words",
    },
  });

  for (let i = 0; i < words.length; i++) {
    await prisma.courseContent.create({
      data: {
        title: words[i].title,
        description: words[i].description,
        courseId: course.id,
        category: "words",
      },
    });
  }

  console.log("Added [ENGLISH WORDS] course to courses_db");
}
