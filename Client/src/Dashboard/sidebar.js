import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../../Resources/styles/style.scss';
import cat from './categories'




class SideBar {


    subMenu = {

        articleSubmenu: (
            <Menu secondary vertical >
                <Menu.Item as={Link} to='/add-post'><Icon name="add" />Create new</Menu.Item>
                <Menu.Item as={Link} to='/articles'><Icon name="folder outline" />Published Items</Menu.Item>
                <Menu.Item as={Link} to='/drafts'><Icon name="box" />Draft Items</Menu.Item>
            </Menu>
        ),

        categorySubmenu:

            (
                <Menu secondary vertical  >
                    {
                        cat.categories.map(
                            (category) => {
                                return (
                                    <Menu.Item as={Link} key={category.key} to={`/interests?topic=${category.value}`}><Icon name={category.icon} />{category.text}</Menu.Item>

                                )
                            }
                        )
                    }
                </Menu>
            ),
        settingsSubmenu: (
            <Menu secondary vertical  >
                <Menu.Item as={Link} to="/settings/profile"><Icon name="user" />Profile</Menu.Item>
                <Menu.Item as={Link} to="/settings/templates"><Icon name="block layout" />Templates</Menu.Item>
                {/*<Menu.Item as={Link} to="/settings/preferences" disabled={true}><Icon name="user" />Preferences</Menu.Item>)*/}

            </Menu>
        )



    }


}
export default SideBar;

