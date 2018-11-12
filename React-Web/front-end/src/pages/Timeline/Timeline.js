import React, { Component } from 'react';
import './Timeline.css';
import Twitterlogo from '../../twitter.svg';
import api from '../../services/api';
import Tweet from '../../components/Tweets';
import socket from 'socket.io-client';
export default class Timeline extends Component {
    state = {
        newTweet: '',
        tweets: []
    }

    subscribeToEvents = () => {
        const io = socket('http://localhost:3000');
        io.on('tweet', data => {
            this.setState({
                tweets: [data, ...this.state.tweets]
            });
        });
        io.on('like', data => {
            this.setState({
                tweets: this.state.tweets.map((tweet) => {
                    return tweet._id === data._id ? data : tweet;
                })
            });
        })
    }

    async  componentDidMount() {
        this.subscribeToEvents();
        const response = await api.get("/tweets");
        this.setState({
            tweets: response.data
        })
    }
    handleInputChange = (e) => {
        this.setState({
            newTweet: e.target.value
        });
    }
    handleNewTweet = async (e) => {
        if (e.keyCode !== 13) return;
        const content = this.state.newTweet;
        const author = localStorage.getItem("@GoTwitter:username");
        console.log(content, author);
        try {
            await api.post('/tweets', {
                author,
                content
            });
        } catch (message) {

            console.log(message);
        }
        this.setState({
            newTweet: ""
        });
    }
    render() {
        return (
            <div className="timeline-wrapper">
                <img src={Twitterlogo} alt="twitter logo" height={24} />
                <form>
                    <textarea
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder="O que está acontecendo?"
                    />
                </form>
                {
                    this.state.tweets.map(tweets => {
                        return <Tweet key={tweets._id} tweet={tweets} />
                    })
                }
            </div>
        );
    }
}