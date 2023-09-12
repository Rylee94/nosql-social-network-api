const users = [
  {
    username: "Seamus Crawford",
    email: "Crawford@email.com",
  },
  {
    username: "Ellen Hewitt",
    email: "Hewitt@email.com",
  },
  {
    username: "Tilly Owens",
    email: "Owens@email.com",
  },
  {
    username: "Anton Wallace",
    email: "Wallace@email.com",
  },
  {
    username: "Patrick Bean",
    email: "Bean@email.com",
  },
];

const thoughts = [
  {
    thoughtDescription: "A day well spent outdoors is a day well-lived! 🌳🌞",
    reactions: [
      {
        reactionBody: "like",
      },
      {
        reactionBody: "love",
      },
    ],
  },
  {
    thoughtDescription: "Lost in the pages of a good book 📚📖",
    reactions: [
      {
        reactionBody: "like",
      },
      {
        reactionBody: "dislike",
      },
    ],
  },
  {
    thoughtDescription: "Saturday mornings call for breakfast in bed ☕🥞",
    reactions: [
      {
        reactionBody: "love",
      },
      {
        reactionBody: "like",
      },
    ],
  },
];

module.exports = { users, thoughts };
