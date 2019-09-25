/*
*
*           ALL PAGES STAY RIGHT HERE
*
*/
import Signup from './Signup/signup';
//import Documentation from './documentation';
import Account from './Dashboard/account';
//import Blog from './blog';
import Home from './home'
import Login from './AuthPage/login';
import Profile from './Profile/profile';
// ARTICLES CATEGORY


import Articles from './Articles/Components/articles';// MAIN PAGE
import AddPost from './NewPost/addpost';
import EditPost1 from '../src/EditPost/editpost_1';
import PostArchive from '../src/Archives/postarchive';

import AddImage from '../src/NewImage/addimage';
import Gallery from '../src/NewImage/addimage';


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