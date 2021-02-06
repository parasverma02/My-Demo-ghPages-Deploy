import './App.css';
import { Component } from 'react';


class App extends Component {

    state = {
        posts: [],

    }
    componentDidMount = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(responseData => {
                const postsData = responseData.map(data => {
                    return {
                        ...data,
                        show: false
                    };
                })
                this.setState({ posts: postsData });

            }
            );

    }

    handleCollapsible = (id) => {
        let postsData = [...this.state.posts];
        postsData = postsData.map(data => {
            const singleData = { ...data };
            if (singleData.id === id) {
                singleData.show = !singleData.show;
            }

            return singleData
        })

        this.setState({ posts: postsData })


    }
    render() {
        const postData =
            this.state.posts.map(data => (
                <div className='collapsible' key={data.id}>
                    <button 
                        className={data.show? 'collapsible-button active' : 'collapsible-button'} 
                        onClick={() => this.handleCollapsible(data.id)} 
                        id={data.id}>{data.title}</button>
                    <div className={data.show ? 'collapsible-data' : 'display'}>
                        <p>{data.body}</p>
                    </div>
                </div>

            )
            )
        return (
            <div className='Container'>
                <div className='ListBody'>
                    {postData}
                </div>
            </div>
        )

    }
}
export default App;
