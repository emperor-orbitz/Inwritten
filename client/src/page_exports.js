/*
*
*           ALL PAGES STAY RIGHT HERE
*
*/
import Signup from './Signup/signup';
//import Documentation from './documentation';
import Account from './account/account';
//import Blog from './blog';
import Home from './home'
import Login from './Login/login';
import Profile from './account/profile/profile';
// ARTICLES CATEGORY
import Articles from './account/articles/articles';// MAIN PAGE
import AddPost from './account/articles/addpost';
import EditPost1 from './account/articles/editpost_1';

import PostArchive from './account/articles/postarchive';

import AddImage from './account/images/addimage';
import Gallery from './account/images/gallery';


var ArticlesCategory ={
    Articles:Articles,
    Drafts: PostArchive,
    EditPost1:EditPost1,
    AddPost:AddPost
}

var ImagesCategory ={
    AddImage: AddImage,
    Gallery: Gallery
}


export { Signup, Account, Home, Login, ImagesCategory, ArticlesCategory, Profile };