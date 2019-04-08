import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ListItem from './ListItem';
import {Row,Col} from 'react-bootstrap';

export default class List extends Component{
    render(){
        const {items,title,listActionOnClick,itemOnClick,type} = this.props;
        return(
            <div className="list">
                <Row>
                    <Col><h3 className="list-title">{title}</h3></Col>
                    <Col style={{textAlign:'right'}}><i className = "btn icon-button list-action"
                    onClick = {listActionOnClick} > < FontAwesomeIcon
                    icon={faPlus}
                    /></i></Col>
                </Row>
                {items.map((item,index) => <ListItem {...item} key={index} itemOnClick={itemOnClick} type={type}/>)}
                <hr/>
            </div>
        )
    }
}