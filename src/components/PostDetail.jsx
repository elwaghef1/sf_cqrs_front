import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Spinner, Button, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/post/${id}`);
                setPost(response.data);
            } catch (error) {
                toast.error('Error fetching post: ' + error.response.data);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8001/post/${id}`);
            toast.success('Post deleted successfully');
            navigate('/');
        } catch (error) {
            toast.error('Error deleting post: ' + error.response.data);
        }
    };

    if (!post) return (
        <Container className="mt-5 d-flex justify-content-center">
            <Spinner animation="border" />
        </Container>
    );

    return (
        <Container className="mt-5">
            <ToastContainer />
            <Card>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.content}</Card.Text>
                    <Card.Text className="text-muted">
                        {new Date(post.createdAt).toLocaleString()}
                    </Card.Text>
                    <Row>
                        <Col>
                            <Link to={`/post/update/${post.id}`}>
                                <Button variant="warning" className="w-100">Update</Button>
                            </Link>
                        </Col>
                        <Col>
                            <Button variant="danger" className="w-100" onClick={handleDelete}>Delete</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default PostDetail;
