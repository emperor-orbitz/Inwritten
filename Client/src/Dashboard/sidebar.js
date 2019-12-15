import React from 'react';
import {  Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../../Resources/styles/style.scss'; 
import cat from './categories'


var xxxx= ["sds"]
console.log(cat)

//console.log(xx);
 
//const category = cat.

class SideBar {
    

    subMenu = {

        articleSubmenu: (
            <Menu secondary vertical >
                <Menu.Item as={Link} to='/add-post'><Icon name="add" />Create new</Menu.Item>
                <Menu.Item as={Link} to='/articles'><Icon name="folder outline" />Published Items</Menu.Item>
                <Menu.Item as={Link} to='/drafts'><Icon name="box" />Draft Items</Menu.Item>
            </Menu>
        ),

       /* draftSubmenu: (
            <Menu secondary vertical className='menu-item' >
                <Menu.Item as={Link} to="/add"><Icon name="add" />Add</Menu.Item>
                <Menu.Item as={Link} to="/drafts"  ><Icon name="folder outline" />Archive</Menu.Item>
            </Menu>
        ),*/
        imageSubmenu: (
            <Menu secondary vertical className='menu-item' >
                <Menu.Item as={Link} to="/add-image"><Icon name="add" />Insert new image</Menu.Item>
                <Menu.Item as={Link} to="/gallery"  ><Icon name="images" />Gallery</Menu.Item>
            </Menu>
        ),

        categorySubmenu: 
      
         (
            <Menu secondary vertical  >
                {
                    cat.categories.map(
                        (category)=>{
                            return (
                                <Menu.Item as={Link} key= {category.key} to={`/interests?topic=${category.code}`}><Icon name={category.icon} />{category.name}</Menu.Item>
      
                            )
                        }
                    )
                }
            </Menu>
        ),
        settingsSubmenu: (
            <Menu secondary vertical  >
                <Menu.Item as={Link} to="/templates"><Icon name="block layout" />Templates</Menu.Item>
                <Menu.Item as={Link} to="/profile"><Icon name="user" />Profile</Menu.Item>

            </Menu>
        )



    }

  
}
export default SideBar;

