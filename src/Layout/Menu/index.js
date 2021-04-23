/*
 * Jira Ticket:
 * Created Date: Thu, 10th Dec 2020, 15:05:38 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, { useState } from 'react';
import { MenuItemLink, getResources, useTranslate } from 'react-admin';
import SubMenu from './SubMenu';
import { useMediaQuery } from '@material-ui/core';
import { useSelector } from 'react-redux';
import inflection from 'inflection';
import classnames from 'classnames';
import { OndemandVideo } from '@material-ui/icons';
import { menuStyles } from 'styles';
import { partition } from 'utils';

const translatedResourceName = (resource, translate) =>
  translate(`resources.${resource.name}.name`, {
    smart_count: 2,
    _:
      resource.options && resource.options.label
        ? translate(resource.options.label, {
            smart_count: 2,
            _: resource.options.label,
          })
        : inflection.humanize(inflection.pluralize(resource.name)),
  });

const AdminMenu = ({ resources, onMenuClick, translate, sidebarIsOpen }) => {
  return resources.map((resource) => {
    if (resource.options && !resource.options.excludeFromMenu)
      return (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          primaryText={
            translatedResourceName(resource, translate) || resource.name
          }
          leftIcon={resource.icon ? <resource.icon /> : null}
          onClick={onMenuClick}
          sidebarIsOpen={sidebarIsOpen}
        />
      );
  });
};

const CustomMenu = (props) => {
  const windowLocation = window.location.href;
  const {
    classes,
    className,
    dense,
    hasDashboard,
    onMenuClick,
    logout,
    ...rest
  } = props;
  const menuClasses = menuStyles();
  const open = useSelector((state) => state.admin.ui.sidebarOpen);
  const resources = useSelector(getResources);
  const translate = useTranslate();
  const isXSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  // will have the submenu open if the user is on one of the submenu routes
  const [subMenuOpen, setSubMenuOpen] = useState(
    windowLocation.includes('onDemandWorkout') ||
      windowLocation.includes('workoutTag')
  );

  const [subMenuResources, mainMenuResources] = partition(
    resources,
    (resource) => resource.options && resource.options.subMenu
  );

  const handleToggle = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  useSelector((state) => state.router.location.pathname);

  return (
    <div className={classnames(menuClasses.main, className)} {...rest}>
      <AdminMenu
        resources={mainMenuResources}
        onMenuClick={onMenuClick}
        translate={translate}
        sidebarIsOpen={open}
      />
      <SubMenu
        handleToggle={handleToggle}
        isOpen={subMenuOpen}
        sidebarIsOpen={open}
        name={translatedResourceName({ name: 'onDemand' }, translate)}
        key={'resourcesSubMenu'}
        icon={<OndemandVideo />}
        dense={true}
      >
        <AdminMenu
          resources={subMenuResources}
          onMenuClick={onMenuClick}
          dense={true}
          translate={translate}
        />
      </SubMenu>
      {isXSmall && logout}
    </div>
  );
};

export default CustomMenu;
