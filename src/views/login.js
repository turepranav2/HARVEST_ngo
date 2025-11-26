import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import DynamicNavbar from '../components/DynamicNavbar'
import DynamicFooter from '../components/DynamicFooter'
import { usePageContent } from '../hooks/usePageContent'
import './login.css'

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  const { getText } = usePageContent('login')

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    console.log('Login attempt:', loginData)
    alert('Login functionality will be implemented soon!')
  }

  return (
    <div className="login-container">
      <Helmet>
        <title>{getText('seo', 'title', 'Login - HĀRVÉST')}</title>
        <meta property="og:title" content={getText('seo', 'title', 'Login - HĀRVÉST')} />
      </Helmet>
      <DynamicNavbar />
      <div className="login-split-screen">
        <div className="login-left">
          <div className="login-overlay"></div>
          <div className="login-content-left">
            <h1>{getText('hero', 'heading', 'Welcome Back')}</h1>
            <p>{getText('hero', 'subheading', 'Join us in making a difference in our community')}</p>
          </div>
        </div>
        <div className="login-right">
          <div className="login-form-container">
            <div className="login-header">
              <h2>{getText('form', 'heading', 'Sign In')}</h2>
              <p>{getText('form', 'subheading', 'Please sign in to continue')}</p>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">{getText('form', 'email_label', 'Email')}</label>
                <div className="input-group">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    required
                    placeholder={getText('form', 'email_placeholder', 'Enter your email')}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">{getText('form', 'password_label', 'Password')}</label>
                <div className="input-group">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    required
                    placeholder={getText('form', 'password_placeholder', 'Enter your password')}
                  />
                </div>
              </div>
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" /> {getText('form', 'remember_me', 'Remember me')}
                </label>
                <Link to="/forgot-password" className="forgot-password">
                  {getText('form', 'forgot_password', 'Forgot Password?')}
                </Link>
              </div>
              <button type="submit" className="login-button">
                {getText('form', 'submit', 'Sign In')}
              </button>
              <div className="social-login">
                <p>{getText('social', 'heading', 'Or sign in with')}</p>
                <div className="social-buttons">
                  <button type="button" className="social-button google">
                    <i className="fab fa-google"></i>
                  </button>
                  <button type="button" className="social-button facebook">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                </div>
              </div>
            </form>
            <div className="login-footer">
              <p>
                {getText('form', 'switch_prompt', "Don't have an account?")}{' '}
                <Link to="/register">{getText('form', 'switch_cta', 'Create Account')}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <DynamicFooter />
    </div>
  )
}

export default Login 