import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import './WelcomeScreen.css';

function WelcomeScreen(props) {
  return props.showWelcomeScreen ?
    (
      <div className="WelcomeScreen">
        <Container className="position-wrapper">
        <Card className="welcome-screen-card">
          <Row className="className='justify-content-md-center">
            <Col>
        <Card.Text className="card-text">
          Log in to see upcoming events around the world <br />for
          full-stack developers
      </Card.Text>
        <Card.Body className="button_cont" align="center">
          <div class="google-btn">
            <div class="google-icon-wrapper">
              <img
                class="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google sign-in"
              />
            </div>
            <div align="center">
            <button 
                onClick={() => { props.getAccessToken() }}
                rel="nofollow noopener"
                class="btn-text"
            >
              <b>Sign in with google</b>
            </button>
            </div>

            </div>
        </Card.Body>
        <a
          href="https://marinanadj.github.io/meet/privacy.html"
          rel="nofollow noopener"
        >
          Privacy policy
</a>
</Col>
</Row>
</Card>
</Container>
</div> )
: null }
export default WelcomeScreen;