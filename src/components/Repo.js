import React from 'react';
import moment from 'moment';
import './Repo.css';



export default class Repo extends React.Component {

    kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
    }
    render() {
        const { image, name, user_name, description, stars, issues, date} = this.props;
        return (
            <div className="repo-container">
                <div className="repo-image-holder">
                    <img alt="img" src={ image } />
                </div>
                <div className="repo-text-holder">
                    <h3>{name}</h3>
                    <p>{description && description.slice(0, 50)}</p>
                    <div className="repo-info">
                        <div className="number-data">
                            <span>Stars : {this.kFormatter(stars)}</span>
                        </div>
                        <div className="number-data">
                            <span>Issues : {this.kFormatter(issues)}</span>
                        </div>
                        <span>Submitted {moment(moment(date).format("YYYY-MM-DD"), "YYYYMMDD").fromNow()} by {user_name}</span>
                    </div>
                </div>
            </div>
        );
    }
}

