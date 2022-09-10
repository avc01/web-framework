import { User } from "./models/User";

const user = new User({});

user.events.on("onChange", () => {
  console.log("onChange event from index");
});

user.events.on("onChange", () => {
  console.log("onChange event from index1111");
});

user.events.trigger("onChange");
