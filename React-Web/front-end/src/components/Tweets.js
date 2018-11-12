import React, { Component } from 'react';

import './Tweet.css';
import like from '../like.svg'
import api from '../services/api';
export default class Tweet extends Component {
    handleLike = async (e) => {
        const { _id } = this.props.tweet;
        await api.post(`likes/${_id}`, {});
    }
    render() {
        const { tweet } = this.props;
        return (
            <ul className="tweet-list">
                <li className="tweet">
                    <strong>{tweet.author}</strong>
                    <p>{tweet.content}</p>
                    <button type="button">
                        <img src={like} alt="like" onClick={this.handleLike} />
                        {tweet.likes}
                    </button>
                </li>
            </ul>
        );
    }
}