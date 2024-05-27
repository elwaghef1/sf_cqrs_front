import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

function UpdatePost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/post/${id}`);
                const post = response.data;
                setTitle(post.title);
                setContent(post.content);
                setCreatedAt(new Date(post.createdAt).toISOString().slice(0, 16)); // Convert to 'YYYY-MM-DDTHH:mm'
            } catch (error) {
                toast.error('Error fetching post: ' + error.response.data.message);
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            toast.error('User not authenticated');
            navigate('/login');
            return;
        }

        // Decode the token to get user information
        const decodedToken = jwtDecode(token);
        const userName = decodedToken.username;

        const postData = {
            title,
            content,
            createdAt,
            userName,
        };

        try {
            await axios.put(`http://localhost:8001/post/${id}`, postData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            toast.success('Post updated successfully');
            navigate('/');
        } catch (error) {
            toast.error('Error updating post: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h1 className="text-center">Update Post</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle" className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formContent" className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formCreatedAt" className="mb-3">
                            <Form.Label>Created At</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={createdAt}
                                onChange={(e) => setCreatedAt(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Update Post
                        </Button>
                    </Form>
                    <ToastContainer />
                </Col>
            </Row>
        </Container>
    );
}

export default UpdatePost;
