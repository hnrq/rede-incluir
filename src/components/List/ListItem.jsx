import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom';
import {Collapse, Button} from 'react-bootstrap';
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons';

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    renderListAction() {
        const {showItemAction, buttonText,action} = this.props;
        if (showItemAction) {
            return (buttonText
                ? <Button className="list-item-action" style={{top:'-10px',right:'20px'}} onClick= {!!action ? () => {action()} : null}>{buttonText}</Button>
                : <i
                    className="btn icon-button list-item-action"
                    onClick=
                    {!!action ? () => {action()} : null}>
                    < FontAwesomeIcon icon={faPencilAlt}/></i>);
        }
    }

    render() {
        const {
            title,
            subtitle,
            info,
            extraInfo,
            picture,
            to,
            collapsible
        } = this.props;
        const item = <div className="list-item">
            <div style={{
                display: 'flex'
            }}>
                <img alt="item-pic" src={picture} className="avatar small list-item-pic"/>
                <div className="list-info">
                    <h5>{title}</h5>
                    <h6 className="subtitle">{subtitle}</h6>
                    <span className="information">{info}</span>
                    {collapsible
                        ? null
                        : <span className="extra-info">{extraInfo}</span>}
                    {this.renderListAction()}
                </div>
            </div>
            {collapsible
                ? <> <Collapse in={this.state.open}>
                    <span className="extra-info-collapsible">{extraInfo}</span>
                </Collapse> < Button block variant = "link" className = 'list-item-collapse'
            onClick = {
                () => this.setState({
                    open: !this.state.open
                })
            }
            aria-controls="example-collapse-text"
            aria-expanded={ this.state.open}> Ver mais </Button>
                    </ > : null}
            <hr/>
        </div>
        if (to) 
            return (
                <Link to={to}>
                    {item}
                </Link>
            );
        else 
            return item;
        }
    }