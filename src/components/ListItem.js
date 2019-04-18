import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import graduationPlaceholder from '../images/graduation-placeholder.svg'
export const GRADUATION = 1;
export const CERTIFICATIONS = 2;

export default class ListItem extends Component{
    
    getShortDate = (dateObject) => {
        if(this.props.type === GRADUATION) return dateObject.year;
        else if (!!dateObject.month) {
            const monthNames = ["Jan", "Fev", "Mar",
                "Abr", "Mai", "Jun",
                "Jul", "Ago", "Set",
                "Out", "Nov", "Dez"
            ];
            return `${monthNames[dateObject.month-1]} de ${dateObject.year}`
        } else return dateObject.year;
    }

    render(){
            const {
                institution, graduation, area,
                post,
                company,
                startDate,
                endDate,
                workLocation,
                isCurrentWork,
                type, action
            } = this.props;
        return(
            <div className="list-item">
            <img alt="company-pic" src = {type === GRADUATION ? graduationPlaceholder : "https://upload.wikimedia.org/wikipedia/commons/5/50/Business_Suitcase_Flat_Icon.svg"} className="avatar small"/>
            <div className="list-info">
                <h5>{type === GRADUATION ? institution : post}</h5>
                <h6 className="subtitle">{type === GRADUATION ? `${graduation}, ${area}` : company}</h6>
                <span className="date">{`${this.getShortDate(startDate)} - ${isCurrentWork ? 'Até o momento' : this.getShortDate(endDate)}`}</span>
                <span className="location">{workLocation}</span>
                {action ? <i className = "btn icon-button list-item-action"
                    onClick = {!!action ? () => {action({...this.props,action:null})} : null} > < FontAwesomeIcon
                    icon={faPencilAlt}
                    /></i> : null}
                <hr/>
            </div>
            </div>
        );
    }
}