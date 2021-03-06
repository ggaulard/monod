/* eslint one-var: 0 */
import React from 'react';
import BaseTemplate from './Base';

import './resume/style.scss';

/**
 * Invoice template
 */
export default class Resume extends BaseTemplate {

  getDefaultData() {
    return {
      name: '[name]',
      role: '[role]',
      experience: '[experience]',
      roles: {
        1: '[roles/1]',
        2: '[roles/2]',
        3: '[roles/3]'
      },
      other1: {
        title: '[other1/title]',
        1: '[other1/1]',
        2: '[other1/2]',
        3: '[other1/3]'
      },
      other2: {
        title: '[other2/title]',
        1: '[other2/1]',
        2: '[other2/2]',
        3: '[other2/3]'
      },
      expertises: {
        1: '[expertises/1]',
        2: '[expertises/2]',
        3: '[expertises/3]',
        4: '[expertises/4]'
      }
    };
  }

  transformToIconIfRequired(data){
    if(data.indexOf('--expertise-') == 0){
      const className = 'expertise-icon ' + data.split('--expertise-')[1];
      return (
        <span className={className}></span>
      );
    }
    return data;
  }

  pushDataIfDefined(array, data) {
    if (data && data.indexOf('[') == -1) {
      data = this.transformToIconIfRequired(data);
      array.push(data);
      return true;
    }
    return false;
  }

  extractArray(data, propertyName) {
    const array = [];

    let i = 1;
    while (1) {
      if (!this.pushDataIfDefined(array, data[propertyName][i])) {
        break;
      }
      i++;
    }
    return array;
  }

  createList(data, propertyName) {
    if (!data[propertyName]) {
      return undefined;
    }

    let list = this.extractArray(data, propertyName)
      .map(s => (<li>{s}</li>));

    if (list.length == 0) {
      return undefined;
    }

    return (<ul>{list}</ul>);
  }

  createTitledList(data, propertyName) {
    if (!data[propertyName] || !data[propertyName].title || data[propertyName].title.indexOf('[') != -1) {
      return undefined;
    }

    let list = this.createList(data, propertyName);
    let title = data[propertyName].title;

    return (
      <ul>
        <li>
          {title}
        </li>
        <li>
          {list}
        </li>
      </ul>
    );
  }

  render() {
    const data = this.getData();

    const description = [
      this.createList(data, 'roles'),
      this.createTitledList(data, 'other1'),
      this.createTitledList(data, 'other2')
    ].filter(item => !!item);

    const expertises = this.createList(data, 'expertises');

    return (
      <div>
        <div className="logo"></div>
        <div className="header1"></div>
        <div className="presentation">
          <span className="name">{data.name}</span>
          <span className="role">{data.role}</span>
          <span className="experience">{data.experience}</span>
        </div>
        <div className="header2"></div>
        <div className="description">
          {description}
        </div>
        <div className="header3"></div>
        <div className="expertise">
          <span className="title">Expertise</span>
          {expertises}
        </div>
        <div className="mission-title">
          <span className="title">Dernière mission</span>
        </div>

        {this.props.content}
      </div>
    );
  }
}
