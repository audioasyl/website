CREATE TABLE liked_tag_items (
  id serial primary key,
  tag_id VARCHAR(60),
  user_id int,
  FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT u_constraint UNIQUE (tag_id, user_id)
);
