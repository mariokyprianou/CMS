/*
 * Jira Ticket:
 * Created Date: Thu, 10th Dec 2020, 15:05:38 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import { MenuItemLink, getResources, useTranslate } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import { useSelector } from 'react-redux';
import inflection from 'inflection';
import classnames from 'classnames';
import { menuStyles } from 'styles';

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

  useSelector((state) => state.router.location.pathname);

  return (
    <div className={classnames(menuClasses.main, className)} {...rest}>
      <AdminMenu
        resources={resources}
        onMenuClick={onMenuClick}
        translate={translate}
        sidebarIsOpen={open}
      />
      {isXSmall && logout}
    </div>
  );
};

export default CustomMenu;
