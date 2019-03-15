const passport=require('passport');
const GoogleStategy=require('passport-google-oauth').OAuth2Strategy;

module.exports=function(){
    passport.use(new GoogleStategy({
        clientID:'475173781688-59sbiklu3nsmj1q8skaitovsld9jt84t.apps.googleusercontent.com',
        clientSecret:'ba0f4HhC7yDMEfes6_oBrX44',
        callbackURL:'http://localhost:3000/auth/google/callback'},
        function(req,accessToken,refreshToken,profile,done){
            // var user={};
            // user.email=profile.emails[0].value;
            // user.image=profile._json.image.url;
            // user.displayName=profile.displayName;

            // user.google={};
            // user.google.id=profile.id;
            // user.google.token=accessToken;

          done(null,profile);
        }
      ));
}