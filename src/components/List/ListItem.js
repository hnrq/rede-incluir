import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';

export default class ListItem extends Component {

    render() {
        const {
            action,
            title,
            subtitle,
            info,
            extraInfo,
            picture,
            to
        } = this.props;
        const item =
        <div className="list-item">
                <img alt="company-pic" src={picture} className="avatar small"/>
                <div className="list-info">
                    <h5>{title}</h5>
                    <h6 className="subtitle">{subtitle}</h6>
                    <span className="information">{info}</span>
                    <span className="extra-info">{extraInfo}</span>
                    {action
                        ? <i
                                className="btn icon-button list-item-action"
                                onClick=
                                {!!action ? () => {action()} : null}>
                                < FontAwesomeIcon icon={faPencilAlt}/></i>
                        : null}
                    <hr/>
                </div>
            </div>
        if(to)
            return (
                <Link to={to}>
                    {item}
                </Link>
            );
        else return item;
    }
}