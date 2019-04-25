//update the profile data
import user from '../models/user.model';
function verfiyUser(req, res){	
	let authUserId= req.user._id;
	let profileUserId= req.params.user_id;
	return profileUserId == authUserId;  
}

function changeProfile(req, res){	
	  console.log("in change Profile");
	  if (!verfiyUser(req, res))
	  {
		 //TODO Send Error
		 // res.send(err);
	  }
      // use our user model to find the user item we want
      user.findOne({

        '_id' : req.params.user_id

      }, (err, user) => {

        if (err)
          res.send(err);

        user.profile = req.body;

        // save the user item
        return user.save((err) => {

          if (err)
            res.send(err);

          return res.send(user);

        });
      });
}
export default (app, router) => {
	router.route('/secure/user/profile/:user_id')
    .put((req, res) => {
		return changeProfile(req, res);
    }) //put
    .post((req, res) => {
		return changeProfile(req, res);
    }); //Post
};
