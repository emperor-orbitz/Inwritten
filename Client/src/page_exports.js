/*  
ALL PAGES STAY RIGHT HERE
*/
import Signup from '../src/AuthPage/signup';
//import Documentation from './documentation';
import Account from './Dashboard/account';
import Comments from './Comments/comment';
import Home from './home'
import Login from './AuthPage/login';
import ForgotPassword from './AuthPage/forgot_password';

import Profile from './Profile/profile';
import Bookmark from './Bookmark/bookmark';

import Articles from './Articles/Components/articles';// MAIN PAGE
import AddPost from './NewPost/addpost';
import EditPost from './EditPost/editpost';
import PostArchive from '../src/Archives/postarchive';
import Interests from "../src/Interests/interests";
import Preferences from "../src/Preferences/preferences";
import Templates from "../src/Templates/templates";
import Notifications from "../src/Notifications/notifications";





var ArticlesCategory ={
    Articles:Articles,
    Drafts: PostArchive,
    EditPost:EditPost,
    AddPost:AddPost
}




export { Signup, Account, Home, Login,  
        ArticlesCategory, Profile, 
        Comments, Interests, Bookmark,
        Preferences, Templates, Notifications, ForgotPassword
    };