import { map } from 'lodash';
import { isLoggedIn } from './authController';
import { likeTagItem, dislikeTagItem, findBy } from '../models/LikedTagItem';

export default function (app) {
  app.get('/likes', isLoggedIn, async (req, res) => {
    const result = await findBy({ user_id: req.user.id });
    res.status(200)
      .json({
        likes: map(result, tagItem => tagItem.tag_id),
      });
  });

  app.post('/like', isLoggedIn, (req, res) => {
    try {
      likeTagItem(req.body.tagId, req.user.id);
      res.status(201).json({ mesg: 'Tag item liked' });
    } catch (e) {
      res.status(422).json({ mesg: e.message });
    }
  });

  app.delete('/dislike/:tagId', isLoggedIn, (req, res) => {
    try {
      dislikeTagItem(req.params.tagId, req.user.id);
      res.status(200).json({ mesg: 'Tag item disliked' });
    } catch (e) {
      res.status(422).json({ mesg: e.message });
    }
  });
}
