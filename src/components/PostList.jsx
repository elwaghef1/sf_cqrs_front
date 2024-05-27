import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, ListGroup, Button, Card, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostList() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8001/posts');
                setPosts(response.data);
            } catch (error) {
                toast.error('Error fetching posts: ' + error.response.data);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8001/post/${id}`);
            toast.success('Post deleted successfully');
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            toast.error('Error deleting post: ' + error.response.data);
        }
    };

    return (
        <Container className="mt-5">
            <ToastContainer />
            <h1 className="text-center mb-4">All Posts</h1>
            <ListGroup>
                {posts.map((post) => (
                    <ListGroup.Item key={post.id} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.content}</Card.Text>
                                <Card.Text className="text-muted">
                                    {new Date(post.createdAt).toLocaleString()}
                                </Card.Text>
                                <Row>
                                    <Col>
                                        <Link to={`/post/${post.id}`}>
                                            <Button variant="primary" className="w-100">View Details</Button>
                                        </Link>
                                    </Col>
                                    <Col>
                                        <Link to={`/post/update/${post.id}`}>
                                            <Button variant="warning" className="w-100">Update</Button>
                                        </Link>
                                    </Col>
                                    <Col>
                                        <Button variant="danger" className="w-100" onClick={() => handleDelete(post.id)}>Delete</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <div className="d-flex justify-content-center mt-4">
                <Link to="/create">
                    <Button variant="primary">Create New Post</Button>
                </Link>
            </div>
        </Container>
    );
}

export default PostList;
