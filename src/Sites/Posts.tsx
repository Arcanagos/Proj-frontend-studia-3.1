import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as Scripts from './ApiCalls';
import './Posts.css';

interface ViewParams {
    userId: string;
    [key: string]: string | undefined;
}

const MainView = () => {
    const [postsWithComments, setPostsWithComments] = useState<Scripts.Post[]>([]);
    const { userId } = useParams<ViewParams>();
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const result = await Scripts.getPostsAndComments(userId);
            setPostsWithComments(result);
        };

        fetchData();
    }, [userId]);

    const deletePost = (postId: number) => {
        setPostsWithComments((prevPosts) => prevPosts.filter((post) => post.id != postId));
    };


    const goToMainView = () => {
        navigate("/MainView/" + userId);
    }

    const goToProfile = () => {
        navigate("/Profile/" + userId);
    }

    const goToPosts = () => {
        navigate("/Posts/" + userId);
    }

    const goToSearch = () => {
        navigate("/Search/" + userId);
    }

    return (
        <div id="MainViewContainer">
            <div id="Menu">
                <p id="Gelerianka">Galerianka</p>
                <ul>
                    <li onClick={goToMainView}>Strona główna</li>
                    <li onClick={goToProfile}>Profil</li>
                    <li id="ActivElem">Posty</li>
                    <li onClick={goToSearch}>Wyszukaj</li>
                </ul>
            </div>
            <div id="Content">
                <div id="PostsDiv">
                    {postsWithComments.map((post) => (
                        <div key={post.id} className="posts">
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                            <h3>Komentarze:</h3>
                            {post.comments && post.comments.map((comment) => (
                                <div key={comment.id} className="comments">
                                    <strong>{comment.email}</strong>
                                    <p>{comment.name}</p>
                                    <p>{comment.body}</p>
                                </div>
                            ))}
                            {post.canEdit == true && (
                                <button onClick={() => deletePost(post.id)}>Usuń Post</button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainView;
