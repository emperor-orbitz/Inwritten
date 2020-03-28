import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../../Resources/styles/style.scss';
import cat from './categories'




class SideBar {


    subMenu = {

        articleSubmenu: (
            <Menu secondary vertical >
                <Menu.Item as={Link} to='/app/add-post'><Icon name="add" />Create new</Menu.Item>
                <Menu.Item as={Link} to='/app/articles'><Icon name="folder outline" />Published Items</Menu.Item>
                <Menu.Item as={Link} to='/app/drafts'><Icon name="box" />Draft Items</Menu.Item>
            </Menu>
        ),

        categorySubmenu:

            (
                <Menu secondary vertical  >
                    {
                        cat.categories.map(
                            (category) => {
                                return (
                                    <Menu.Item as={Link} key={category.key} to={`/app/interests?topic=${category.value}`}><Icon name={category.icon} />{category.text}</Menu.Item>

                                )
                            }
                        )
                    }
                </Menu>
            ),
        settingsSubmenu: (
            <Menu secondary vertical  >
                <Menu.Item as={Link} to="/app/settings/adverts"><Icon name="address card" />Ad settings</Menu.Item>
                <Menu.Item as={Link} to="/app/settings/withdrawals"><Icon name="money bill alternate" />My Balance</Menu.Item>
                {/*<Menu.Item as={Link} to="/settings/preferences" disabled={true}><Icon name="user" />Preferences</Menu.Item>)*/}

            </Menu>
        )



    }


}
export default SideBar;

