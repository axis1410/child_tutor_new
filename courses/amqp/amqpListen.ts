import * as amqp from "amqplib/callback_api";
import prisma from "../prisma/prisma";

export async function listenToAmqp() {
  amqp.connect("amqp://rabbitmq", (err, conn) => {
    if (err) throw err;

    conn.createChannel((err, ch) => {
      if (err) throw err;

      ch.assertQueue("user_added", {}, (err, q) => {
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

        ch.consume(
          q.queue,
          async (msg) => {
            if (msg?.content) {
              console.log(" [x] %s", msg.content.toString());
              const user = JSON.parse(msg.content.toString());
              console.log("Added user: ", user.id);

              await prisma.user.create({
                data: {
                  id: user.id,
                  completed: [],
                },
              });

              console.log("Added user to courses_db");
            }
          },
          { noAck: true }
        );
      });
    });

    conn.createChannel((err, ch) => {
      if (err) throw err;

      ch.assertQueue("user_sign_in", {}, (err, q) => {
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

        ch.consume(
          q.queue,
          async (msg) => {
            if (msg?.content) {
              console.log(" [x] %s", msg.content.toString());

              const user = JSON.parse(msg.content.toString());

              const existingUser = await prisma.user.findFirst({
                where: {
                  id: user.id,
                },
              });

              if (!existingUser) {
                console.log("User not found, adding user to courses_db");

                await prisma.user.create({
                  data: {
                    id: user.id,
                    completed: [],
                  },
                });

                console.log("Added user to courses_db");
              }

              await prisma.user.update({
                where: {
                  id: user.id,
                },
                data: {
                  refreshToken: user.refreshToken,
                },
              });

              console.log("User has signed in", user.id);
            }
          },
          { noAck: true }
        );
      });
    });
  });
}
