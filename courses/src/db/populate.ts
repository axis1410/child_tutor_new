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
    "Giraffe",
    "Horse",
    "Icecream",
    "Jockey",
    "Kite",
    "Lamp",
    "Monk",
    "Net",
    "Owl",
    "Parrot",
    "Quail",
    "Rabbit",
    "Snake",
    "Train",
    "Umbrella",
    "Van",
    "Well",
    "Xylophone",
    "Yak",
    "Zebra",
  ];

  const images = [
    "https://waapple.org/wp-content/uploads/2021/06/Variety_Cosmic-Crisp-transparent-658x677.png",
    "https://png.pngtree.com/png-vector/20240315/ourmid/pngtree-soccer-ball-on-white-over-grey-background-football-oldstyle-png-image_11941305.png",
    "https://www.justdogsstore.com/wp-content/uploads/2023/05/app-menu-cat.png",
    "https://breed-assets.wisdompanel.com/dog/street-dog-india/Indian_Street_Dog_Color.png",
    "https://static.wikia.nocookie.net/vsbattles/images/8/81/African-Elephant-PNG-File-1-.png/revision/latest/scale-to-width-down/1200?cb=20190915004806",
    "https://www.busylittlekiddies.com/wp-content/uploads/Fish-11.png.webp",
    "https://cdn-icons-png.flaticon.com/512/2938/2938236.png",
    "https://easydrawingguides.com/wp-content/uploads/2021/12/jumping-horse-step-by-step-drawing-tutorial-step-10.png",
    "https://cdn-icons-png.freepik.com/512/9677/9677185.png",
    "https://purepng.com/public/uploads/large/horse-jockey-uft.png",
    "https://images.emojiterra.com/google/noto-emoji/unicode-15.1/color/1024px/1fa81.png",
    "https://www.havells.com/HavellsProductImages/HavellsIndia/Content/Consumer/lighting/Home-Art-Light/QUINT-ESSENCE-THEME/LHFHAODBTN1X007/cover.png",
    "https://png.pngtree.com/png-vector/20231014/ourmid/pngtree-zen-monk-zen-monk-standing-and-meditating-monks-engaged-in-prayer-png-image_10157810.png",
    "https://pngimg.com/d/scoop_net_PNG21.png",
    "https://assets-global.website-files.com/601c38060e6528a8583f45e5/6321405469c8374290e06897_Screech%20Owl%20.png",
    "https://easydrawingguides.com/wp-content/uploads/2018/10/Parrot-10.png",
    "https://static.vecteezy.com/system/resources/previews/022/174/542/original/quail-bird-cartoon-vector-free-png.png",
    "https://png.pngtree.com/png-clipart/20230429/ourmid/pngtree-portrairt-rabbit-on-white-background-png-image_6744734.png",
    "https://kids.rspca.org.au/UserFiles/RSPCAKidsEducationSA/Image/snake.png",
    "https://cdn.pixabay.com/photo/2023/10/15/02/20/train-8316054_640.png",
    "https://cdn3d.iconscout.com/3d/premium/thumb/umbrella-8769387-7097460.png?f=webp",
    "https://www.toyota.com.sg/showroom/new-models/-/media/22809e987d75444cb099efa50ef7c26c.png",
    "https://png.pngtree.com/png-clipart/20230212/ourmid/pngtree-old-well-png-image_6594459.png",
    "https://perthmusicshop.com.au/cdn/shop/products/SMZHzxDw_cb4586cd-3a56-4bf8-9513-8e9ee9d3674c_1073x700.png?v=1665482354",
    "https://static.vecteezy.com/system/resources/previews/024/865/603/non_2x/yak-with-ai-generated-free-png.png",
    "https://nationalzoo.com.au/wp-content/uploads/2017/03/zebra-featured-image-web.png",
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
        imageUrl: images[i],
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
